import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search, AlertTriangle, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface DonateSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  selectedUrgencies: string[];
  toggleUrgency: (urgency: string) => void;
  selectedLocations: string[];
  toggleLocation: (location: string) => void;
  clearFilters: () => void;
  categories: string[];
  urgencies: string[];
  locations: string[];
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapseToggle: () => void;
}

function DonateSidebar({
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  selectedCategories,
  toggleCategory,
  selectedUrgencies,
  toggleUrgency,
  selectedLocations,
  toggleLocation,
  clearFilters,
  categories,
  urgencies,
  locations,
  isOpen,
  onToggle,
  isCollapsed,
  onCollapseToggle,
}: DonateSidebarProps) {
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedUrgencies.length > 0 ||
    selectedLocations.length > 0 ||
    searchTerm;

  const removeFilter = (type: string, value: string) => {
    if (type === "category") toggleCategory(value);
    if (type === "urgency") toggleUrgency(value);
    if (type === "location") toggleLocation(value);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-16" : "w-full max-w-sm"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b lg:p-6">
          <h2 className={`text-lg font-semibold ${isCollapsed ? "hidden" : ""}`}>Filters & Search</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCollapseToggle}
              aria-label={isCollapsed ? "Expand filters" : "Collapse filters"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {!isCollapsed && (
          <div className="overflow-y-auto h-[calc(100%-4rem)] p-4 space-y-4 lg:p-6 lg:space-y-6">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="bg-indigo-50 p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-900">Active Filters</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-1 text-xs text-indigo-600 hover:text-indigo-700"
                  >
                    Clear all
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-indigo-200"
                      onClick={() => setSearchTerm("")}
                    >
                      {searchTerm} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      className="cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => removeFilter("category", cat)}
                    >
                      {cat} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedUrgencies.map((urg) => (
                    <Badge
                      key={urg}
                      className="cursor-pointer bg-orange-600 hover:bg-orange-700"
                      onClick={() => removeFilter("urgency", urg)}
                    >
                      {urg} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {selectedLocations.map((loc) => (
                    <Badge
                      key={loc}
                      className="cursor-pointer bg-green-600 hover:bg-green-700"
                      onClick={() => removeFilter("location", loc)}
                    >
                      {loc.split(",")[0]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="search-input">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="search-input"
                  type="search"
                  placeholder="Search needs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-9"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort by</label>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgency">Urgency (High to Low)</SelectItem>
                  <SelectItem value="category">Category (A-Z)</SelectItem>
                  <SelectItem value="location">Location (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className={`text-xs ${
                      selectedCategories.includes(category)
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : ""
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                Urgency
              </h3>
              <div className="flex flex-wrap gap-2">
                {urgencies.map((urgency) => (
                  <Button
                    key={urgency}
                    variant={selectedUrgencies.includes(urgency) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleUrgency(urgency)}
                    className={`text-xs ${
                      selectedUrgencies.includes(urgency)
                        ? "bg-orange-600 hover:bg-orange-700"
                        : ""
                    }`}
                  >
                    {urgency}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                Location
              </h3>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocations.includes(location) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleLocation(location)}
                    className={`text-xs ${
                      selectedLocations.includes(location)
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }`}
                  >
                    {location.split(",")[0]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

export default DonateSidebar;