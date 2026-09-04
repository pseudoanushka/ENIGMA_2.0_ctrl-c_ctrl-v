import joblib
import numpy as np
import os 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "cancer_prediction_model.pkl"))
le_target = joblib.load(os.path.join(BASE_DIR, "target_encoder.pkl"))
le_sex = joblib.load(os.path.join(BASE_DIR, "sex_encoder.pkl"))

def predict_cancer(data):

    # Encode sex
    sex_encoded = le_sex.transform([data["Sex"]])[0]

    features = np.array([[
        float(data["Diagnosis Age"]),
        float(data["Mutation Count"]),
        sex_encoded,
        float(data["TMB (nonsynonymous)"]),
        float(data["Number of Samples Per Patient"])
    ]])

    prediction = model.predict(features)
    probability = model.predict_proba(features)

    cancer_type = le_target.inverse_transform(prediction)[0]
    confidence = float(np.max(probability)) * 100

    return {
        "prediction": cancer_type,
        "confidence": round(confidence, 2)
    }