import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import HeartForm from "@/components/heart-form";
import HeartIcon from "@/components/ui/heart-icon";
import ResultsDisplay from "@/components/results-display";
import { PredictionResult } from "@/lib/models";

export default function Home() {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 bg-opacity-90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Early Heart Attack Prediction</h1>
          <p className="text-xl text-muted-foreground">Complete the form below for your heart health assessment</p>
          
          {/* Heart illustration */}
          <div className="flex justify-center my-6">
            <HeartIcon />
          </div>
        </header>

        {/* Form or Results */}
        {!predictionResult ? (
          <Card className="bg-white rounded-xl shadow-lg max-w-3xl mx-auto mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Your Information</h2>
              <HeartForm 
                onFormSubmit={(result) => setPredictionResult(result)} 
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </CardContent>
          </Card>
        ) : (
          <ResultsDisplay 
            result={predictionResult} 
            onReset={() => setPredictionResult(null)}
          />
        )}
        
        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <p>Early Heart Attack Prediction Tool</p>
          <p className="text-sm mt-2">This tool provides general health insights and should not replace professional medical advice.</p>
        </footer>
      </div>
    </div>
  );
}
