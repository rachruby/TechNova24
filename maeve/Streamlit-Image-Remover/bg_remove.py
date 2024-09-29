from io import BytesIO

import streamlit as st
from PIL import Image
from rembg import remove

st.header("Get your clothes with transparent background!")

# Upload the file
imageUploaded = st.file_uploader("Upload your clothes image", type=["png", "jpg", "jpeg"])

# Convert the image to BytesIO so we can download it!
def deleteBg(img):
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    byteIm = buffer.getvalue()
    return byteIm

# If we've uploaded an image, open it and remove the background!
if imageUploaded:
    # SHOW the uploaded image!
    st.image(imageUploaded)
    image = Image.open(imageUploaded)
    fixed = remove(image)
    newImage = deleteBg(fixed)
    # SHOW the improved image!
    st.image(newImage)
    st.downloadButton(
        "Here is your clothes", newImage, "fixed.png", "image/png"
    )