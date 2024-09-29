import os
import cv2
import cvzone
from cvzone.PoseModule import PoseDetector
from flask import Flask, Response
from flask_cors import CORS

# Initialize Flask app and enable CORS if you need to access it from another domain
app = Flask(__name__)
CORS(app)

# Initialize the PoseDetector
detector = PoseDetector()

# Function to filter only PNG files and ignore hidden files like .DS_Store
def is_image_file(filename):
    return filename.endswith('.png') and not filename.startswith('.')

# Folder path for shirts
shirtFolderPath = "Resources/Shirts"
# Filter the list to include only .png files and skip hidden files
listShirts = [f for f in os.listdir(shirtFolderPath) if is_image_file(f)]
imagenum = 0

# Button images
imagebutnRight = cv2.imread("Resources/button.png", cv2.IMREAD_UNCHANGED)
imagebutnLeft = cv2.flip(imagebutnRight, 1)
counterRight = 0
counterLeft = 0
selectionSpeed = 10

# Capture video from the webcam
cap = cv2.VideoCapture(0)

# Function to generate frames for streaming
def generate_frames():
    global imagenum, counterRight, counterLeft

    while True:
        success, img = cap.read()
        if not success:
            break

        img = detector.findPose(img)
        img = cv2.flip(img, 1)
        lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)

        if lmList:
            # Positioning for the shirt (using lmList landmarks)
            lm12 = lmList[30][1:5]

            # Load the shirt image
            shirtPath = os.path.join(shirtFolderPath, listShirts[imagenum])

            imgShirt = cv2.imread(shirtPath, cv2.IMREAD_UNCHANGED)

            if imgShirt is not None:
                # Resize the shirt image
                imgShirt = cv2.resize(imgShirt, (0, 0), None, 1, 1)

                try:
                    # Overlay the shirt image on the frame
                    img = cvzone.overlayPNG(img, imgShirt, lm12)
                except Exception as e:
                    print(f"Error overlaying image: {e}")

            # Overlay buttons for selection
            img = cvzone.overlayPNG(img, imagebutnRight, (1550, 514))
            img = cvzone.overlayPNG(img, imagebutnLeft, (293, 514))

            # Detect hand gestures to select shirt
            if lmList[16][1] < 500:  # Right hand gesture
                counterRight += 1
                cv2.ellipse(img, (350, 560), (66, 66), 0, 0,
                            counterRight * selectionSpeed, (0, 255, 0), 20)
                if counterRight * selectionSpeed > 560:
                    counterRight = 0
                    if imagenum < len(listShirts) - 1:
                        imagenum += 1
            elif lmList[15][1] < 500:  # Left hand gesture
                counterLeft += 1
                cv2.ellipse(img, (1620, 560), (66, 66), 0, 0,
                            counterLeft * selectionSpeed, (0, 255, 0), 20)
                if counterLeft * selectionSpeed > 560:
                    counterLeft = 0
                    if imagenum > 0:
                        imagenum -= 1
            else:
                counterRight = 0
                counterLeft = 0

        # Encode the processed frame in JPEG format
        ret, buffer = cv2.imencode('.jpg', img)
        img = buffer.tobytes()

        # Yield the frame in HTTP response format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + img + b'\r\n')

# Flask route to stream the video
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
