import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building, Clock, DollarSign, Users, X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VenueRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Court {
  id: string;
  name: string;
  sport: string;
  capacity: string;
  pricePerHour: string;
}

export const VenueRegistrationForm = ({ isOpen, onClose }: VenueRegistrationFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Basic Information
    venueName: "",
    businessName: "",
    description: "",
    venueType: "",
    
    // Location Details
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    
    // Contact Information
    ownerName: "",
    contactNumber: "",
    email: "",
    website: "",
    
    // Operating Details
    operatingHours: "",
    parkingAvailable: false,
    cafeteriaAvailable: false,
    lockerRoomsAvailable: false,
    equipmentRental: false,
    
    // Pricing & Policies
    cancellationPolicy: "",
    advanceBookingDays: "30",
    
    // Documents
    businessLicense: "",
    insuranceCertificate: "",
    ownerIdProof: ""
  });

  const [courts, setCourts] = useState<Court[]>([
    { id: "1", name: "", sport: "", capacity: "", pricePerHour: "" }
  ]);

  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  const sports = ["Cricket", "Football", "Tennis", "Futsal", "Basketball", "Badminton", "Volleyball", "Swimming"];
  const venueTypes = [
    "Sports Complex",
    "Gym/Fitness Center", 
    "Sports Club",
    "Community Center",
    "Private Facility",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.venueName || !formData.businessName || !formData.address || !formData.ownerName || !formData.contactNumber || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (selectedSports.length === 0) {
      toast({
        title: "Sports Required",
        description: "Please select at least one sport offered at your venue.",
        variant: "destructive"
      });
      return;
    }

    if (courts.some(court => !court.name || !court.sport || !court.capacity || !court.pricePerHour)) {
      toast({
        title: "Court Information Required",
        description: "Please complete all court/field information.",
        variant: "destructive"
      });
      return;
    }

    // Simulate venue registration
    toast({
      title: "Venue Registered Successfully!",
      description: "Your venue has been submitted for review. You'll receive a confirmation email within 24 hours.",
      variant: "default"
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSportToggle = (sport: string) => {
    setSelectedSports(prev => 
      prev.includes(sport) 
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  const addCourt = () => {
    setCourts(prev => [...prev, { 
      id: Date.now().toString(), 
      name: "", 
      sport: "", 
      capacity: "", 
      pricePerHour: "" 
    }]);
  };

  const removeCourt = (id: string) => {
    setCourts(prev => prev.filter(court => court.id !== id));
  };

  const updateCourt = (id: string, field: string, value: string) => {
    setCourts(prev => prev.map(court => 
      court.id === id ? { ...court, [field]: value } : court
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">Register Your Venue</CardTitle>
            <CardDescription>Provide your venue details to join our platform</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venueName">Venue Name *</Label>
                  <Input
                    id="venueName"
                    value={formData.venueName}
                    onChange={(e) => handleInputChange('venueName', e.target.value)}
                    placeholder="Elite Sports Complex"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="ABC Sports Pvt Ltd"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueType">Venue Type *</Label>
                  <Select value={formData.venueType} onValueChange={(value) => handleInputChange('venueType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue type" />
                    </SelectTrigger>
                    <SelectContent>
                      {venueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Operating Hours *</Label>
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                    placeholder="6:00 AM - 11:00 PM"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Venue Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your venue, facilities, and what makes it special..."
                  rows={4}
                />
              </div>
            </div>

            <Separator />

            {/* Location Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Location Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Sports Avenue, Downtown"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="NY"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="10001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="John Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="owner@venue.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.yourvenue.com"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Sports Offered */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sports Offered</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sports.map((sport) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sport-${sport}`}
                      checked={selectedSports.includes(sport)}
                      onCheckedChange={() => handleSportToggle(sport)}
                    />
                    <Label htmlFor={`sport-${sport}`} className="text-sm font-normal">
                      {sport}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Courts/Fields */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Courts/Fields</h3>
                <Button type="button" variant="outline" size="sm" onClick={addCourt}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Court
                </Button>
              </div>

              {courts.map((court, index) => (
                <Card key={court.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Court/Field {index + 1}</h4>
                      {courts.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCourt(court.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label>Court/Field Name *</Label>
                        <Input
                          value={court.name}
                          onChange={(e) => updateCourt(court.id, 'name', e.target.value)}
                          placeholder="Cricket Ground A"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Sport *</Label>
                        <Select 
                          value={court.sport} 
                          onValueChange={(value) => updateCourt(court.id, 'sport', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select sport" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedSports.map((sport) => (
                              <SelectItem key={sport} value={sport}>
                                {sport}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Capacity (Players) *</Label>
                        <Input
                          type="number"
                          value={court.capacity}
                          onChange={(e) => updateCourt(court.id, 'capacity', e.target.value)}
                          placeholder="22"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Price per Hour ($) *</Label>
                        <Input
                          type="number"
                          value={court.pricePerHour}
                          onChange={(e) => updateCourt(court.id, 'pricePerHour', e.target.value)}
                          placeholder="45"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={formData.parkingAvailable}
                    onCheckedChange={(checked) => handleInputChange('parkingAvailable', checked)}
                  />
                  <Label htmlFor="parking">Parking Available</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cafeteria"
                    checked={formData.cafeteriaAvailable}
                    onCheckedChange={(checked) => handleInputChange('cafeteriaAvailable', checked)}
                  />
                  <Label htmlFor="cafeteria">Cafeteria/Refreshments</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lockers"
                    checked={formData.lockerRoomsAvailable}
                    onCheckedChange={(checked) => handleInputChange('lockerRoomsAvailable', checked)}
                  />
                  <Label htmlFor="lockers">Locker Rooms</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipment"
                    checked={formData.equipmentRental}
                    onCheckedChange={(checked) => handleInputChange('equipmentRental', checked)}
                  />
                  <Label htmlFor="equipment">Equipment Rental</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Policies
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advanceBooking">Advance Booking (Days)</Label>
                  <Select 
                    value={formData.advanceBookingDays} 
                    onValueChange={(value) => handleInputChange('advanceBookingDays', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
                <Textarea
                  id="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  placeholder="Describe your cancellation and refund policy..."
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Document Upload Placeholders */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License</Label>
                  <Input
                    id="businessLicense"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Certificate</Label>
                  <Input
                    id="insurance"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleInputChange('insuranceCertificate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerIdProof">Owner ID Proof</Label>
                  <Input
                    id="ownerIdProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleInputChange('ownerIdProof', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" variant="hero">
                Register Venue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};