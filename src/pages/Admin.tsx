import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Building2, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit3,
  Ban,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart
} from "lucide-react";

export const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock admin data
  const stats = {
    totalUsers: 1247,
    totalVenues: 89,
    totalBookings: 3456,
    totalRevenue: 89750,
    monthlyGrowth: 12.5,
    activeUsers: 856,
    pendingApprovals: 7,
    supportTickets: 23
  };

  const recentUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      type: "customer",
      joinDate: "2024-01-15",
      status: "active",
      bookings: 5,
      totalSpent: "$275"
    },
    {
      id: "2",
      name: "Sarah Johnson", 
      email: "sarah@elitesports.com",
      type: "venue-owner",
      joinDate: "2024-01-10",
      status: "active",
      venues: 2,
      revenue: "$12450"
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@email.com", 
      type: "customer",
      joinDate: "2024-01-20",
      status: "pending",
      bookings: 1,
      totalSpent: "$45"
    }
  ];

  const recentVenues = [
    {
      id: "1",
      name: "Elite Sports Complex",
      owner: "Sarah Johnson",
      location: "Downtown City",
      status: "active",
      rating: 4.8,
      bookings: 245,
      revenue: "$12450",
      joinDate: "2024-01-10"
    },
    {
      id: "2",
      name: "Champions Arena",
      owner: "Mike Thompson",
      location: "North District", 
      status: "pending",
      rating: 0,
      bookings: 0,
      revenue: "$0",
      joinDate: "2024-01-22"
    },
    {
      id: "3", 
      name: "Ace Tennis Club",
      owner: "Emma Davis",
      location: "East Side",
      status: "active",
      rating: 4.9,
      bookings: 156,
      revenue: "$8900",
      joinDate: "2024-01-05"
    }
  ];

  const recentBookings = [
    {
      id: "1",
      customer: "John Doe",
      venue: "Elite Sports Complex",
      sport: "Cricket",
      date: "2024-01-20",
      amount: "$45",
      status: "confirmed",
      commission: "$4.50"
    },
    {
      id: "2",
      customer: "Mike Wilson",
      venue: "Champions Arena", 
      sport: "Futsal",
      date: "2024-01-22",
      amount: "$60",
      status: "pending",
      commission: "$6.00"
    },
    {
      id: "3",
      customer: "Emma Davis",
      venue: "Ace Tennis Club",
      sport: "Tennis", 
      date: "2024-01-21",
      amount: "$35",
      status: "completed",
      commission: "$3.50"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': 
      case 'confirmed':
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'suspended':
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'default';
      case 'venue-owner': return 'secondary';
      case 'admin': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} userType="admin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage users, venues, and platform operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-success">+{stats.monthlyGrowth}% this month</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Venues</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalVenues}</p>
                  <p className="text-xs text-warning">{stats.pendingApprovals} pending approval</p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalBookings.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{stats.activeUsers} active users</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-success">+15% this month</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and their permissions</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentUsers.map((user) => (
                  <Card key={user.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge variant={getUserTypeColor(user.type) as any}>
                              {user.type}
                            </Badge>
                            <Badge variant={getStatusColor(user.status) as any}>
                              {user.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Email: {user.email}</p>
                            <p>Joined: {user.joinDate}</p>
                            {user.type === 'customer' && (
                              <p>Bookings: {user.bookings} | Spent: {user.totalSpent}</p>
                            )}
                            {user.type === 'venue-owner' && user.venues && (
                              <p>Venues: {user.venues} | Revenue: {user.revenue}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          {user.status === 'active' ? (
                            <Button size="sm" variant="destructive">
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" variant="success">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Venues Management */}
          <TabsContent value="venues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Management</CardTitle>
                <CardDescription>Review and manage venue listings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentVenues.map((venue) => (
                  <Card key={venue.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{venue.name}</h3>
                            <Badge variant={getStatusColor(venue.status) as any}>
                              {venue.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Owner: {venue.owner}</p>
                            <p>Location: {venue.location}</p>
                            <p>Joined: {venue.joinDate}</p>
                            {venue.status === 'active' && (
                              <p>Rating: {venue.rating} | Bookings: {venue.bookings} | Revenue: {venue.revenue}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          {venue.status === 'pending' ? (
                            <>
                              <Button size="sm" variant="success">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="sm" variant="outline">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Monitor platform bookings and transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBookings.map((booking) => (
                  <Card key={booking.id} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{booking.customer}</h3>
                            <Badge variant={getStatusColor(booking.status) as any}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Venue: {booking.venue}</p>
                            <p>Sport: {booking.sport} | Date: {booking.date}</p>
                            <p>Amount: {booking.amount} | Commission: {booking.commission}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Track platform commissions and payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold">Payment System</h3>
                  <p className="text-muted-foreground">Payment tracking and management features</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Track platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Analytics Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>Commission and revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform parameters and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Commission Rate (%)</label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Advance Payment (%)</label>
                    <Input type="number" defaultValue="20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Fee ($)</label>
                    <Input type="number" defaultValue="2.50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cancellation Window (hours)</label>
                    <Input type="number" defaultValue="24" />
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <Button variant="default">Save Settings</Button>
                  <Button variant="outline">Reset to Default</Button>
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