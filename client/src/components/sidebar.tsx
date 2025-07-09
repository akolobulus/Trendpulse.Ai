import { ChartLine, Search, Heart, Map, Hash, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "#", icon: ChartLine, current: true },
  { name: "Trend Search", href: "#", icon: Search, current: false },
  { name: "Sentiment Analysis", href: "#", icon: Heart, current: false },
  { name: "Regional Insights", href: "#", icon: Map, current: false },
  { name: "Keywords", href: "#", icon: Hash, current: false },
  { name: "Reports", href: "#", icon: FileText, current: false },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen sticky top-16">
      <nav className="p-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                item.current
                  ? "text-primary bg-secondary"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className={cn("font-medium", item.current && "font-semibold")}>
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
