import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Target } from "lucide-react";
import type { TrendAnalysis } from "@shared/schema";

interface CompetitorAnalysisProps {
  analysis: TrendAnalysis;
}

export function CompetitorAnalysis({ analysis }: CompetitorAnalysisProps) {
  const { competitorAnalysis } = analysis;
  
  if (!competitorAnalysis) {
    return null;
  }

  const yourSentiment = analysis.positivePercentage;
  const compSentiment = competitorAnalysis.competitorSentiment;
  const sentimentAdvantage = yourSentiment - compSentiment;

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">⚔️ Competitor Analysis</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-sm sm:text-base">Main Competitor</p>
              <p className="text-xs sm:text-sm text-gray-600">{competitorAnalysis.mainCompetitor}</p>
            </div>
            <Users className="w-5 h-5 text-gray-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Your Sentiment</span>
                <Badge variant="default" className="text-xs">
                  {yourSentiment}%
                </Badge>
              </div>
              <Progress value={yourSentiment} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-600">Competitor Sentiment</span>
                <Badge variant="secondary" className="text-xs">
                  {compSentiment}%
                </Badge>
              </div>
              <Progress value={compSentiment} className="h-2" />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Mentions Comparison</p>
              <p className="font-medium text-sm sm:text-base">
                You: {analysis.totalMentions.toLocaleString()} vs {competitorAnalysis.competitorMentions.toLocaleString()}
              </p>
            </div>
            <TrendingUp className={`w-5 h-5 ${
              analysis.totalMentions > competitorAnalysis.competitorMentions 
                ? 'text-green-500' 
                : 'text-red-500'
            }`} />
          </div>

          <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-800 text-sm sm:text-base">Your Advantage</h4>
                <p className="text-xs sm:text-sm text-green-700 mt-1 leading-relaxed">
                  {competitorAnalysis.advantage}
                </p>
                {sentimentAdvantage > 0 && (
                  <p className="text-xs sm:text-sm text-green-700 mt-2">
                    💪 You have {sentimentAdvantage.toFixed(1)}% better sentiment!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}