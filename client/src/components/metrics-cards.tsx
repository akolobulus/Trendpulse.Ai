import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Heart, MapPin, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendAnalysis } from "@shared/schema";

interface MetricsCardsProps {
  analysis: TrendAnalysis;
}

export function MetricsCards({ analysis }: MetricsCardsProps) {
  const metrics = [
    {
      title: "Total Mentions",
      value: analysis.totalMentions.toLocaleString(),
      icon: MessageSquare,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      trend: analysis.growthPercentage > 0 ? "up" : "down",
      trendValue: `${Math.abs(analysis.growthPercentage)}%`,
      trendLabel: "vs last week"
    },
    {
      title: "Sentiment Score",
      value: `${analysis.sentimentScore}%`,
      icon: Heart,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      trend: analysis.sentimentScore > 70 ? "up" : "down",
      trendValue: "Positive",
      trendLabel: "trending"
    },
    {
      title: "Top Region",
      value: analysis.topRegion,
      icon: MapPin,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      trend: null,
      trendValue: `${analysis.regionalData[0]?.percentage || 0}%`,
      trendLabel: "of mentions"
    },
    {
      title: "Trend Direction",
      value: analysis.trendDirection,
      icon: TrendingUp,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      trend: analysis.trendDirection === "Rising" ? "up" : "down",
      trendValue: `${analysis.growthPercentage}%`,
      trendLabel: "growth"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", metric.iconBg)}>
                <metric.icon className={cn("w-6 h-6", metric.iconColor)} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              {metric.trend && (
                <>
                  <TrendingUp className={cn("w-4 h-4 mr-1", 
                    metric.trend === "up" ? "text-green-500" : "text-red-500 rotate-180"
                  )} />
                  <span className={cn("text-sm", 
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  )}>
                    {metric.trendValue}
                  </span>
                </>
              )}
              {!metric.trend && <span className="text-sm text-gray-500">{metric.trendValue}</span>}
              <span className="text-sm text-gray-500 ml-2">{metric.trendLabel}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
