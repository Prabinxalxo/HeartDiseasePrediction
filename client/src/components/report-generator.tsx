import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PredictionResult, healthyDietRecommendations, heartDiseaseDietRecommendations } from "@/lib/models";
import { DownloadCloud, Share2, X } from "lucide-react";

interface ReportGeneratorProps {
  result: PredictionResult;
  onClose: () => void;
}

export default function ReportGenerator({ result, onClose }: ReportGeneratorProps) {
  const { hasHeartDisease, name, inputData } = result;
  const reportRef = useRef<HTMLDivElement>(null);
  const [showShareInfo, setShowShareInfo] = useState(false);
  
  const recommendations = hasHeartDisease ? heartDiseaseDietRecommendations : healthyDietRecommendations;
  
  // For traditional printing/downloading as PDF
  const handlePrint = useReactToPrint({
    documentTitle: `Heart Health Report - ${name}`,
    // @ts-ignore - Type error in react-to-print library
    content: () => reportRef.current,
    onAfterPrint: () => {
      console.log("Print completed or canceled");
    },
  });

  // Mobile-friendly sharing or saving
  const handleShare = async () => {
    try {
      // Check if the Web Share API is available (most mobile browsers)
      if (navigator.share) {
        // Create a text version of the report for sharing
        const reportText = `
Heart Health Assessment Report for ${name}

Personal Information:
- Name: ${name}
- Age: ${inputData.age}
- Gender: ${inputData.gender === 1 ? 'Male' : 'Female'}
- Blood Pressure: ${inputData.bloodPressure} mmHg
- Cholesterol: ${inputData.cholesterol} mg/dl
- Chest Pain Type: ${getChestPainTypeText(inputData.chestPainType)}

Assessment Result:
${hasHeartDisease ? "Heart Disease Risk Detected" : "No Heart Disease Risk Detected"}

Diet Recommendations:
${recommendations.map(r => `- ${r.title}: ${r.description}`).join('\n')}

Disclaimer: This assessment is based on the information provided and is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice and treatment.
        `;
        
        await navigator.share({
          title: `Heart Health Report - ${name}`,
          text: reportText,
        });
        console.log("Shared successfully");
      } else {
        // Fallback for browsers that don't support the Web Share API
        setShowShareInfo(true);
        console.log("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Show instructions for manual saving
      setShowShareInfo(true);
    }
  };

  // Get gender and chest pain type display text
  const getGenderText = (value: number) => value === 1 ? "Male" : "Female";
  
  const getChestPainTypeText = (value: number) => {
    switch(value) {
      case 0: return "0 - Typical Angina (No pain)";
      case 1: return "1 - Atypical Angina";
      case 2: return "2 - Non-Anginal Pain";
      case 3: return "3 - Asymptomatic";
      default: return "Unknown";
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto pb-20">
      <div className="sticky top-0 z-10 bg-white shadow-md p-3 flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Your Report</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="px-4 pt-4 pb-20 max-w-4xl mx-auto">
        <div 
          ref={reportRef} 
          className="p-4 md:p-8 bg-white max-w-[800px] mx-auto border border-gray-200 rounded-lg shadow-sm print:shadow-none print:border-none"
        >
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-primary mb-2">Heart Health Assessment Report</h1>
            <p className="text-gray-600 text-sm">{new Date().toLocaleDateString()}</p>
          </div>
          
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 border-b pb-2">Personal Information</h2>
            <table className="w-full border-collapse text-sm md:text-base">
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
                  <td className="py-2">{getChestPainTypeText(inputData.chestPainType)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Assessment Result */}
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 border-b pb-2">Assessment Result</h2>
            <div className={`p-4 rounded-lg ${hasHeartDisease ? 'bg-red-50' : 'bg-green-50'}`}>
              <p className={`font-bold ${hasHeartDisease ? 'text-red-600' : 'text-green-600'}`}>
                {hasHeartDisease ? "Heart Disease Risk Detected" : "No Heart Disease Risk Detected"}
              </p>
            </div>
          </div>
          
          {/* Diet Recommendations */}
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-bold mb-4 border-b pb-2">Diet Recommendations</h2>
            <div className="p-4 bg-gray-50 rounded-lg text-sm md:text-base">
              {recommendations.map((item, index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-xs md:text-sm text-gray-600">
            <p><strong>Disclaimer:</strong> This assessment is based on the information provided and is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice and treatment.</p>
          </div>
        </div>

        {/* Mobile-optimized action buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center gap-3 print:hidden">
          <button 
            onClick={handleShare}
            className="flex items-center justify-center bg-primary text-white px-4 py-3 rounded-full shadow-md hover:bg-primary/90 w-1/2"
          >
            <Share2 className="mr-2 h-5 w-5" /> Share
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center justify-center bg-gray-800 text-white px-4 py-3 rounded-full shadow-md hover:bg-gray-700 w-1/2"
          >
            <DownloadCloud className="mr-2 h-5 w-5" /> Save PDF
          </button>
        </div>

        {/* Instructions for manual saving on devices without share support */}
        {showShareInfo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-lg p-6 max-w-sm">
              <h3 className="text-lg font-bold mb-2">Save Your Report</h3>
              <p className="mb-4">To save this report on your device:</p>
              <ol className="list-decimal pl-5 mb-6 space-y-2 text-sm">
                <li>Take a screenshot of this page</li>
                <li>Or use the "Save PDF" button to download as a PDF file</li>
                <li>On iPhone, use the Share button in your browser and select "Add to Photos" or "Save to Files"</li>
                <li>On Android, use the browser menu to download the page</li>
              </ol>
              <button 
                onClick={() => setShowShareInfo(false)}
                className="w-full bg-primary text-white py-2 rounded-md"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
