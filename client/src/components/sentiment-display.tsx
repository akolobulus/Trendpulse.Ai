import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { TrendAnalysis } from "@shared/schema";

interface SentimentDisplayProps {
  analysis: TrendAnalysis;
}

export function SentimentDisplay({ analysis }: SentimentDisplayProps) {
  const sentiments = [
    {
      label: "Positive",
      percentage: analysis.positivePercentage,
      color: "bg-green-500",
      dotColor: "bg-green-500"
    },
    {
      label: "Neutral",
      percentage: analysis.neutralPercentage,
      color: "bg-gray-500",
      dotColor: "bg-gray-500"
    },
    {
      label: "Negative",
      percentage: analysis.negativePercentage,
      color: "bg-red-500",
      dotColor: "bg-red-500"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Sentiment Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 sm:space-y-4">
          {sentiments.map((sentiment) => (
            <div key={sentiment.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0 ${sentiment.dotColor}`} />
                <span className="text-xs sm:text-sm text-gray-700 truncate">{sentiment.label}</span>
              </div>
              <div className="flex items-center space-x-2 ml-2">
                <Progress value={sentiment.percentage} className="w-16 sm:w-24" />
                <span className="text-xs sm:text-sm font-medium text-gray-900 min-w-[2.5rem] sm:min-w-[3rem]">
                  {sentiment.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">AI Sentiment Summary</h4>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{analysis.aiInsights}</p>
        </div>
      </CardContent>
    </Card>
  );
}
