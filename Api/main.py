from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from datetime import datetime
from contextlib import asynccontextmanager
import os

# --- Config ---
MODEL_PATH = "../Model/saved_models/house_price_model.pkl"
INFLATION_RATE = 0.4375  # 43.75% inflation
model = None
encoder = None  

# --- Lifespan for startup/shutdown ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, encoder
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("✅ Model loaded successfully.")
        
    else:
        print(f"❌ Model not found at: {MODEL_PATH}")
    yield
    print("🛑 API shutdown.")

app = FastAPI(
    title="Tehran House Price Prediction API",
    description="Predicts house prices in Toman using a trained XGBoost model",
    version="1.2.0",
    lifespan=lifespan
)

# --- req & res model ---
class HouseFeatures(BaseModel):
    Area: float
    Room: int
    Parking: bool
    Warehouse: bool
    Elevator: bool
    Address: str

class PricePrediction(BaseModel):
    price_toman: float
    price_toman_with_inflation: float

# --- Root Endpoint ---
@app.get("/")
async def root():
    return {
        "status": "active",
        "message": "Tehran House Price Prediction API",
        "inflation_rate": INFLATION_RATE,
        "model_version": "1.2.0"
    }

# --- Prediction Endpoint ---
@app.post("/predict", response_model=PricePrediction)
async def predict(features: HouseFeatures):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        #input dataframe
        input_data = {
            'Area': features.Area,
            'Room': features.Room,
            'Parking': int(features.Parking),
            'Warehouse': int(features.Warehouse),
            'Elevator': int(features.Elevator),
        }
        
        # Handle the Address feature based on what the model expects
        if encoder is not None:
            # If we have an encoder, transform the address
            address_encoded = encoder.transform([[features.Address]])[0]
            # Add encoded address features to input data
            if isinstance(address_encoded, pd.DataFrame):
                for col in address_encoded.columns:
                    input_data[col] = address_encoded[col].values[0]
            else:
                # If one-hot encoding or similar
                for i, val in enumerate(address_encoded):
                    input_data[f'Address_{i}'] = val
        else:
            # If no encoder, just add address as-is (model might handle it or ignore it)
            input_data['Address'] = features.Address
        

        input_df = pd.DataFrame([input_data])
        
        # Remove any columns the model doesn't expect
        model_columns = getattr(model, 'feature_names_', None)
        if model_columns:
            # Keep only columns that the model expects
            input_df = input_df[model_columns]
        
        # magic prediction  (=
        price_toman = float(model.predict(input_df)[0])
        price_toman_with_inflation = price_toman * (1 + INFLATION_RATE)
        
        return {
            "price_toman": round(price_toman, 2),
            "price_toman_with_inflation": round(price_toman_with_inflation, 2),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)