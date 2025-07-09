import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TrendAnalysis } from "@shared/schema";

interface ContentGeneratorProps {
  analysis: TrendAnalysis;
}

export function ContentGenerator({ analysis }: ContentGeneratorProps) {
  const [selectedContent, setSelectedContent] = useState<string>("");
  const { toast } = useToast();
  
  const { contentSuggestions = [], campaignTitles = [] } = analysis;

  const generateMoreContent = useMutation({
    mutationFn: async (topic: string) => {
      const response = await apiRequest<{ ideas: string[] }>("/api/generate-content", {
        method: "POST",
        body: { topic }
      });
      return response.ideas;
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate content ideas. Please try again.",
        variant: "destructive"
      });
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleGenerateMore = () => {
    generateMoreContent.mutate(analysis.query || "trending topic");
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">💡 AI Content Generator</CardTitle>
          <Button
            onClick={handleGenerateMore}
            disabled={generateMoreContent.isPending}
            variant="outline"
            size="sm"
          >
            {generateMoreContent.isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Content Suggestions */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-3">🔥 Viral Social Media Captions</h4>
            <div className="space-y-2">
              {contentSuggestions.map((content, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed flex-1">
                      {content}
                    </p>
                    <Button
                      onClick={() => copyToClipboard(content)}
                      variant="ghost"
                      size="sm"
                      className="ml-2 flex-shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campaign Titles */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-3">🎯 Campaign Titles</h4>
            <div className="flex flex-wrap gap-2">
              {campaignTitles.map((title, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                  onClick={() => copyToClipboard(title)}
                >
                  {title}
                </Badge>
              ))}
            </div>
          </div>

          {/* Custom Content Area */}
          <div>
            <h4 className="font-medium text-sm sm:text-base mb-3">✏️ Custom Content</h4>
            <Textarea
              placeholder="Edit or create your own content here..."
              value={selectedContent}
              onChange={(e) => setSelectedContent(e.target.value)}
              className="min-h-[100px] text-sm"
            />
            <div className="flex justify-end mt-2">
              <Button
                onClick={() => copyToClipboard(selectedContent)}
                disabled={!selectedContent.trim()}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {/* Additional Content from API */}
          {generateMoreContent.data && (
            <div>
              <h4 className="font-medium text-sm sm:text-base mb-3">🆕 Fresh Ideas</h4>
              <div className="space-y-2">
                {generateMoreContent.data.map((content, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <p className="text-xs sm:text-sm text-blue-700 leading-relaxed flex-1">
                        {content}
                      </p>
                      <Button
                        onClick={() => copyToClipboard(content)}
                        variant="ghost"
                        size="sm"
                        className="ml-2 flex-shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}