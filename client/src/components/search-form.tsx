import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const categories = [
  { name: "Technology", active: true },
  { name: "Fashion", active: false },
  { name: "Food & Beverage", active: false },
  { name: "Health", active: false },
];

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const response = await apiRequest("POST", "/api/analyze", { query: searchQuery });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/analysis", query], data);
      onSearch(query);
      toast({
        title: "Analysis Complete",
        description: `Generated insights for "${query}"`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const response = await apiRequest("POST", "/api/generate-report", { query: searchQuery });
      return response.json();
    },
    onSuccess: (data) => {
      // Create and download PDF-like content
      const blob = new Blob([data.content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${query}-market-report.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Report Generated",
        description: "Your market report has been downloaded",
      });
    },
    onError: (error) => {
      toast({
        title: "Report Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      analyzeMutation.mutate(query.trim());
    }
  };

  const handleExportReport = () => {
    if (query.trim()) {
      reportMutation.mutate(query.trim());
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trend Analysis</CardTitle>
          <Button onClick={handleExportReport} disabled={!query.trim() || reportMutation.isPending}>
            {reportMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter product, service, or topic..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-6" disabled={isLoading || analyzeMutation.isPending}>
              {isLoading || analyzeMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Analyze
            </Button>
          </div>
          
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className="cursor-pointer hover:bg-secondary"
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
