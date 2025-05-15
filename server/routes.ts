import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { HeartPredictionInput, heartPredictionInputSchema } from "@shared/schema";
import { spawn } from "child_process";

export async function registerRoutes(app: Express): Promise<Server> {
  // Heart disease prediction endpoint
  app.post('/api/predict', async (req, res) => {
    try {
      // Validate the request body
      const validationResult = heartPredictionInputSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid input data",
          errors: validationResult.error.errors 
        });
      }
      
      const inputData: HeartPredictionInput = validationResult.data;
      
      // Run the prediction using Python script
      const prediction = await runPrediction(inputData);
      
      // Save the prediction to storage (optional)
      const timestamp = new Date().toISOString();
      
      // Return the prediction result
      return res.status(200).json({
        prediction,
        timestamp
      });
    } catch (error) {
      console.error("Prediction error:", error);
      return res.status(500).json({ message: "An error occurred during prediction" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to run Python prediction script
async function runPrediction(inputData: HeartPredictionInput): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Convert input data to JSON string
    const inputJson = JSON.stringify(inputData);
    
    // Spawn Python process
    const pythonProcess = spawn('python3', ['server/prediction.py', inputJson]);
    
    let outputData = '';
    let errorData = '';
    
    // Collect data from script output
    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });
    
    // Collect error data
    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
    });
    
    // Handle process completion
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}`);
        console.error(`Error output: ${errorData}`);
        reject(new Error(`Prediction failed with code ${code}: ${errorData}`));
        return;
      }
      
      try {
        // Parse the output JSON
        const result = JSON.parse(outputData);
        resolve(result.prediction);
      } catch (error) {
        console.error("Failed to parse prediction result:", error);
        reject(error);
      }
    });
  });
}
