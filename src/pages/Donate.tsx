import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Eye,
  MapPin,
  Filter,
  X,
  Users,
  Heart,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

function Donate() {
  try {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("urgency");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedUrgencies, setSelectedUrgencies] = useState<string[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const lastScrollY = useRef(0);

    console.log(currentPage);
    
    const needs = [
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
      {
        id: 4,
        name: "Medical Equipment for Hospital",
        location: "Bangalore, Karnataka",
        category: "Health & Medical",
        urgency: "High",
        description:
          "Urgent need for ventilators and medical supplies in rural hospital",
        contact: "+91 76543-21099",
        volunteers: 5,
        funded: 30,
      },
      {
        id: 5,
        name: "School Supplies Drive",
        location: "Chennai, Tamil Nadu",
        category: "Education",
        urgency: "Medium",
        description:
          "Books, notebooks, and stationery needed for 100+ underprivileged students",
        contact: "+91 65432-10987",
        volunteers: 15,
        funded: 55,
      },
      {
        id: 6,
        name: "Women Empowerment Workshop",
        location: "Pune, Maharashtra",
        category: "Women Empowerment",
        urgency: "Medium",
        description: "Skill development workshops for 50+ women in rural areas",
        contact: "+91 98765-43211",
        volunteers: 10,
        funded: 45,
      },
      {
        id: 7,
        name: "Clean Water Initiative",
        location: "Jaipur, Rajasthan",
        category: "Environment",
        urgency: "High",
        description:
          "Installing water purification systems in drought-affected villages",
        contact: "+91 87654-32110",
        volunteers: 18,
        funded: 70,
      },
      {
        id: 8,
        name: "Orphanage Rehabilitation",
        location: "Hyderabad, Telangana",
        category: "Child Welfare",
        urgency: "Critical",
        description:
          "Complete renovation and supplies for 80+ orphaned children",
        contact: "+91 76543-21097",
        volunteers: 22,
        funded: 85,
      },
      {
        id: 9,
        name: "Agricultural Tools Distribution",
        location: "Lucknow, Uttar Pradesh",
        category: "Rural Development",
        urgency: "Medium",
        description: "Modern farming equipment for 200+ small farmers",
        contact: "+91 65432-10988",
        volunteers: 14,
        funded: 60,
      },
      {
        id: 10,
        name: "Mental Health Support Program",
        location: "Kolkata, West Bengal",
        category: "Health & Medical",
        urgency: "High",
        description:
          "Counseling services and awareness campaigns for mental health",
        contact: "+91 54321-09876",
        volunteers: 9,
        funded: 35,
      },
      {
        id: 11,
        name: "Digital Literacy for Seniors",
        location: "Ahmedabad, Gujarat",
        category: "Senior Citizens",
        urgency: "Low",
        description: "Computer training classes for elderly citizens",
        contact: "+91 43210-98765",
        volunteers: 6,
        funded: 25,
      },
      {
        id: 12,
        name: "Sports Equipment for Schools",
        location: "Chandigarh, Punjab",
        category: "Education",
        urgency: "Medium",
        description:
          "Sports gear and playground equipment for underfunded schools",
        contact: "+91 32109-87654",
        volunteers: 11,
        funded: 50,
      },
    ];

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

    const categories = [...new Set(needs.map((need) => need.category))];
    const urgencies = [...new Set(needs.map((need) => need.urgency))];
    const locations = [...new Set(needs.map((need) => need.location))];

    const toggleCategory = (category: string) => {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    };

    const toggleUrgency = (urgency: string) => {
      setSelectedUrgencies((prev) =>
        prev.includes(urgency)
          ? prev.filter((u) => u !== urgency)
          : [...prev, urgency]
      );
    };

    const toggleLocation = (location: string) => {
      setSelectedLocations((prev) =>
        prev.includes(location)
          ? prev.filter((l) => l !== location)
          : [...prev, location]
      );
    };

    const clearFilters = () => {
      setSelectedCategories([]);
      setSelectedUrgencies([]);
      setSelectedLocations([]);
      setSearchTerm("");
      setCurrentPage(1);
    };

    const filteredAndSortedNeeds = useMemo(() => {
      let filtered = needs.filter((need) => {
        const matchesSearch =
          need.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          need.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          need.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(need.category);
        const matchesUrgency =
          selectedUrgencies.length === 0 ||
          selectedUrgencies.includes(need.urgency);
        const matchesLocation =
          selectedLocations.length === 0 ||
          selectedLocations.includes(need.location);

        return (
          matchesSearch && matchesCategory && matchesUrgency && matchesLocation
        );
      });

      filtered.sort((a, b) => {
        switch (sortOption) {
          case "urgency":
            const urgencyOrder = { Critical: 3, High: 2, Medium: 1, Low: 0 };
            return (
              urgencyOrder[b.urgency as keyof typeof urgencyOrder] -
              urgencyOrder[a.urgency as keyof typeof urgencyOrder]
            );
          case "category":
            return a.category.localeCompare(b.category);
          case "location":
            return a.location.localeCompare(b.location);
          default:
            return 0;
        }
      });

      return filtered;
    }, [
      searchTerm,
      sortOption,
      selectedCategories,
      selectedUrgencies,
      selectedLocations,
    ]);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current) {
          setIsHeaderVisible(false); // scrolling down, hide
        } else {
          setIsHeaderVisible(true); // scrolling up, show
        }
        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsLargeScreen(window.innerWidth > 800);
      };
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
      <div className="mb-10 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Filter Sheet - Must be rendered first to provide context */}
        <Sheet>
          {/* Filter Sheet Content */}
          <SheetContent
            side="top"
            className="h-auto max-h-[90vh] overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle>Search and Filter Options</SheetTitle>
              <SheetDescription>
                Find and sort donation needs that match your preferences.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Filter Summary */}
              {(selectedCategories.length +
                selectedUrgencies.length +
                selectedLocations.length >
                0 ||
                searchTerm) && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    Active Filters:{" "}
                    {selectedCategories.length +
                      selectedUrgencies.length +
                      selectedLocations.length +
                      (searchTerm ? 1 : 0)}
                  </p>
                </div>
              )}
              {/* Search */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search needs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              {/* Sort */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sort by
                </label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgency">Urgency</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Categories Filter */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Categories
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategories.includes(category)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleCategory(category)}
                      className={`text-xs transition-all duration-200 ${
                        selectedCategories.includes(category)
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Urgency Filter */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Urgency
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {urgencies.map((urgency) => (
                    <Button
                      key={urgency}
                      variant={
                        selectedUrgencies.includes(urgency)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleUrgency(urgency)}
                      className={`text-xs transition-all duration-200 ${
                        selectedUrgencies.includes(urgency)
                          ? `${getUrgencyColor(urgency)} hover:opacity-90`
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {urgency}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Location Filter */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {locations.map((location) => (
                    <Button
                      key={location}
                      variant={
                        selectedLocations.includes(location)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleLocation(location)}
                      className={`text-xs transition-all duration-200 ${
                        selectedLocations.includes(location)
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {location.split(",")[0]}
                    </Button>
                  ))}
                </div>
              </div>
              {/* Clear Filters */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          </SheetContent>

          {/* Sheet Triggers - Now properly nested within Sheet context */}
          {/* Header */}
          {!isLargeScreen && (
            <div
              className={`sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-md border-b border-indigo-100 p-4 transition-transform duration-300 ${
                isHeaderVisible ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                  <h1 className="flex-1 text-center text-2xl sm:text-3xl font-bold text-indigo-700">
                    Donate to a Need
                  </h1>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 fixed top-4 right-4 z-50 bg-white shadow-lg rounded-full p-3 hover:bg-indigo-50 transition-colors"
                    >
                      <Filter className="w-6 h-6 text-indigo-700" />
                      {!isLargeScreen && "Search & Filter"}
                    </Button>
                  </SheetTrigger>
                </div>
              </div>
            </div>
          )}

          {/* Filter Button for Large Screen */}
          {isLargeScreen && (
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center h-[70px] w-[70px] gap-2 fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-full p-3 hover:bg-indigo-50 transition-colors"
              >
                <Filter className="w-10 h-10 text-indigo-700" />
              </Button>
            </SheetTrigger>
          )}
        </Sheet>

        {/* Needs List */}
        <div className="p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedNeeds.map((need) => (
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

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Funding Progress
                        </span>
                        <span className="text-sm text-gray-600">
                          {need.funded}%
                        </span>
                      </div>
                      <Progress value={need.funded} className="h-2" />
                    </div>

                    {/* Volunteers Count */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {need.volunteers} volunteers
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Heart className="w-4 h-4 mr-1" />
                        {need.funded}% funded
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Donate
                      </Button>
                    </div>

                    {/* Quick Donate Options */}
                    <div className="mt-3 flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 py-1 h-6"
                      >
                        ₹500
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 py-1 h-6"
                      >
                        ₹1000
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 py-1 h-6"
                      >
                        ₹2000
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 py-1 h-6"
                      >
                        Other
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedNeeds.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No needs found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in Donate component:", error);
    return <div>Error loading donation page. Please refresh the page.</div>;
  }
}

export default Donate;
