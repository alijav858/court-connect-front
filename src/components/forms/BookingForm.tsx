import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, Clock, Users, CreditCard, MapPin, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    venueName: "",
    sport: "",
    court: "",
    date: "",
    startTime: "",
    endTime: "",
    numberOfPlayers: "",
    playerNames: "",
    contactNumber: "",
    email: "",
    specialRequirements: "",
    // Payment fields
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: ""
  });

  const sports = ["Cricket", "Football", "Tennis", "Futsal", "Basketball", "Badminton"];
  const venues = [
    { name: "Elite Sports Complex", courts: ["Cricket Ground A", "Cricket Ground B", "Football Field A", "Tennis Court 1", "Tennis Court 2"] },
    { name: "Champions Arena", courts: ["Futsal Court 1", "Futsal Court 2", "Basketball Court A"] },
    { name: "Ace Tennis Club", courts: ["Tennis Court 1", "Tennis Court 2", "Tennis Court 3", "Badminton Court 1"] }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.venueName || !formData.sport || !formData.court || !formData.date || !formData.startTime || !formData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required booking details.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      toast({
        title: "Payment Required",
        description: "Please complete payment information for 20% advance booking.",
        variant: "destructive"
      });
      return;
    }

    // Simulate booking submission
    toast({
      title: "Booking Confirmed!",
      description: "Your venue has been booked successfully. Payment confirmation will be sent to your email.",
      variant: "default"
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedVenue = venues.find(v => v.name === formData.venueName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">Book a Venue</CardTitle>
            <CardDescription>Fill in the details to reserve your sports venue</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Venue Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Venue Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue Name *</Label>
                  <Select value={formData.venueName} onValueChange={(value) => handleInputChange('venueName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.name} value={venue.name}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sport">Sport *</Label>
                  <Select value={formData.sport} onValueChange={(value) => handleInputChange('sport', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="court">Court/Field *</Label>
                  <Select 
                    value={formData.court} 
                    onValueChange={(value) => handleInputChange('court', value)}
                    disabled={!selectedVenue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select court" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedVenue?.courts.map((court) => (
                        <SelectItem key={court} value={court}>
                          {court}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="players">Number of Players *</Label>
                  <Input
                    id="players"
                    type="number"
                    min="1"
                    max="22"
                    value={formData.numberOfPlayers}
                    onChange={(e) => handleInputChange('numberOfPlayers', e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Date & Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
                Date & Time
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Select value={formData.startTime} onValueChange={(value) => handleInputChange('startTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 14 }, (_, i) => {
                        const hour = 6 + i;
                        const time = `${hour.toString().padStart(2, '0')}:00`;
                        return (
                          <SelectItem key={time} value={time}>
                            {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Select value={formData.endTime} onValueChange={(value) => handleInputChange('endTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 14 }, (_, i) => {
                        const hour = 8 + i;
                        const time = `${hour.toString().padStart(2, '0')}:00`;
                        return (
                          <SelectItem key={time} value={time}>
                            {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                          </SelectItem>
                        );
                      })}
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
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="playerNames">Player Names (Optional)</Label>
                <Textarea
                  id="playerNames"
                  value={formData.playerNames}
                  onChange={(e) => handleInputChange('playerNames', e.target.value)}
                  placeholder="List player names separated by commas"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Special Requirements (Optional)</Label>
                <Textarea
                  id="requirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Any special equipment, catering, or accessibility requirements"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                Payment Information (20% Advance)
              </h3>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  A 20% advance payment is required to confirm your booking. The remaining amount can be paid at the venue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name *</Label>
                  <Input
                    id="cardholderName"
                    value={formData.cardholderName}
                    onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Textarea
                  id="billingAddress"
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                  placeholder="Enter your billing address"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            {/* Booking Summary */}
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">Booking Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Venue:</span>
                  <span className="font-medium ml-2">{formData.venueName || "Not selected"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Court:</span>
                  <span className="font-medium ml-2">{formData.court || "Not selected"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium ml-2">{formData.date || "Not selected"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium ml-2">
                    {formData.startTime && formData.endTime ? `${formData.startTime} - ${formData.endTime}` : "Not selected"}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Advance Payment (20%):</span>
                  <span className="text-primary">$18.00</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total booking amount: $90.00 (Remaining $72.00 to be paid at venue)
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1" variant="hero">
                Confirm Booking & Pay
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};