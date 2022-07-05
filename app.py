from flask import Flask, render_template, request, session
from werkzeug.utils import secure_filename
from tensorflow import keras
from tensorflow.keras.preprocessing import image
import keras
import os
import numpy as np

UPLOAD_FOLDER = os.path.join('static', 'uploads')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'hellos'

@app.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        img = request.files['upload-file']
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))

        img.save(img_path)
        session['img_path'] = img_path

    return render_template('index.html')


@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        img = request.files['file']
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(img.filename))

        img.save(img_path)

        predicted = prediction(img_path)

        return predicted

    return None


def prediction(img_path):
    model_path = os.path.join('static', 'model', 'feature_extraction_with_data_augmentation.keras')
    model = keras.models.load_model(model_path)

    img = image.load_img(img_path, target_size=(180, 180))
    img_tensor = image.img_to_array(img)                   
    img_tensor = np.expand_dims(img_tensor, axis=0)         

    class_name = ['Cat', 'Dog']

    pred = model.predict(img_tensor)

    predicted_class = class_name[int(np.where(pred < 0.5, 0, 1))]

    return predicted_class
    

if __name__ == '__main__':
    app.run(debug=True)
