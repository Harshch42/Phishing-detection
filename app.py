from flask import Flask, request, jsonify
from tensorflow import keras
# Import the CORS extension
from flask_cors import CORS

# Initialize CORS with your Flask app


# Import the extract_features function from your Feature_Extractor module
from Feature_Extractor import extract_features

app = Flask(__name__)

# Path to your trained model
model_path = 'Malicious_URL_Prediction.h5'

# Load the model once when the app starts
model = keras.models.load_model(model_path)

CORS(app)
# This function takes the URL and returns a probability value
def get_prediction(url):
    # Extract features from the URL
    url_features = extract_features(url)

    # Make a prediction
    prediction = model.predict([url_features])

    probability = prediction[0][0] * 100
    probability = round(probability, 3)

    return probability


@app.route('/predict', methods=['POST'])
def predict_url():
    data = request.get_json()

    if 'url' not in data:
        return jsonify({'error': 'Missing "url" parameter'}), 400

    url = data['url']

    try:
        probability = get_prediction(url)
        return jsonify({'probability': probability})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
