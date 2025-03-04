import io
import os
import uuid
import httpx
import yolov5
from dotenv import load_dotenv

from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image

load_dotenv()

API_KEY = os.getenv("API_KEY")
URL = os.getenv("URL")

app = FastAPI()

model = yolov5.load('keremberke/yolov5m-garbage')

# set model parameters
model.conf = 0.50  # NMS confidence threshold
model.iou = 0.45  # NMS IoU threshold
model.agnostic = False  # NMS class-agnostic
model.multi_label = False  # NMS multiple labels per box
model.max_det = 1000  # maximum number of detections per image

# class names
class_names = model.names

@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)) -> []:
    file_name = str(uuid.uuid4())
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    result = model(image)


    predictions = result.pred[0]
    boxes = predictions[:, :4]
    scores = predictions[:, 4]
    categories = predictions[:, 5]

    detections = []
    for i, category in enumerate(categories):
        detections.append({
            "file_name": file_name,
            "class": class_names[int(category)],  # Get class name
            "box": boxes[i].tolist(),  # Convert tensor to list
            "score": float(scores[i]),  # Convert tensor to float
            "points": int(category) * float(scores[i])
        })

    # result.save(save_dir='/images')

    return detections if detections else "No object found"

@app.post('/suggest/')
async def suggest(waste_type: str, trash_type: str) :
    if not API_KEY:
        return {"error": "Missing API Key"}

    print("API_KEY: " , API_KEY)
    header = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "inputs": {
            "waste_type": waste_type,
            "trash_type": trash_type
        },
        "response_mode": "blocking",
        "user": "admin"
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(URL, headers=header, json=payload)

    print(f"Response Status: {response.status_code}")
    print(f"Response Content: {response.text}")

    # Handle non-200 responses
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=f"API error: {response.text}")

    try:
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Invalid JSON response: {response.text}")