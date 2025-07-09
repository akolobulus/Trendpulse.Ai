import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface KeywordsDisplayProps {
  keywords: string[];
}

export function KeywordsDisplay({ keywords }: KeywordsDisplayProps) {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Top Keywords & Hashtags</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 sm:space-y-3">
          {keywords.map((keyword, index) => (
            <div key={keyword} className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-700 truncate mr-2">{keyword}</span>
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs flex-shrink-0">
                {Math.floor(Math.random() * 2000) + 500}
              </Badge>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-3 sm:mt-4 text-primary hover:bg-secondary text-sm">
          View All Keywords
        </Button>
      </CardContent>
    </Card>
  );
}
