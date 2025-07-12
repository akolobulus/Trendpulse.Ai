import { Bell, User, ChartLine, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [location] = useLocation();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChartLine className="text-white w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                TrendPulse.AI
              </h1>
            </Link>
            <div className="hidden lg:block text-sm text-gray-500">
              Market Intelligence Dashboard
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex items-center space-x-2">
              <Link href="/">
                <Button 
                  variant={location === "/" ? "default" : "ghost"}
                  size="sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant={location === "/about" ? "default" : "ghost"}
                  size="sm"
                >
                  About
                </Button>
              </Link>
            </nav>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="text-white w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
