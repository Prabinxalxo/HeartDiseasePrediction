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
      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="220" 
          height="160" 
          viewBox="0 0 100 70" 
          className="text-gray-800"
        >
          {/* Plate */}
          <ellipse cx="50" cy="45" rx="45" ry="15" fill="#f5f5f5" stroke="#d1d1d1" strokeWidth="1" />
          
          {/* Vegetables */}
          <circle cx="35" cy="40" r="8" fill="#4ade80" /> {/* Broccoli */}
          <circle cx="35" cy="40" r="6" fill="#22c55e" />
          <circle cx="35" cy="40" r="4" fill="#16a34a" />
          
          <path d="M62,40 Q65,35 68,40 T74,40" fill="#ef4444" strokeWidth="1" stroke="#dc2626" /> {/* Tomato */}
          <circle cx="68" cy="40" r="5" fill="#ef4444" />
          
          <ellipse cx="50" cy="45" rx="6" ry="3" fill="#fcd34d" /> {/* Corn */}
          <ellipse cx="50" cy="41" rx="6" ry="3" fill="#fcd34d" />
          
          <path d="M23,43 C25,38 29,38 31,43" fill="#a16207" /> {/* Fish */}
          <path d="M31,43 C33,46 29,49 23,43 Z" fill="#a16207" />
          
          <ellipse cx="80" cy="43" rx="8" ry="3" fill="#92400e" /> {/* Whole Grain */}
          <ellipse cx="80" cy="43" rx="7" ry="2" fill="#78350f" />
          
          {/* Fruits to the side */}
          <circle cx="15" cy="25" r="4" fill="#f87171" /> {/* Apple */}
          <path d="M15,21 L16,18" stroke="#84cc16" strokeWidth="1" /> {/* Apple stem */}
          
          <circle cx="85" cy="28" r="5" fill="#8b5cf6" /> {/* Grapes */}
          <circle cx="82" cy="24" r="5" fill="#a855f7" />
          <circle cx="88" cy="24" r="5" fill="#8b5cf6" />
          
          {/* Plate reflection */}
          <ellipse cx="35" cy="50" rx="10" ry="3" fill="white" opacity="0.3" />
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
