import sys
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the heart disease dataset
def load_data():
    try:
        data = pd.read_csv('attached_assets/heart.csv')
        return data
    except Exception as e:
        print(f"Error loading data: {str(e)}", file=sys.stderr)
        sys.exit(1)

# Train a model on the dataset
def train_model(data):
    # Prepare features and target
    X = data[['age', 'sex', 'cp', 'trestbps', 'chol']]
    y = data['target']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    
    # Train a Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    return model, scaler

# Make prediction with new data
def predict(model, scaler, input_data):
    # Extract input values
    chest_pain_type = input_data["chestPainType"]
    cholesterol = input_data["cholesterol"]
    blood_pressure = input_data["bloodPressure"]
    
    # New custom prediction logic as per requirements
    risk_factors = 0
    
    # Risk factor 1: Chest pain type is 2 or 3
    if chest_pain_type >= 2:
        risk_factors += 1
        
    # Risk factor 2: Cholesterol greater than 250
    if cholesterol > 250:
        risk_factors += 1
        
    # Risk factor 3: Blood pressure greater than 150
    if blood_pressure > 150:
        risk_factors += 1
    
    # If 2 or more risk factors are present, predict heart disease
    has_heart_disease = risk_factors >= 2
    
    return bool(has_heart_disease)

def main():
    # Parse input data from command line argument
    input_json = sys.argv[1]
    input_data = json.loads(input_json)
    
    # Load data and train model
    data = load_data()
    model, scaler = train_model(data)
    
    # Make prediction
    result = predict(model, scaler, input_data)
    
    # Return result as JSON
    print(json.dumps({"prediction": result}))

if __name__ == "__main__":
    main()
