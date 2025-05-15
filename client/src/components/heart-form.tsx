import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import { heartPredictionInputSchema, HeartPredictionInput } from "@shared/schema";
import { HeartPredictionFormData, PredictionResult } from "@/lib/models";
import { apiRequest } from "@/lib/queryClient";

interface HeartFormProps {
  onFormSubmit: (result: PredictionResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function HeartForm({ onFormSubmit, isLoading, setIsLoading }: HeartFormProps) {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<HeartPredictionInput>({
    resolver: zodResolver(heartPredictionInputSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: undefined,
      bloodPressure: undefined,
      cholesterol: undefined,
      chestPainType: undefined,
    },
  });

  async function onSubmit(data: HeartPredictionInput) {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/predict", data);
      const result = await response.json();
      
      // Create the prediction result
      const predictionResult: PredictionResult = {
        hasHeartDisease: result.prediction,
        name: data.name,
        inputData: data as HeartPredictionFormData
      };
      
      onFormSubmit(predictionResult);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("An error occurred while processing your information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age Field */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter your age" 
                    min={18} 
                    max={100} 
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Dropdown */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Male</SelectItem>
                    <SelectItem value="0">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blood Pressure Field */}
          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure (mmHg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter resting blood pressure" 
                    min={80} 
                    max={250} 
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cholesterol Field */}
          <FormField
            control={form.control}
            name="cholesterol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cholesterol (mg/dl)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter serum cholesterol" 
                    min={100} 
                    max={600} 
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Chest Pain Type Dropdown */}
          <FormField
            control={form.control}
            name="chestPainType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chest Pain Type</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chest pain type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0 - Typical Angina (No pain)</SelectItem>
                    <SelectItem value="1">1 - Atypical Angina</SelectItem>
                    <SelectItem value="2">2 - Non-Anginal Pain</SelectItem>
                    <SelectItem value="3">3 - Asymptomatic</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <Button 
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-pulse" />
                Processing...
              </>
            ) : (
              <>Check My Heart Health</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
