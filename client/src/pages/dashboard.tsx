import { useState } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { SearchForm } from "@/components/search-form";
import { MetricsCards } from "@/components/metrics-cards";
import { TrendChart } from "@/components/trend-chart";
import { SentimentDisplay } from "@/components/sentiment-display";
import { RegionalMap } from "@/components/regional-map";
import { KeywordsDisplay } from "@/components/keywords-display";
import { AIInsights } from "@/components/ai-insights";
import { ViralPrediction } from "@/components/viral-prediction";
import { CompetitorAnalysis } from "@/components/competitor-analysis";
import { ContentGenerator } from "@/components/content-generator";
import { NaijaSentiment } from "@/components/naija-sentiment";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { TrendAnalysis } from "@shared/schema";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lastAnalyzedQuery, setLastAnalyzedQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: analysis, isLoading } = useQuery<TrendAnalysis>({
    queryKey: ["/api/analysis", lastAnalyzedQuery],
    enabled: !!lastAnalyzedQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLastAnalyzedQuery(query);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="p-3 sm:p-4 md:p-6">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            
            {isLoading ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 sm:p-6">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-16 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                  {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 sm:p-6">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-64 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : analysis ? (
              <>
                <MetricsCards analysis={analysis} />
                
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <TrendChart data={analysis.trendData} />
                  <SentimentDisplay analysis={analysis} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="xl:col-span-2">
                    <RegionalMap regionalData={analysis.regionalData} />
                  </div>
                  <KeywordsDisplay keywords={analysis.keywords} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <ViralPrediction analysis={analysis} />
                  <CompetitorAnalysis analysis={analysis} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <ContentGenerator analysis={analysis} />
                  <NaijaSentiment analysis={analysis} />
                </div>

                <AIInsights analysis={analysis} />
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center px-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Start Your Market Analysis
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Enter a product, service, or topic above to get AI-powered insights
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
