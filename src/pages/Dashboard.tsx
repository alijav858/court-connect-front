import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VenueCard } from "@/components/common/VenueCard";
import { BookingForm } from "@/components/forms/BookingForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, CreditCard, Star, User, History, Heart } from "lucide-react";

export const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    memberSince: "March 2024"
  });

  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  // Mock data
  const upcomingBookings = [
    {
      id: "1",
      venueName: "Elite Sports Complex",
      sport: "Cricket",
      date: "2024-01-20",
      time: "10:00 AM - 12:00 PM",
      location: "Downtown City",
      status: "confirmed",
      amount: "$45",
      court: "Cricket Ground A"
    },
    {
      id: "2", 
      venueName: "Champions Arena",
      sport: "Futsal",
      date: "2024-01-22",
      time: "6:00 PM - 8:00 PM", 
      location: "North District",
      status: "pending",
      amount: "$60",
      court: "Futsal Court 2"
    }
  ];

  const bookingHistory = [
    {
      id: "3",
      venueName: "Ace Tennis Club", 
      sport: "Tennis",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      location: "East Side",
      status: "completed",
      amount: "$35",
      court: "Tennis Court 1"
    },
    {
      id: "4",
      venueName: "Elite Sports Complex",
      sport: "Football", 
      date: "2024-01-10",
      time: "4:00 PM - 6:00 PM",
      location: "Downtown City", 
      status: "completed",
      amount: "$50",
      court: "Football Field B"
    }
  ];

  const favoriteVenues = [
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userType="customer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-2">Manage your bookings and discover new venues</p>
          </div>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => setIsBookingFormOpen(true)}
          >
            Book Now
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{user.memberSince}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Favorite Venues</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Spent</span>
                  <span className="font-semibold">$1,240</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Upcoming Bookings */}
              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>Your scheduled venue reservations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{booking.venueName}</h3>
                                <Badge variant={getStatusColor(booking.status) as any}>
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Sport:</span> {booking.sport} | 
                                <span className="font-medium"> Court:</span> {booking.court}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2 md:items-end">
                              <div className="text-lg font-semibold text-primary">{booking.amount}</div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                                {booking.status === 'confirmed' && (
                                  <Button size="sm" variant="destructive">
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Booking History */}
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking History</CardTitle>
                    <CardDescription>Your past venue bookings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <Card key={booking.id} className="border border-border">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{booking.venueName}</h3>
                                <Badge variant={getStatusColor(booking.status) as any}>
                                  {booking.status}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Sport:</span> {booking.sport} | 
                                <span className="font-medium"> Court:</span> {booking.court}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2 md:items-end">
                              <div className="text-lg font-semibold">{booking.amount}</div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  View Receipt
                                </Button>
                                <Button size="sm" variant="default">
                                  Rate & Review
                                </Button>
                                <Button size="sm" variant="secondary">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorite Venues */}
              <TabsContent value="favorites" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Venues</CardTitle>
                    <CardDescription>Your saved venues for quick booking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favoriteVenues.map((venue) => (
                        <VenueCard key={venue.id} {...venue} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Settings */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <input 
                          type="text" 
                          defaultValue="John"
                          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue="Doe"
                          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <input 
                          type="email" 
                          defaultValue={user.email}
                          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input 
                          type="tel" 
                          defaultValue={user.phone}
                          className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <Button variant="default">Save Changes</Button>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={() => setIsBookingFormOpen(false)} 
      />

      <Footer />
    </div>
  );
};