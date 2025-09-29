import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin } from "lucide-react";

interface SportFilterProps {
  selectedSports: string[];
  onSportChange: (sports: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  priceRange: string;
  onPriceRangeChange: (range: string) => void;
}

const SPORTS = [
  'Cricket', 'Football', 'Tennis', 'Futsal', 'Basketball', 'Volleyball', 
  'Badminton', 'Table Tennis', 'Swimming', 'Gym'
];

const PRICE_RANGES = [
  { value: 'any', label: 'Any Price' },
  { value: '0-25', label: '$0 - $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100+', label: '$100+' }
];

export const SportFilter = ({
  selectedSports,
  onSportChange,
  searchQuery,
  onSearchChange,
  location,
  onLocationChange,
  priceRange,
  onPriceRangeChange
}: SportFilterProps) => {
  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      onSportChange(selectedSports.filter(s => s !== sport));
    } else {
      onSportChange([...selectedSports, sport]);
    }
  };

  const clearAllFilters = () => {
    onSportChange([]);
    onSearchChange('');
    onLocationChange('');
    onPriceRangeChange('any');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search Venues</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by venue name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Enter city or area..."
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sports */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Sports</label>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((sport) => (
              <Badge
                key={sport}
                variant={selectedSports.includes(sport) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => toggleSport(sport)}
              >
                {sport}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};