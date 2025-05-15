export interface HeartPredictionFormData {
  name: string;
  age: number;
  gender: number;
  bloodPressure: number;
  cholesterol: number;
  chestPainType: number;
}

export interface PredictionResult {
  hasHeartDisease: boolean;
  name: string;
  inputData: HeartPredictionFormData;
}

// Diet recommendations
export interface DietRecommendation {
  title: string;
  description: string;
}

export const healthyDietRecommendations: DietRecommendation[] = [
  { title: "Fruits and Vegetables", description: "Aim for at least 5 servings of various fruits and vegetables daily." },
  { title: "Whole Grains", description: "Choose whole grain versions of bread, pasta, and rice." },
  { title: "Lean Protein", description: "Include lean meats, poultry, fish, beans, and nuts in your diet." },
  { title: "Low-Fat Dairy", description: "Opt for low-fat or fat-free dairy products." },
  { title: "Healthy Fats", description: "Use olive oil, avocados, and nuts for healthy fats. Limit saturated fats." },
  { title: "Reduce Sodium", description: "Limit salt intake to less than 2,300mg daily (about 1 teaspoon)." },
  { title: "Limit Added Sugars", description: "Reduce consumption of sweets, sugary drinks, and processed foods." }
];

export const heartDiseaseDietRecommendations: DietRecommendation[] = [
  { title: "Reduce Sodium", description: "Limit sodium to 1,500mg per day. Avoid processed foods and use herbs for flavoring." },
  { title: "Heart-Healthy Fats", description: "Choose omega-3 fatty acids from fish, walnuts, and flaxseeds. Avoid trans fats completely." },
  { title: "Increase Fiber", description: "Eat high-fiber foods like oats, barley, beans, and plenty of vegetables." },
  { title: "Limit Red Meat", description: "Replace red meat with fish, skinless poultry, and plant-based proteins." },
  { title: "Control Portions", description: "Use smaller plates and follow recommended serving sizes." },
  { title: "Avoid Alcohol", description: "Limit or avoid alcohol consumption completely." },
  { title: "Mediterranean Diet", description: "Consider following the Mediterranean diet pattern, rich in plants, fish, and olive oil." },
  { title: "Regular Monitoring", description: "Track your food intake and work with a dietitian to create a personalized plan." }
];
