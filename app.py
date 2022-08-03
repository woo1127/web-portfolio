from flask import Flask, render_template, request, jsonify
from tensorflow import keras
from PIL import Image
import keras
import os
import numpy as np


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    # the location of image that is temporary store in the browser file storage
    req = request.files['file']

    # open img with pillow
    img = Image.open(req)

    # resize to specify size to match the input of DL model
    img = img.resize((180, 180))

    # convert to rgb to decrease the color channel from 4 to 3
    img = img.convert('RGB')

    # convert img into array of numpy data
    npimg = np.asarray(img)

    global result
    result = prediction(npimg)

    return jsonify({'imgpath': 'Done'})


@app.route('/class')
def classes():

    return jsonify({'result': result})


def prediction(img_tensor):
    model_path = os.path.join('static', 'model', 'feature_extraction_with_data_augmentation.keras')
    model = keras.models.load_model(model_path)
                
    img_tensor = np.expand_dims(img_tensor, axis=0)         

    class_name = ['Cat', 'Dog']

    pred = model.predict(img_tensor)

    predicted_class = class_name[int(np.where(pred < 0.5, 0, 1))]

    print(predicted_class)

    return predicted_class


if __name__ == '__main__':
    app.run(debug=True)
