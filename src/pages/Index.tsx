import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VenueCard } from "@/components/common/VenueCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Clock, Shield, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-sports-venue.jpg";

const Index = () => {
  // Mock featured venues data
  const featuredVenues = [
    {
      id: "1",
      name: "Elite Sports Complex",
      location: "Downtown City",
      sports: ["Cricket", "Football", "Tennis"],
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
      location: "North District",
      sports: ["Futsal", "Basketball", "Volleyball"],
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
      location: "East Side",
      sports: ["Tennis", "Badminton"],
      rating: 4.9,
      reviewCount: 203,
      priceRange: "$20-35",
      image: "/placeholder.svg",
      availability: "Available", 
      capacity: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Sports venues" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Book Your Perfect
            <span className="block text-accent">Sports Venue</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover and reserve amazing sports facilities in your area. From cricket grounds to tennis courts, find the perfect venue for your game.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4" asChild>
              <Link to="/venues">Explore Venues</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white text-white hover:bg-white hover:text-foreground" asChild>
              <Link to="/auth?mode=register&type=venue-owner">List Your Venue</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Sport</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Select Sport</option>
                    <option>Cricket</option>
                    <option>Football</option>
                    <option>Tennis</option>
                    <option>Futsal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Enter location"
                      className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date</label>
                  <input 
                    type="date" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  />
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-10" variant="hero">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose SportBook?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make booking sports venues simple, secure, and convenient for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Easy Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find the perfect venue with our advanced search and filtering options. Browse by sport, location, price, and availability.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle>Instant Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book your preferred time slots instantly with real-time availability. No waiting, no phone calls, just pure convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your payments are protected with industry-standard security. Pay only 20% advance and settle the rest at the venue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Featured Venues
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover top-rated sports facilities in your area
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/venues">View All Venues</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Playing?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of sports enthusiasts who trust SportBook for their venue bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/auth?mode=register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/venues">Browse Venues</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
