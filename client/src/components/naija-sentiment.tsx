import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Volume2, Smile } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TrendAnalysis } from "@shared/schema";

interface NaijaSentimentProps {
  analysis: TrendAnalysis;
}

export function NaijaSentiment({ analysis }: NaijaSentimentProps) {
  const [inputText, setInputText] = useState("");
  const { toast } = useToast();
  
  const { naijaSentiment } = analysis;

  const analyzePidgin = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest<{ 
        sentiment: string; 
        confidence: number; 
        translation: string 
      }>("/api/analyze-pidgin", {
        method: "POST",
        body: { text }
      });
      return response;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to analyze pidgin text. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    analyzePidgin.mutate(inputText);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-500';
      case 'negative': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!naijaSentiment) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">🇳🇬 Naija Sentiment Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Common Pidgin Phrases */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-3 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Popular Pidgin Phrases
            </h4>
            <div className="flex flex-wrap gap-2">
              {naijaSentiment.pidginPhrases.map((phrase, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-secondary"
                  onClick={() => setInputText(phrase)}
                >
                  {phrase}
                </Badge>
              ))}
            </div>
          </div>

          {/* Street Slang Analysis */}
          <div className="p-3 sm:p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Volume2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 text-sm sm:text-base">Street Slang Analysis</h4>
                <p className="text-xs sm:text-sm text-yellow-700 mt-1 leading-relaxed">
                  {naijaSentiment.streetSlangAnalysis}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Analyzer */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-3 flex items-center">
              <Smile className="w-4 h-4 mr-2" />
              Analyze Your Text
            </h4>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter Nigerian pidgin or slang text..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || analyzePidgin.isPending}
                  size="sm"
                >
                  {analyzePidgin.isPending ? "Analyzing..." : "Analyze"}
                </Button>
              </div>

              {analyzePidgin.data && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sentiment Analysis</span>
                    <Badge className={`${getSentimentColor(analyzePidgin.data.sentiment)} text-white text-xs`}>
                      {analyzePidgin.data.sentiment} ({analyzePidgin.data.confidence}%)
                    </Badge>
                  </div>
                  {analyzePidgin.data.translation && (
                    <p className="text-xs sm:text-sm text-gray-600 italic">
                      Translation: "{analyzePidgin.data.translation}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Examples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              className="p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100"
              onClick={() => setInputText("This phone na correct! E dey work well well")}
            >
              <p className="text-xs sm:text-sm text-green-700 font-medium">Positive Example</p>
              <p className="text-xs text-green-600">"This phone na correct! E dey work well well"</p>
            </div>
            <div 
              className="p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100"
              onClick={() => setInputText("Waste money I swear, this thing no good")}
            >
              <p className="text-xs sm:text-sm text-red-700 font-medium">Negative Example</p>
              <p className="text-xs text-red-600">"Waste money I swear, this thing no good"</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}