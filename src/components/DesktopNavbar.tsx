import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Building2, Plus, User, Bell, Home } from "lucide-react";

const DesktopNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNotificationClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      window.location.href = "/notifications";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`hidden md:block bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Aadhar
              </h1>
              <p className="text-sm text-gray-600">
                Connecting Hearts, Changing Lives
              </p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center space-x-1"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/donate"
              className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center space-x-1"
            >
              <Heart className="h-5 w-5" />
              <span>Donate</span>
            </Link>
            <Link
              to="/add-need"
              className="text-gray-700 hover:text-indigo-600 transition-colors flex items-center space-x-1"
            >
              <Plus className="h-5 w-5" />
              <span>List Need</span>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="p-2" onClick={handleNotificationClick}>
              <Bell className="w-6 h-6" />
            </Button>
            <Link to="/profile" className="p-2 text-gray-700 hover:text-indigo-600">
              <User className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbar;
