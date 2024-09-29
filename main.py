import os
import cvzone
import cv2
from cvzone.PoseModule import PoseDetector

cap = cv2.VideoCapture(0)
detector = PoseDetector()

# Folder path for shirts
shirtFolderPath = "Resources/Shirts"
listShirts = os.listdir(shirtFolderPath)
imagenum = 0

# Button images
imagebutnRight = cv2.imread("Resources/button.png", cv2.IMREAD_UNCHANGED)
imagebutnLeft = cv2.flip(imagebutnRight, 1)
counterRight = 0 
counterLeft = 0
selectionSpeed = 10

while True:
    success, img = cap.read()
    img = detector.findPose(img)
    img = cv2.flip(img, 1)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)
    
    if lmList:
        # Positioning for the shirt (using lmList landmarks)
        lm12 = lmList[30][1:5]

        # Load the shirt image
        shirtPath = os.path.join(shirtFolderPath, listShirts[imagenum])
        imgShirt = cv2.imread(shirtPath, cv2.IMREAD_UNCHANGED)

        # Check if the image was successfully loaded
        if imgShirt is None:
            print("Image not found or unable to load:", listShirts[imagenum])
            continue

        # Resize the shirt image (you can adjust the scaling factors if needed)
        imgShirt = cv2.resize(imgShirt, (0, 0), None, 1, 1)

        try:
            # Overlay the shirt image on the frame
            img = cvzone.overlayPNG(img, imgShirt, lm12)
        except Exception as e:
            print(f"Error overlaying image: {e}")
            pass

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

    # Exit condition
    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

    # Display the final image
    cv2.imshow("Image", img)
    cv2.waitKey(1)
