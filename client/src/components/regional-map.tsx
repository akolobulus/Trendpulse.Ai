import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface RegionalMapProps {
  regionalData: { region: string; percentage: number }[];
}

export function RegionalMap({ regionalData }: RegionalMapProps) {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Regional Mentions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 sm:h-80 flex flex-col items-center justify-center bg-gray-50 rounded-lg p-4">
          <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" />
          <p className="text-gray-500 mb-4 sm:mb-6 text-center text-sm sm:text-base">
            Interactive map showing regional distribution
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm w-full max-w-md">
            {regionalData.map((region) => (
              <div key={region.region} className="flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg">
                <span className="text-gray-700 text-xs sm:text-sm truncate">{region.region}:</span>
                <span className="font-medium text-gray-900 text-xs sm:text-sm ml-2">
                  {region.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
