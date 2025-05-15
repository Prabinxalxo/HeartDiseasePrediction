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
    # Map input data to the format expected by the model
    features = np.array([
        input_data["age"],
        input_data["gender"],
        input_data["chestPainType"],
        input_data["bloodPressure"],
        input_data["cholesterol"]
    ]).reshape(1, -1)
    
    # Standardize the input
    features_scaled = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features_scaled)[0]
    
    return bool(prediction)

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
