import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, AlertCircle } from "lucide-react";
import type { TrendAnalysis } from "@shared/schema";

interface ViralPredictionProps {
  analysis: TrendAnalysis;
}

export function ViralPrediction({ analysis }: ViralPredictionProps) {
  const { viralPrediction } = analysis;
  
  if (!viralPrediction) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "bg-green-500";
    if (confidence >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getIconColor = (confidence: number) => {
    if (confidence >= 70) return "text-green-600";
    if (confidence >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">🔥 Viral Potential</CardTitle>
          <Badge 
            variant={viralPrediction.isLikelyToGoViral ? "default" : "secondary"}
            className="text-xs"
          >
            {viralPrediction.isLikelyToGoViral ? "About to Trend" : "Stable"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            {viralPrediction.isLikelyToGoViral ? (
              <Flame className={`w-5 h-5 ${getIconColor(viralPrediction.confidence)}`} />
            ) : (
              <TrendingUp className={`w-5 h-5 ${getIconColor(viralPrediction.confidence)}`} />
            )}
            <div>
              <p className="font-medium text-sm sm:text-base">
                {viralPrediction.isLikelyToGoViral ? "Likely to Go Viral" : "Stable Trend"}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                {viralPrediction.confidence}% confidence
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getConfidenceColor(viralPrediction.confidence)}`}
              style={{ width: `${viralPrediction.confidence}%` }}
            />
          </div>

          <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 text-sm sm:text-base">AI Analysis</h4>
                <p className="text-xs sm:text-sm text-blue-700 mt-1 leading-relaxed">
                  {viralPrediction.reason}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}