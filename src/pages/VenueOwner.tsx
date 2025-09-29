import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Edit3, 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  Clock,
  TrendingUp,
  Star,
  BarChart3
} from "lucide-react";

export const VenueOwner = () => {
  const [owner] = useState({
    name: "Sarah Johnson",
    email: "sarah@elitesports.com",
    phone: "+1 (555) 987-6543",
    businessName: "Elite Sports Complex",
    memberSince: "January 2024"
  });

  // Mock data
  const venues = [
    {
      id: "1",
      name: "Elite Sports Complex - Main",
      location: "Downtown City",
      sports: ["Cricket", "Football", "Tennis"],
      status: "active",
      rating: 4.8,
      reviews: 127,
      courts: 8,
      totalBookings: 245,
      revenue: "$12,450"
    },
    {
      id: "2", 
      name: "Elite Sports Complex - North",
      location: "North District",
      sports: ["Futsal", "Basketball"],
      status: "active",
      rating: 4.6,
      reviews: 89,
      courts: 4,
      totalBookings: 156,
      revenue: "$8,900"
    }
  ];

  const recentBookings = [
    {
      id: "1",
      customerName: "John Doe",
      venue: "Elite Sports Complex - Main",
      court: "Cricket Ground A",
      date: "2024-01-20",
      time: "10:00 AM - 12:00 PM",
      sport: "Cricket",
      status: "confirmed",
      amount: "$45"
    },
    {
      id: "2",
      customerName: "Mike Wilson", 
      venue: "Elite Sports Complex - North",
      court: "Futsal Court 1",
      date: "2024-01-22",
      time: "6:00 PM - 8:00 PM",
      sport: "Futsal",
      status: "pending",
      amount: "$60"
    },
    {
      id: "3",
      customerName: "Emma Davis",
      venue: "Elite Sports Complex - Main",
      court: "Tennis Court 2",
      date: "2024-01-21",
      time: "2:00 PM - 4:00 PM", 
      sport: "Tennis",
      status: "completed",
      amount: "$35"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'active': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userType="venue-owner" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Venue Owner Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your venues and track your business performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">$21,350</p>
                  <p className="text-xs text-success">+12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">401</p>
                  <p className="text-xs text-success">+8% from last month</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Venues</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">12 total courts</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.7</p>
                  <p className="text-xs text-muted-foreground">216 total reviews</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="venues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="venues">My Venues</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Venues Management */}
          <TabsContent value="venues" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Venues</h2>
              <Button variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Add New Venue
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {venues.map((venue) => (
                <Card key={venue.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{venue.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{venue.location}</span>
                        </CardDescription>
                      </div>
                      <Badge variant={getStatusColor(venue.status) as any}>
                        {venue.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {venue.sports.map((sport) => (
                        <Badge key={sport} variant="outline" className="text-xs">
                          {sport}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-current" />
                          <span className="font-medium">{venue.rating}</span>
                          <span className="text-muted-foreground">({venue.reviews})</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Courts:</span>
                        <span className="font-medium ml-1">{venue.courts}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bookings:</span>
                        <span className="font-medium ml-1">{venue.totalBookings}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium ml-1 text-primary">{venue.revenue}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage customer bookings and reservations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBookings.map((booking) => (
                  <Card key={booking.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{booking.customerName}</h3>
                            <Badge variant={getStatusColor(booking.status) as any}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex items-center space-x-4 text-muted-foreground">
                              <span><strong>Venue:</strong> {booking.venue}</span>
                              <span><strong>Court:</strong> {booking.court}</span>
                            </div>
                            <div className="flex items-center space-x-4 text-muted-foreground">
                              <span><strong>Date:</strong> {booking.date}</span>
                              <span><strong>Time:</strong> {booking.time}</span>
                              <span><strong>Sport:</strong> {booking.sport}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 lg:items-end">
                          <div className="text-lg font-semibold text-primary">{booking.amount}</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            {booking.status === 'pending' && (
                              <>
                                <Button size="sm" variant="success">
                                  Confirm
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Decline
                                </Button>
                              </>
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

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Track your earnings over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Analyze booking patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">Booking Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payouts */}
          <TabsContent value="payouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
                <CardDescription>Track your payment history and upcoming payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">Payouts Coming Soon</h3>
                    <p className="text-muted-foreground">Your payout history will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Manage your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input defaultValue={owner.businessName} />
                  </div>
                  <div className="space-y-2">
                    <Label>Owner Name</Label>
                    <Input defaultValue={owner.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue={owner.email} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input type="tel" defaultValue={owner.phone} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Description</Label>
                  <Textarea 
                    placeholder="Describe your business and facilities..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select defaultValue="sports-complex">
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports-complex">Sports Complex</SelectItem>
                        <SelectItem value="gym">Gym/Fitness Center</SelectItem>
                        <SelectItem value="club">Sports Club</SelectItem>
                        <SelectItem value="community-center">Community Center</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Operating Hours</Label>
                    <Input placeholder="e.g., 6:00 AM - 11:00 PM" />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="default">Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};