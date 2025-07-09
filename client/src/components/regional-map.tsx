import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface RegionalMapProps {
  regionalData: { region: string; percentage: number }[];
}

export function RegionalMap({ regionalData }: RegionalMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Mentions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <MapPin className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-6">Interactive map showing regional distribution</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm w-full max-w-md">
            {regionalData.map((region) => (
              <div key={region.region} className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="text-gray-700">{region.region}:</span>
                <span className="font-medium text-gray-900">{region.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
