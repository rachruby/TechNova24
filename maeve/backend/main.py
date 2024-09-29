from fastapi import FastAPI

app = FastAPI()

from propelauth_fastapi import init_auth


from fastapi import Depends 
from propelauth_fastapi import User

auth = init_auth("https://195023487.propelauthtest.com", "4f38d5f94faa3e3bc186e2758d967d5684b700f56cee703a41c4e2b9dca8fc9e2cd445d68d1faea8532091a3cac1d8bc")

@app.get("/api/whoami")
async def root(current_user: User = Depends(auth.require_user)):
    return {"user_id": f"{current_user.user_id}"}