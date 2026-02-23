import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
import numpy as np

def train_model():
    print("Loading data...")
    data_path = os.path.join(os.path.dirname(__file__), '..', 'navi_mumbai_real_estate_uncleaned_2500_cleaned.csv')
    df = pd.read_csv(data_path)
    
    print("Data loaded. Shape:", df.shape)

    # Features and Target
    X = df.drop(columns=['actual_price'])
    y = df['actual_price']

    # Identify categorical and numerical columns
    categorical_features = ['location']
    numerical_features = ['area_sqft', 'bhk', 'bathrooms', 'floor', 'total_floors', 'age_of_property', 'parking', 'lift']

    # Preprocessing steps
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])

    # Model Pipeline using GradientBoostingRegressor
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(n_estimators=100, random_state=42))
    ])

    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training model...")
    model.fit(X_train, y_train)

    print("Evaluating model...")
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))

    print(f"R2 Score: {r2:.4f}")
    print(f"MAE: {mae:.2f}")
    print(f"RMSE: {rmse:.2f}")

    # Save the model
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    print(f"Saving model to {model_path}...")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print("Model saved successfully.")

if __name__ == "__main__":
    train_model()
