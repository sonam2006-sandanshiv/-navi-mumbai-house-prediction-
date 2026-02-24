import os
import pickle
from contextlib import asynccontextmanager
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    try:
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Failed to load model: {e}")
        # Not exiting completely so the API can still start and show an error upon request
    yield

app = FastAPI(title="Navi Mumbai House Price Prediction API",
              description="API for predicting house prices using an ML model.",
              lifespan=lifespan)

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend deployment URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class HousePredictionRequest(BaseModel):
    location: str
    area_sqft: float
    bhk: float
    bathrooms: float
    floor: float
    total_floors: float
    age_of_property: float
    parking: float
    lift: float

class HousePredictionResponse(BaseModel):
    predicted_price: float

@app.get("/api")
def read_root():
    return {"message": "Welcome to the Navi Mumbai House Price Prediction API!"}

@app.post("/api/predict", response_model=HousePredictionResponse)
def predict_price(request: HousePredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Machine learning model is not loaded/available.")

    # Create a DataFrame from the request body
    input_data = pd.DataFrame([{
        'location': request.location,
        'area_sqft': request.area_sqft,
        'bhk': request.bhk,
        'bathrooms': request.bathrooms,
        'floor': request.floor,
        'total_floors': request.total_floors,
        'age_of_property': request.age_of_property,
        'parking': request.parking,
        'lift': request.lift
    }])

    try:
        # Make predicting
        prediction = model.predict(input_data)
        predicted_price = float(prediction[0])
        return HousePredictionResponse(predicted_price=predicted_price)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
