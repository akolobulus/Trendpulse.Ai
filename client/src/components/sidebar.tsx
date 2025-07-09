import { ChartLine, Search, Heart, Map, Hash, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "#", icon: ChartLine, current: true },
  { name: "Trend Search", href: "#", icon: Search, current: false },
  { name: "Sentiment Analysis", href: "#", icon: Heart, current: false },
  { name: "Regional Insights", href: "#", icon: Map, current: false },
  { name: "Keywords", href: "#", icon: Hash, current: false },
  { name: "Reports", href: "#", icon: FileText, current: false },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm transform transition-transform duration-300 ease-in-out",
        "lg:transform-none lg:transition-none lg:h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
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
                onClick={() => {
                  // Close mobile menu when item is clicked
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={cn(
                  "font-medium truncate", 
                  item.current && "font-semibold"
                )}>
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
