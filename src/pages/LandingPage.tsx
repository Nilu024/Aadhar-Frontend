import { useState, useEffect, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import IndividualSocialWorkerForm from "./individual_form";
import NGOform from "./NGOform";
import GetStartedPage from "./GetStarted";
import VolunteerRegistrationForm from "./VolunteerForm";
import Login from "./Login";
import Popup from "@/components/Popup";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Building2,
  ArrowRight,
  MapPin,
  Phone,
  Sparkles,
  HandHeart,
  Star,
  Home,
  Plus,
  User,
  Menu,
  Bell,
} from "lucide-react";

export default function NGOLandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentView, setCurrentView] = useState("home");
  const [isShortHeight, setIsShortHeight] = useState(false);
  const sheetRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Volunteer",
      text: "This platform helped me find meaningful ways to contribute to my community.",
      rating: 5,
    },
    {
      name: "Rajesh Patel",
      role: "NGO Director",
      text: "We've connected with so many passionate individuals through this platform.",
      rating: 5,
    },
    {
      name: "Anita Singh",
      role: "Social Worker",
      text: "Amazing platform to showcase our work and reach people who need help.",
      rating: 5,
    },
  ];

  const needyPeople = [
    {
      id: 1,
      name: "Elderly Care Center",
      location: "Mumbai, Maharashtra",
      category: "Senior Citizens",
      urgency: "High",
      description:
        "30+ elderly people need daily care, food, and medical assistance",
      contact: "+91 98765-43210",
      volunteers: 12,
      funded: 65,
    },
    {
      id: 2,
      name: "Street Children Education",
      location: "Delhi, NCR",
      category: "Child Welfare",
      urgency: "Medium",
      description:
        "50+ street children need education materials and daily meals",
      contact: "+91 87654-32109",
      volunteers: 8,
      funded: 40,
    },
    {
      id: 3,
      name: "Disaster Relief - Floods",
      location: "Kerala, India",
      category: "Emergency Relief",
      urgency: "Critical",
      description:
        "200+ families affected by floods need immediate shelter and supplies",
      contact: "+91 76543-21098",
      volunteers: 25,
      funded: 80,
    },
  ];

  useEffect(() => {
    // On refresh, restore the last view from localStorage
    if (typeof window !== "undefined") {
      const savedView = localStorage.getItem("currentView");
      if (savedView && window.performance) {
        // Check if page is loaded via reload or direct navigation
        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (navigationEntry && navigationEntry.type === "reload") {
          setCurrentView(savedView);
        } else {
          // For direct navigation or link open, reset to home
          setCurrentView("home");
          localStorage.removeItem("currentView");
        }
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkHeight = () => {
      setIsShortHeight(window.innerHeight < 600);
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    if (typeof window !== "undefined") {
      if (view === "home") {
        localStorage.removeItem("currentView");
      } else {
        localStorage.setItem("currentView", view);
      }
    }
  };

  const handleNotificationClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/notifications");
    } else {
      navigate("/login");
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-orange-500";
      case "Medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  if (currentView === "ngo-form") {
    return <NGOform onBack={() => handleNavigation("home")} />;
  }

  if (currentView === "volunteer-form") {
    return <VolunteerRegistrationForm onBack={() => handleNavigation("home")} />;
  }

  if (currentView === "individual-form") {
    return <IndividualSocialWorkerForm onBack={() => handleNavigation("home")} />;
  }

  if (currentView === "GetStartedPage") {
    return <GetStartedPage onNavigate={(view) => setCurrentView(view)} onBack={() => handleNavigation("home")} />;
  }

  if (currentView === "login") {
    return <Login onBack={() => handleNavigation("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Mobile Navbar for screens less than 800px */}
      <header className="md:hidden bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100">
        <div className="container mx-auto px-0 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              aria-label="Open menu"
              className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
              onClick={() => {
                if (sheetRef.current) {
                  sheetRef.current.click();
                }
              }}
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Aadhar
              </h1>
            </div>
          </div>
          <div className="flex space-x-4">
              <Button variant="ghost" className="p-2" onClick={handleNotificationClick}>
                <Bell className="w-6 h-6" />
              </Button>
          </div>
        </div>
      </header>

      {/* Hamburger for short height on desktop */}
      {isShortHeight && (
        <header className="hidden md:block bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="container mx-auto px-0 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                aria-label="Open menu"
                className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
                onClick={() => {
                  if (sheetRef.current) {
                    sheetRef.current.click();
                  }
                }}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Aadhar
                </h1>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" className="p-2" onClick={handleNotificationClick}>
                <Bell className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Navigation Sheet - Must be rendered first to provide context */}
      <Sheet>
        <SheetTrigger asChild>
          <button ref={sheetRef} className="sr-only" aria-label="Open navigation menu">
            Open Menu
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetDescription className="sr-only">Navigate through the application</SheetDescription>
          <nav className="flex flex-col p-6 space-y-4">
            <Button variant="ghost" onClick={() => handleNavigation("home")}>
              <Home className="w-5 h-5 mr-2" /> Home
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("GetStartedPage")}>
              <Plus className="w-5 h-5 mr-2" /> Get Started
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("individual-form")}>
              <User className="w-5 h-5 mr-2" /> Individual
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("ngo-form")}>
              <Building2 className="w-5 h-5 mr-2" /> NGO
            </Button>
            <Button variant="ghost" onClick={() => handleNavigation("volunteer-form")}>
              <Users className="w-5 h-5 mr-2" /> Volunteer
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="container mx-auto px-0 relative">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1 text-sm">
                Making a Difference Together
              </Badge>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
            </div>

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
        Unite for a
        <br />
        <span className="text-3xl sm:text-4xl md:text-6xl">Better Tomorrow</span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
        Connect with NGOs, individual social workers, and volunteers to
        create meaningful impact in communities across India
      </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => handleNavigation("GetStartedPage")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Helping Today
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 bg-white/50">
        <div className="container mx-auto px-0">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Three Ways to Make Impact
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Choose your path to creating positive change in society. Every
              contribution matters, every effort counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Users,
                title: "Individual Social Worker",
                description:
                  "Join as an independent social worker and showcase your expertise in community development, counseling, and social welfare.",
                features: [
                  "Personal Profile",
                  "Skill Showcase",
                  "Direct Contact",
                  "Impact Tracking",
                ],
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50",
              },
              {
                icon: Building2,
                title: "Registered NGO",
                description:
                  "List your NGO to reach a wider audience, showcase your projects, and connect with volunteers and donors.",
                features: [
                  "Organization Profile",
                  "Project Listings",
                  "Volunteer Management",
                  "Donation Tracking",
                ],
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-50",
              },
              {
                icon: HandHeart,
                title: "Volunteer & Helper",
                description:
                  "Find meaningful volunteer opportunities and connect directly with NGOs and social workers who need your help.",
                features: [
                  "Browse Opportunities",
                  "Skill Matching",
                  "Impact Dashboard",
                  "Community Network",
                ],
                color: "from-purple-500 to-pink-500",
                bgColor: "bg-purple-50",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg ${category.bgColor} overflow-hidden relative`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <CardHeader className="relative z-10 p-4 sm:p-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-gray-900">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 p-4 sm:p-6">
                  <ul className="space-y-1 sm:space-y-2 mb-6">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700 text-sm sm:text-base">
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => {
                      if (category.title === "Registered NGO") {
                        handleNavigation("ngo-form");
                      } else if (category.title === "Volunteer & Helper") {
                        handleNavigation("volunteer-form");
                      } else {
                        handleNavigation("individual-form");
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4`}
                  >
                    Register Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Needy People Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-0">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              People Who Need Your Help
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              These are real people and communities waiting for your support.
              Your contribution can change lives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {needyPeople.map((need) => (
              <Card
                key={need.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      className={`${getUrgencyColor(
                        need.urgency
                      )} text-white px-3 py-1 text-sm font-semibold`}
                    >
                      {need.urgency} Priority
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-indigo-600 border-indigo-200"
                    >
                      {need.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {need.name}
                  </CardTitle>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {need.location}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {need.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Volunteers Active</span>
                      <span className="font-semibold text-green-600">
                        {need.volunteers} helping
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Funding Progress</span>
                      <span className="font-semibold text-blue-600">
                        {need.funded}% funded
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${need.funded}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => handleNavigation("login")} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                      <Heart className="w-4 h-4 mr-2" />
                      Help Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => handleNavigation("login")}
              size="lg"
              variant="outline"
              className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg rounded-full"
            >
              View All Cases
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Stories of Impact
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community members
            </p>
          </div>

          <div>
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-500 fill-current"
                      />
                    )
                  )}
                </div>
                <p className="text-2xl text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-indigo-600">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-0 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of changemakers who are creating positive impact in
            communities across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full"
              onClick={() => handleNavigation("GetStartedPage")}
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-indigo-600 hover:bg-white/10 text-lg px-8 py-4 rounded-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Aadhar</h3>
              </div>
              <p className="text-gray-400 text-center md:text-left">
                Connecting hearts, changing lives, one community at a time.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4 text-center md:text-left">
                Stay updated with our latest initiatives
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 md:pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Aadhar. All rights reserved. Made with ❤️ for a
              better world.
            </p>
          </div>
        </div>
      </footer>

      <Popup
        message="Welcome to Aadhar! Start your journey to make a difference."
        onClose={() => {}}
        onLogin={() => handleNavigation("login")}
        onRegister={() => handleNavigation("GetStartedPage")}
      />
    </div>
  );
}
