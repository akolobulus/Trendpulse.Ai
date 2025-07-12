import { ChartLine, Search, Heart, Map, Hash, FileText, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartLine },
  { name: "About Developer", href: "/about", icon: User },
  { name: "Trend Search", href: "#", icon: Search },
  { name: "Sentiment Analysis", href: "#", icon: Heart },
  { name: "Regional Insights", href: "#", icon: Map },
  { name: "Keywords", href: "#", icon: Hash },
  { name: "Reports", href: "#", icon: FileText },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  
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
            {navigation.map((item) => {
              const isCurrent = location === item.href;
              const isClickable = item.href !== "#";
              
              if (isClickable) {
                return (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                        isCurrent
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
                        isCurrent && "font-semibold"
                      )}>
                        {item.name}
                      </span>
                    </a>
                  </Link>
                );
              }
              
              return (
                <div
                  key={item.name}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 cursor-not-allowed"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
