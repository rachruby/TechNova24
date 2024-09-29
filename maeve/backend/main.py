# from fastapi import Depends 
# from propelauth_fastapi import User

# auth = init_auth("https://195023487.propelauthtest.com", "4f38d5f94faa3e3bc186e2758d967d5684b700f56cee703a41c4e2b9dca8fc9e2cd445d68d1faea8532091a3cac1d8bc")

# @app.get("/userClothing/")
# async def get_user_clothing(user: User = Depends(auth.get_current_user)):
#     return user.clothes  # Return the clothing items associated with the user


# IF WE WANTED TO IMPLEMENT ACCESS TOKENS: 
# from fastapi import FastAPI
# app = FastAPI()
# from propelauth_fastapi import init_auth

# @app.get("/api/whoami")
# async def root(current_user: User = Depends(auth.require_user)):
#     return {"user_id": f"{current_user.user_id}"}