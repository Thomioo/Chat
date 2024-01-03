import uvicorn, json, datetime

from fastapi import FastAPI
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

reloaded = False

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    with open("msgs.json", "r") as file:
        data = json.loads(file.read())
except:
    data = {}

@app.get("/")
def f():
    return FileResponse("/Client/index.html", 200)

@app.get("/style.css")
def f():
    return FileResponse("/Client/style.css", 200)

@app.get("/script.js")
def f():
    return FileResponse("/Client/script.js", 200)

@app.get("/history")
def f(key: int):
    if key == 86923:
        return JSONResponse(dict(list(data.items())[:100]), 200)
    
    if datetime.minute % 10 == 0 and reloaded == False:
        # reload
        with open("msgs.json", "w+") as f:
            f.write(json.dumps(data))
        reloaded = True
    else:
        reloaded = False
    return 404

@app.get("/message")
def f(user: str, message: str, time: str):
    try:
        last = int(list(data)[-1]) + 1
    except:
        last = 0
    data.update({
        last: {
            "user": user,
            "message": message, 
            "time": time,
            }
        }
    )
    return JSONResponse(dict(list(data.items())[:100]), 200)


if __name__ == "__main__":
    uvicorn.run(app, port=8080)
    with open("msgs.json", "w+") as f:
        f.write(json.dumps(data))
