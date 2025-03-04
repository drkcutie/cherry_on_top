import io
import os
import uuid
import httpx
import yolov5
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image




load_dotenv()

API_KEY = os.getenv("API_KEY")
URL = os.getenv("URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = yolov5.load('keremberke/yolov5m-garbage')

# set model parameters
model.conf = 0.50  # NMS confidence threshold
model.iou = 0.45  # NMS IoU threshold
model.agnostic = False  # NMS class-agnostic
model.multi_label = False  # NMS multiple labels per box
model.max_det = 1000  # maximum number of detections per image

# class names
class_names = model.names

import io
import os
import uuid
import base64
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageDraw
import yolov5

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLOv5 model
model = yolov5.load('keremberke/yolov5m-garbage')

# Set model parameters
model.conf = 0.50  # Confidence threshold
model.iou = 0.45  # IoU threshold
class_names = model.names  # Get class names


@app.post("/detect/")
async def detect_objects(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}, size: {file.size}, content-type: {file.content_type}")

    # Validate file type
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    try:
        # Read the image
        file_name = str(uuid.uuid4()) + ".jpg"
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Run YOLO model on the image
        result = model(image)
        predictions = result.pred[0]

        # Check if there are detections
        if predictions.shape[0] == 0:
            return {"message": "No object found"}

        # Extract bounding boxes, confidence scores, and class labels
        boxes = predictions[:, :4]  # x1, y1, x2, y2
        scores = predictions[:, 4]  # Confidence scores
        categories = predictions[:, 5]  # Class indices

        detections = []
        draw = ImageDraw.Draw(image)  # For drawing on image

        for i, category in enumerate(categories):
            box = boxes[i].tolist()  # Convert tensor to list
            class_name = class_names[int(category)]  # Get class name
            score = float(scores[i])  # Convert tensor to float
            points = int(category) * score  # Custom points system

            # Draw bounding box
            draw.rectangle(box, outline="red", width=3)
            draw.text((box[0], box[1] - 10), f"{class_name}: {score:.2f}", fill="red")

            detections.append({
                "file_name": file_name,
                "class": class_name,
                "box": box,
                "score": score,
                "points": points
            })

        # Save annotated image to memory
        img_bytes = io.BytesIO()
        image.save(img_bytes, format="JPEG")
        img_bytes = img_bytes.getvalue()

        # Encode image to base64
        img_base64 = base64.b64encode(img_bytes).decode("utf-8")

        print("Detections:", detections)

        return JSONResponse(content={
            "detections": detections,
#             "image_base64": f"data:image/jpeg;base64,{img_base64}"  # Base64 format for frontend display
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")




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