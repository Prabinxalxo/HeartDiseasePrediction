import { healthyDietRecommendations, heartDiseaseDietRecommendations } from "@/lib/models";
import { Utensils } from "lucide-react";

interface DietRecommendationsProps {
  hasHeartDisease: boolean;
}

export default function DietRecommendations({ hasHeartDisease }: DietRecommendationsProps) {
  const recommendations = hasHeartDisease ? heartDiseaseDietRecommendations : healthyDietRecommendations;

  return (
    <div className="diet-recommendations mb-6">
      <h3 className="text-xl font-semibold mb-3 text-primary flex items-center">
        <Utensils className="mr-2 h-5 w-5" /> Recommended Diet Plan
      </h3>
      
      {/* Food platter image */}
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100" 
          height="100" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-gray-400"
        >
          <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z"/>
          <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8"/>
          <path d="M15 2v5h5"/>
        </svg>
      </div>
      
      {/* Diet Recommendations */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        {recommendations.map((item, index) => (
          <div key={index} className="diet-item">
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
