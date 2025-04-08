# Dataset: https://www.kaggle.com/datasets/mokar2001/house-price-tehran-iran/data
import pandas as pd
import numpy as np
import re
import os
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import xgboost as xgb
import joblib

# ================
# Setup
# ================
os.makedirs("saved_models", exist_ok=True)
os.makedirs("graphs", exist_ok=True)

# ================
# Load & Clean
# ================
def load_data(filepath):
    df = pd.read_csv(filepath)
    print(f"✅ Loaded: {df.shape[0]} rows")
    return df

def clean_data(df):
    df['Price'] = df['Price'].astype(str).apply(lambda x: re.sub(r'[^\d.]', '', x)).astype(float)
    for col in ['Parking', 'Warehouse', 'Elevator']:
        df[col] = df[col].astype(str).map({'True': 1, 'true': 1, '1': 1, 'False': 0, 'false': 0, '0': 0}).fillna(0).astype(int)
    return df

# ================
# Graphs
# ================
def plot_distribution(df, col, title, color='blue'):
    plt.figure(figsize=(10, 5))
    sns.histplot(df[col], bins=40, kde=True, color=color)
    plt.title(title)
    plt.grid()
    plt.savefig(f"graphs/{col}_distribution.png")
    plt.close()

def plot_all_distributions(df):
    plot_distribution(df, 'Area', '🏠 Area Distribution', color='skyblue')
    plot_distribution(df, 'Room', '🛏️ Room Distribution', color='orange')
    plot_distribution(df, 'Price', '💰 Price Distribution', color='green')

# ================
# Preprocessing
# ================
def get_preprocessor():
    return ColumnTransformer(transformers=[
        ('num', StandardScaler(), ['Area', 'Room', 'Parking', 'Warehouse', 'Elevator']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['Address'])
    ])

# ================
# Training
# ================
def train_model(df, preprocessor):
    X = df[['Area', 'Room', 'Parking', 'Warehouse', 'Elevator', 'Address']]
    y = df['Price']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', xgb.XGBRegressor(
            n_estimators=250,
            learning_rate=0.04,
            max_depth=7,
            subsample=0.9,
            colsample_bytree=0.9,
            objective='reg:squarederror',
            random_state=42
        ))
    ])

    print("\n🚀 Training...")
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    print(f"✅ R2 Score: {r2_score(y_test, y_pred):.4f}")
    print(f"✅ MAE: {mean_absolute_error(y_test, y_pred):,.0f}")
    print(f"✅ RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.0f}")
    return pipeline, y_test, y_pred

# ================
# Results Plot
# ================
def plot_prediction_results(y_true, y_pred):
    df = pd.DataFrame({'Actual': y_true, 'Predicted': y_pred})
    
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='Actual', y='Predicted', data=df, alpha=0.6)
    plt.plot([y_true.min(), y_true.max()], [y_true.min(), y_true.max()], 'r--')
    plt.title('📈 Predicted vs Actual Prices')
    plt.grid()
    plt.savefig("graphs/predicted_vs_actual.png")
    plt.close()

    # Error Distribution
    error = y_true - y_pred
    plt.figure(figsize=(10, 5))
    sns.histplot(error, bins=50, kde=True, color='red')
    plt.title("📉 Prediction Error Distribution")
    plt.grid()
    plt.savefig("graphs/prediction_error_distribution.png")
    plt.close()

# ================
# Save Model
# ================
def save_model(model, path="saved_models/house_price_model.pkl"):
    joblib.dump(model, path)
    print(f"💾 Model saved at {path}")

# ================
# Main
# ================
def main(filepath):
    df = load_data(filepath)
    df = clean_data(df)
    plot_all_distributions(df)

    preprocessor = get_preprocessor()
    model, y_test, y_pred = train_model(df, preprocessor)

    plot_prediction_results(y_test, y_pred)
    save_model(model)

if __name__ == "__main__":
    try:
        main("houseprice.csv")
    except Exception as e:
        print(f"❌ Error: {e}")