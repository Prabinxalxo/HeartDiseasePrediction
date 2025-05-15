import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, DownloadCloud, RotateCcw } from "lucide-react";
import DietRecommendations from "@/components/diet-recommendations";
import ReportGenerator from "@/components/report-generator";
import { PredictionResult } from "@/lib/models";

interface ResultsDisplayProps {
  result: PredictionResult;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const { hasHeartDisease, name } = result;

  // Set border color based on result
  const borderColorClass = hasHeartDisease ? "border-l-8 border-l-red-500" : "border-l-8 border-l-green-500";
  const bgColorClass = hasHeartDisease ? "bg-red-50" : "bg-green-50";
  const textColorClass = hasHeartDisease ? "text-red-600" : "text-green-600";

  return (
    <>
      <Card className={`bg-white rounded-xl shadow-lg max-w-3xl mx-auto mb-8 ${borderColorClass}`}>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your Heart Health Results</h2>
          
          <div className={`p-4 rounded-lg mb-6 ${bgColorClass}`}>
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">
                {hasHeartDisease ? (
                  <AlertTriangle className={`h-8 w-8 ${textColorClass}`} />
                ) : (
                  <CheckCircle className={`h-8 w-8 ${textColorClass}`} />
                )}
              </span>
              <h3 className={`text-2xl font-bold ${textColorClass}`}>
                {hasHeartDisease ? "Heart Disease Risk Detected" : "No Heart Disease Risk Detected"}
              </h3>
            </div>
            <p className="text-lg">
              {hasHeartDisease
                ? `${name}, based on the information you provided, we've detected potential risk factors for heart disease. We recommend consulting with a healthcare professional for a comprehensive evaluation.`
                : `Great news, ${name}! Based on the information you provided, we haven't detected significant risk factors for heart disease. Continue maintaining a healthy lifestyle.`
              }
            </p>
          </div>

          {/* Diet Recommendations */}
          <DietRecommendations hasHeartDisease={hasHeartDisease} />

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button
              onClick={() => setIsPrinting(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg"
            >
              <DownloadCloud className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> New Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hidden report template for printing */}
      {isPrinting && (
        <ReportGenerator 
          result={result} 
          onClose={() => setIsPrinting(false)} 
        />
      )}
    </>
  );
}
