
# 🏠 House Price Prediction - Tehran, Iran 🇮🇷

Predict housing prices in Tehran using machine learning techniques with a clean, optimized, and production-ready pipeline built on Python, XGBoost, and Scikit-learn.

[![Made with Python](https://img.shields.io/badge/Made%20with-Python-blue?style=flat-square&logo=python&logoColor=white)](https://python.org/)
[![XGBoost](https://img.shields.io/badge/Model-XGBoost-brightgreen?style=flat-square&logo=xgboost)](https://xgboost.readthedocs.io/)
[![Dataset on Kaggle](https://img.shields.io/badge/Dataset-Kaggle-blue?style=flat-square&logo=kaggle)](https://www.kaggle.com/datasets/mokar2001/house-price-tehran-iran/data)

---

## 📌 Description

This project aims to **predict housing prices in Tehran, Iran** using machine learning. We leverage structured property features such as area, room count, amenities, and location (address), and apply advanced preprocessing and modeling techniques.

The project is optimized to:
- Clean and prepare the dataset.
- Encode categorical features.
- Normalize numerical features.
- Train an XGBoost Regressor to predict prices in USD.
- Save the trained model for future predictions.

💡 The actual conversion to Iranian Rial is handled separately via an external API using the current exchange rate — this repo only focuses on predicting prices in **USD**.

---

## 📊 Dataset

- Source: [Kaggle - House Price Tehran](https://www.kaggle.com/datasets/mokar2001/house-price-tehran-iran/data)
- Features include:
  - `Area`, `Room`, `Address`, `Parking`, `Warehouse`, `Elevator`
  - `Price` in IRR and/or `Price(USD)` depending on the dataset version

---

## 🔧 Technologies Used

| Component        | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `Python 3.x`     | Core programming language                                                   |
| `Pandas`         | Data manipulation and analysis                                              |
| `NumPy`          | Numerical operations                                                        |
| `Scikit-learn`   | Preprocessing, pipeline construction, and model evaluation                  |
| `XGBoost`        | Gradient boosting model for price prediction                                |
| `Joblib`         | Model serialization                                                         |
| `Regular Expressions` | Data cleaning (removing non-numeric characters in price columns)        |

---

## 🔍 Methodology

### 1. `load_data(filepath)`
Loads and displays the shape of the dataset from a CSV file.

---

### 2. `preprocess_data(data)`
- Cleans `Price` and `Price(USD)` by removing commas, spaces, and non-numeric characters.
- Maps boolean columns (`Parking`, `Warehouse`, `Elevator`) to `0/1` integers.
- Encodes `Address` using OneHotEncoder.
- Scales numerical features (`Area`, `Room`, etc.) using `StandardScaler`.
- Returns a combined `ColumnTransformer`.

---

### 3. `train_model(data, preprocessor, target_column='Price(USD)')`
- Automatically selects the target column (`Price(USD)` preferred, else `Price`).
- Splits data into training and testing sets (80/20).
- Constructs a pipeline:
  - Preprocessing (via `ColumnTransformer`)
  - Regressor: `XGBRegressor`
- Evaluates model with R² scores.
- Returns trained model and sample predictions.

---

### 4. `save_model(model, filename='house_price_model.pkl')`
Saves the trained model using `joblib` for future inference.

---

### 5. `main(filepath)`
Orchestrates the full pipeline:
- Loads data
- Preprocesses it
- Trains model
- Evaluates and saves the model
- Prints sample predictions (Actual vs. Predicted)

---

## 📈 Sample Output

After training:

```plaintext
Model R² on training data: 0.96
Model R² on test data: 0.89

Sample predictions:
   Actual   Predicted  Difference
0  88000.0   86973.52     1026.48
1 120000.0  117583.12     2416.88
2  56000.0   57712.88    -1712.88
...
```

---


## 🪙 License

This project is open-source under the MIT License.

---

## ⭐️ Show Your Support

If this project helped you or inspired you, please consider giving it a ⭐️ on GitHub!

```

