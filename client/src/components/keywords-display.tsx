import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface KeywordsDisplayProps {
  keywords: string[];
}

export function KeywordsDisplay({ keywords }: KeywordsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Keywords & Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {keywords.map((keyword, index) => (
            <div key={keyword} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{keyword}</span>
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {Math.floor(Math.random() * 2000) + 500}
              </Badge>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-4 text-primary hover:bg-secondary">
          View All Keywords
        </Button>
      </CardContent>
    </Card>
  );
}
