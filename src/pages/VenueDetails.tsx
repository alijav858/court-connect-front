import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingForm } from "@/components/forms/BookingForm";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  Wifi, 
  Car, 
  Coffee, 
  Shield,
  ArrowLeft,
  Calendar
} from "lucide-react";

export const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock venue data - replace with API call
  const venue = {
    id: id || "1",
    name: "Elite Sports Complex",
    description: "Premier sports facility featuring state-of-the-art courts and professional-grade equipment. Perfect for both casual players and serious athletes looking for top-quality venues.",
    location: "Mumbai, Maharashtra",
    fullAddress: "123 Sports Avenue, Andheri West, Mumbai, Maharashtra 400053",
    rating: 4.8,
    reviewCount: 245,
    priceRange: "₹500-2000/hour",
    phone: "+91 98765 43210",
    email: "info@elitesports.com",
    images: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&auto=format&fit=crop"
    ],
    sports: ["Basketball", "Badminton", "Tennis"],
    courts: [
      {
        id: 1,
        name: "Basketball Court A",
        sport: "Basketball",
        price: "₹1500/hour",
        capacity: "10 players",
        features: ["Indoor", "Air Conditioned", "Professional Flooring"]
      },
      {
        id: 2,
        name: "Badminton Court 1",
        sport: "Badminton",
        price: "₹800/hour",
        capacity: "4 players",
        features: ["Indoor", "Wooden Floor", "LED Lighting"]
      },
      {
        id: 3,
        name: "Tennis Court Premium",
        sport: "Tennis",
        price: "₹2000/hour",
        capacity: "4 players",
        features: ["Outdoor", "Clay Surface", "Floodlights"]
      }
    ],
    amenities: [
      { icon: Wifi, name: "Free WiFi" },
      { icon: Car, name: "Parking" },
      { icon: Coffee, name: "Cafeteria" },
      { icon: Shield, name: "Locker Rooms" },
      { icon: Users, name: "Changing Rooms" },
      { icon: Clock, name: "24/7 Access" }
    ],
    openingHours: {
      weekdays: "6:00 AM - 11:00 PM",
      weekends: "5:00 AM - 12:00 AM"
    },
    reviews: [
      {
        id: 1,
        author: "Rahul Sharma",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent facility with top-notch courts. Staff is very professional and helpful."
      },
      {
        id: 2,
        author: "Priya Patel",
        rating: 4,
        date: "1 week ago",
        comment: "Great place for badminton. Courts are well-maintained. Parking can be challenging during peak hours."
      },
      {
        id: 3,
        author: "Amit Kumar",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best sports complex in the area. Clean facilities and friendly staff."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/venues")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Venues
        </Button>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-3">
            <img
              src={venue.images[selectedImage]}
              alt={venue.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
            {venue.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${venue.name} view ${index + 1}`}
                className={`w-full h-[90px] object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Venue Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{venue.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{venue.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">{venue.rating}</span>
                <span>({venue.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          <Button size="lg" onClick={() => setIsBookingOpen(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </div>

        <Separator className="mb-8" />

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courts">Courts & Pricing</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{venue.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Sports Available</h3>
                    <div className="flex flex-wrap gap-2">
                      {venue.sports.map((sport) => (
                        <Badge key={sport} variant="secondary">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Opening Hours</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekdays:</span>
                        <span className="font-medium">{venue.openingHours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekends:</span>
                        <span className="font-medium">{venue.openingHours.weekends}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.fullAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courts & Pricing Tab */}
          <TabsContent value="courts" className="space-y-4">
            {venue.courts.map((court) => (
              <Card key={court.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{court.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <Badge variant="outline">{court.sport}</Badge>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{court.price}</p>
                      <p className="text-sm text-muted-foreground">per hour</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{court.capacity}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {court.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>


          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-2xl font-bold text-foreground">{venue.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      Based on {venue.reviewCount} reviews
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {venue.reviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    {review.id !== venue.reviews[venue.reviews.length - 1].id && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sticky Book Now Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
          <Button className="w-full" size="lg" onClick={() => setIsBookingOpen(true)}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </Button>
        </div>
      </main>

      <Footer />
      
      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};
