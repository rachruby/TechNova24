# import os
# import cvzone
# import cv2
# from cvzone.PoseModule import PoseDetector

# cap = cv2.VideoCapture(0)
# detector = PoseDetector()

# shirtFolderPath = "Resources/Shirts"
# listShirts = os.listdir(shirtFolderPath)

# fixedRatio = 262 / 860  # widthOfShirt/widthOfPoint11to12
# shirtRatioHeightWidth = 581 / 440
# imageNumber = 0
# imgButtonRight = cv2.imread("Resources/button.png", cv2.IMREAD_UNCHANGED)
# imgButtonLeft = cv2.flip(imgButtonRight, 1)
# counterRight = 0
# counterLeft = 0
# selectionSpeed = 10
# buttonRadius = 66  # Approximate button size (can be adjusted)

# while True:
#     success, img = cap.read()
#     if not success:
#         break

#     img = detector.findPose(img)
#     lmList, bboxInfo = detector.findPosition(img, bboxWithHands=False, draw=False)

#     if lmList: #something is detected
#         lm11 = lmList[11][1:3]
#         lm12 = lmList[12][1:3]

#         # Calculate widthOfShirt
#         widthOfShirt = int((lm11[0] - lm12[0]) * fixedRatio)

#         # Ensure the width is positive and non-zero
#         if widthOfShirt > 0:
#             imgShirt = cv2.imread(os.path.join(shirtFolderPath, listShirts[imageNumber]), cv2.IMREAD_UNCHANGED)

#             # Resize shirt to match the width calculated
#             imgShirt = cv2.resize(imgShirt, (widthOfShirt, int(widthOfShirt * shirtRatioHeightWidth)))

#             # Offset for positioning
#             currentScale = (lm11[0] - lm12[0]) / 190
#             offset = int(44 * currentScale), int(48 * currentScale)

#             try:
#                 # Overlay the shirt on the person
#                 img = cvzone.overlayPNG(img, imgShirt, (lm12[0] - offset[0], lm12[1] - offset[1]))
#             except Exception as e:
#                 print(f"Error overlaying PNG: {e}")

#         # Position buttons
#         img = cvzone.overlayPNG(img, imgButtonRight, (1295, 514))  # Right button
#         img = cvzone.overlayPNG(img, imgButtonLeft, (293, 514))   # Left button

#         # Check right hand and left hand positions and ensure only one activates at a time
#         rightHandRaised = lmList[16][1] < 300
#         leftHandLowered = lmList[15][1] > 900

#         # Only trigger the right button when the right hand is raised and the left hand is not active
#         if rightHandRaised and not leftHandLowered:
#             counterRight += 1
#             cv2.ellipse(img, (1238, 570), (buttonRadius, buttonRadius), 0, 0,
#                         counterRight * selectionSpeed, (0, 255, 0), 20)
#             if counterRight * selectionSpeed > 360:
#                 counterRight = 0
#                 if imageNumber < len(listShirts) - 1:
#                     imageNumber += 1
#         else:
#             counterRight = 0  # Reset counter when right hand is not in the correct position

#         # Only trigger the left button when the left hand is lowered and the right hand is not active
#         if leftHandLowered and not rightHandRaised:
#             counterLeft += 1
#             cv2.ellipse(img, (350, 570), (buttonRadius, buttonRadius), 0, 0,
#                         counterLeft * selectionSpeed, (0, 255, 0), 20)
#             if counterLeft * selectionSpeed > 360:
#                 counterLeft = 0
#                 if imageNumber > 0:
#                     imageNumber -= 1
#         else:
#             counterLeft = 0  # Reset counter when left hand is not in the correct position

#     if cv2.waitKey(10) & 0xFF == ord('q'):
#         break
#     cv2.imshow("Image", img)
#     cv2.waitKey(1)

# cap.release()
# cv2.destroyAllWindows()

