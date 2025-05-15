import { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { PredictionResult, healthyDietRecommendations, heartDiseaseDietRecommendations } from "@/lib/models";

interface ReportGeneratorProps {
  result: PredictionResult;
  onClose: () => void;
}

export default function ReportGenerator({ result, onClose }: ReportGeneratorProps) {
  const { hasHeartDisease, name, inputData } = result;
  const reportRef = useRef<HTMLDivElement>(null);
  
  const recommendations = hasHeartDisease ? heartDiseaseDietRecommendations : healthyDietRecommendations;
  
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `Heart Health Report - ${name}`,
    onAfterPrint: onClose,
  });

  // Get gender and chest pain type display text
  const getGenderText = (value: number) => value === 1 ? "Male" : "Female";
  
  const getChestPainText = (value: number) => {
    switch(value) {
      case 0: return "0 - Typical Angina (No pain)";
      case 1: return "1 - Atypical Angina";
      case 2: return "2 - Non-Anginal Pain";
      case 3: return "3 - Asymptomatic";
      default: return "Unknown";
    }
  };

  // Trigger print automatically when component mounts
  useEffect(() => {
    handlePrint();
  }, [handlePrint]);

  return (
    <div className="hidden">
      <div ref={reportRef} className="p-8 bg-white max-w-[800px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Heart Health Assessment Report</h1>
          <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Personal Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold w-1/3">Name:</td>
                <td className="py-2">{name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Age:</td>
                <td className="py-2">{inputData.age}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Gender:</td>
                <td className="py-2">{getGenderText(inputData.gender)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Blood Pressure:</td>
                <td className="py-2">{inputData.bloodPressure} mmHg</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Cholesterol:</td>
                <td className="py-2">{inputData.cholesterol} mg/dl</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-semibold">Chest Pain Type:</td>
                <td className="py-2">{getChestPainText(inputData.chestPainType)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Assessment Result */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Assessment Result</h2>
          <div className={`p-4 rounded-lg ${hasHeartDisease ? 'bg-red-50' : 'bg-green-50'}`}>
            <p className={`font-bold ${hasHeartDisease ? 'text-red-600' : 'text-green-600'}`}>
              {hasHeartDisease ? "Heart Disease Risk Detected" : "No Heart Disease Risk Detected"}
            </p>
          </div>
        </div>
        
        {/* Diet Recommendations */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Diet Recommendations</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            {recommendations.map((item, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-semibold">{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <p><strong>Disclaimer:</strong> This assessment is based on the information provided and is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice and treatment.</p>
        </div>
      </div>
    </div>
  );
}
