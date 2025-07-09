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
      <CardHeader>
        <CardTitle>Sentiment Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentiments.map((sentiment) => (
            <div key={sentiment.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${sentiment.dotColor}`} />
                <span className="text-sm text-gray-700">{sentiment.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={sentiment.percentage} className="w-24" />
                <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                  {sentiment.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">AI Sentiment Summary</h4>
          <p className="text-sm text-gray-700">{analysis.aiInsights}</p>
        </div>
      </CardContent>
    </Card>
  );
}
