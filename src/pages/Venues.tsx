import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VenueCard } from "@/components/common/VenueCard";
import { SportFilter } from "@/components/common/SportFilter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, SlidersHorizontal } from "lucide-react";

export const Venues = () => {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('any');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock venues data
  const venues = [
    {
      id: "1",
      name: "Elite Sports Complex",
      location: "Downtown City, Metro Area",
      sports: ["Cricket", "Football", "Tennis", "Basketball"],
      rating: 4.8,
      reviewCount: 127,
      priceRange: "$25-45",
      image: "/placeholder.svg",
      availability: "Available",
      capacity: 22
    },
    {
      id: "2",
      name: "Champions Arena",
      location: "North District, Suburbs",
      sports: ["Futsal", "Basketball", "Volleyball", "Badminton"],
      rating: 4.6,
      reviewCount: 89,
      priceRange: "$30-60",
      image: "/placeholder.svg",
      availability: "Available",
      capacity: 16
    },
    {
      id: "3",
      name: "Ace Tennis Club",
      location: "East Side, Tennis District",
      sports: ["Tennis", "Badminton", "Table Tennis"],
      rating: 4.9,
      reviewCount: 203,
      priceRange: "$20-35",
      image: "/placeholder.svg",
      availability: "Available",
      capacity: 4
    },
    {
      id: "4",
      name: "Riverside Sports Park",
      location: "Riverside, Park Area",
      sports: ["Cricket", "Football", "Rugby", "Athletics"],
      rating: 4.7,
      reviewCount: 156,
      priceRange: "$35-55",
      image: "/placeholder.svg",
      availability: "Busy",
      capacity: 30
    },
    {
      id: "5",
      name: "Urban Fitness Hub",
      location: "City Center, Business District",
      sports: ["Gym", "Basketball", "Volleyball", "Fitness Classes"],
      rating: 4.5,
      reviewCount: 78,
      priceRange: "$40-70",
      image: "/placeholder.svg",
      availability: "Available",
      capacity: 50
    },
    {
      id: "6",
      name: "Premier Cricket Grounds",
      location: "South Side, Sports Valley",
      sports: ["Cricket", "Football"],
      rating: 4.8,
      reviewCount: 134,
      priceRange: "$45-65",
      image: "/placeholder.svg",
      availability: "Available",
      capacity: 22
    }
  ];

  // Filter venues based on current filters
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !location || venue.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesSports = selectedSports.length === 0 || 
                         selectedSports.some(sport => venue.sports.includes(sport));
    
    const matchesPrice = priceRange === 'any' || (() => {
      const priceNum = parseInt(venue.priceRange.split('-')[0].replace('$', ''));
      switch (priceRange) {
        case '0-25': return priceNum <= 25;
        case '25-50': return priceNum >= 25 && priceNum <= 50;
        case '50-100': return priceNum >= 50 && priceNum <= 100;
        case '100+': return priceNum >= 100;
        default: return true;
      }
    })();

    return matchesSearch && matchesLocation && matchesSports && matchesPrice;
  });

  // Sort venues
  const sortedVenues = [...filteredVenues].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.priceRange.split('-')[0].replace('$', '')) - 
               parseInt(b.priceRange.split('-')[0].replace('$', ''));
      case 'price-high':
        return parseInt(b.priceRange.split('-')[0].replace('$', '')) - 
               parseInt(a.priceRange.split('-')[0].replace('$', ''));
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Venues</h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing sports facilities in your area
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <SportFilter
              selectedSports={selectedSports}
              onSportChange={setSelectedSports}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              location={location}
              onLocationChange={setLocation}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <p className="text-muted-foreground">
                  {sortedVenues.length} venues found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {sortedVenues.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {sortedVenues.map((venue) => (
                  <VenueCard key={venue.id} {...venue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No venues found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSports([]);
                    setSearchQuery('');
                    setLocation('');
                    setPriceRange('any');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More (if needed) */}
            {sortedVenues.length > 0 && sortedVenues.length >= 10 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Venues
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};