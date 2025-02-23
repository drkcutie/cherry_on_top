import io
import uuid

import yolov5
from fastapi import FastAPI, UploadFile, File
from PIL import Image

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
