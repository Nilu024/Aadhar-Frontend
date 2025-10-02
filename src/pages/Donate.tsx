import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DonateSidebar from "@/components/DonateSidebar";
import { Eye, MapPin, Filter, X, Users, Heart, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import axios from "axios";

function Donate() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("urgency");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedUrgencies, setSelectedUrgencies] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Remove starting filter: clear all filters on initial load
  useEffect(() => {
    setSelectedCategories([]);
    setSelectedUrgencies([]);
    setSelectedLocations([]);
    setSearchTerm('');
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [needs, setNeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/needs`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setNeeds(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setNeeds([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching needs:', error);
        setNeeds([]);
        setLoading(false);
      });
  }, []);

  const categories = [...new Set(needs.map((need) => need.category))];
  const urgencies = [...new Set(needs.map((need) => need.urgency))];
  const locations = [...new Set(needs.map((need) => need.location))];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleUrgency = (urgency: string) => {
    setSelectedUrgencies((prev) =>
      prev.includes(urgency) ? prev.filter((u) => u !== urgency) : [...prev, urgency]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedUrgencies([]);
    setSelectedLocations([]);
    setSearchTerm("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedUrgencies.length +
    selectedLocations.length +
    (searchTerm ? 1 : 0);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredAndSortedNeeds = useMemo(() => {
    let filtered = needs;

    // Apply filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((need: any) => selectedCategories.includes(need.category));
    }
    if (selectedUrgencies.length > 0) {
      filtered = filtered.filter((need: any) => selectedUrgencies.includes(need.urgency));
    }
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((need: any) => selectedLocations.includes(need.location));
    }
    if (debouncedSearchTerm) {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (need: any) =>
          need.title.toLowerCase().includes(lowerSearch) ||
          need.description.toLowerCase().includes(lowerSearch)
      );
    }

    filtered.sort((a: any, b: any) => {
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
  }, [needs, sortOption, selectedCategories, selectedUrgencies, selectedLocations, debouncedSearchTerm]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-600 hover:bg-red-700";
      case "High":
        return "bg-orange-600 hover:bg-orange-700";
      case "Medium":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "Low":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Sidebar */}
      <DonateSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOption={sortOption}
        setSortOption={setSortOption}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedUrgencies={selectedUrgencies}
        toggleUrgency={toggleUrgency}
        selectedLocations={selectedLocations}
        toggleLocation={toggleLocation}
        clearFilters={clearFilters}
        categories={categories}
        urgencies={urgencies}
        locations={locations}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={sidebarCollapsed}
        onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-indigo-600">{activeFiltersCount}</Badge>
                  )}
                </Button>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600">
                  Donate to a Need
                </h1>
              </div>
              <div className="text-sm text-gray-600 hidden sm:block">
                {filteredAndSortedNeeds.length} {filteredAndSortedNeeds.length === 1 ? 'need' : 'needs'}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Results Count (Mobile) */}
            <div className="mb-4 text-sm text-gray-600 sm:hidden">
              Showing {filteredAndSortedNeeds.length} {filteredAndSortedNeeds.length === 1 ? 'need' : 'needs'}
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="py-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading donation needs...</p>
              </div>
            ) : filteredAndSortedNeeds.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredAndSortedNeeds.map((need) => (
                  <Card
                    key={need._id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <Badge className={`${getUrgencyColor(need.urgency)} text-white`}>
                          {need.urgency}
                        </Badge>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                          {need.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight">
                        {need.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{need.location}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {need.description}
                      </p>

                      {/* Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2 text-sm">
                          <span className="font-medium text-gray-700">Funding</span>
                          <span className="text-gray-600">0%</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{need.volunteersAssigned} volunteers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>0% funded</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                          onClick={() => navigate(`/need/${need._id}`)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                          <Heart className="w-4 h-4 mr-1" />
                          Donate
                        </Button>
                      </div>

                      {/* Quick Donate */}
                      <div className="flex gap-1">
                        {["₹500", "₹1000", "₹2000", "Other"].map((amount) => (
                          <Button
                            key={amount}
                            variant="ghost"
                            size="sm"
                            className="flex-1 text-xs h-7 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            {amount}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-12 text-center">
                <Search className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No donation needs found
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Try adjusting your filters or search terms to discover more opportunities to make a difference.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
