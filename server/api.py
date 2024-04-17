# server.py
from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
# from ultralytics import YOLO

# # Load the YOLOv5 model
# model = YOLO("model/best.pt")

# # Set the confidence threshold
# model.conf = 0.25


app = Flask(__name__)


def detect_defects(image):
    # Perform object detection
    results = model.predict(source=image, stream=True)

    # Visualize the results
    for result in results:
        boxes = result.boxes.data.tolist()
        for box in boxes:
            # Get the bounding box coordinates
            x1, y1, x2, y2, conf, cls = box
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

            # Get the class label
            label = result.names[int(cls)]

            # Draw the bounding box and label on the image
            cv2.rectangle(result.orig_img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(result.orig_img, f"{label} {conf:.2f}", (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (36, 255, 12), 2)

        # Return the annotated image
        annotated_image = cv2.cvtColor(result.orig_img, cv2.COLOR_BGR2RGB)
        return result.orig_img



@app.route('/api/upload', methods=['POST'])
def upload_image():
    # Get the image file from the request
    file = request.files['image']

    # Convert the file to a numpy array
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # result_img = detect_defects(img)

    # Convert the image to base64 string
    _, img_encoded = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(img_encoded).decode('utf-8')

    return jsonify({'image': img_base64})

if __name__ == '__main__':
    app.run(debug=True)