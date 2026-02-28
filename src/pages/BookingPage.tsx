import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DateSelector } from "@/components/booking/DateSelector";
import { DurationSelector } from "@/components/booking/DurationSelector";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { PriceSummary } from "@/components/booking/PriceSummary";
import {
  MapPin,
  Clock,
  ArrowLeft,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const bookingCardRef = useRef<HTMLDivElement>(null);

  // Mock venue data — replace with API call
  const venue = {
    id: id || "1",
    name: "New Tennis ball Arena",
    category: "Indoor Cricket",
    isOpen24Hours: true,
    location: "North Nazimabad, Karachi, Sindh",
    description:
      "Indoor tap ball court with air conditioning and professional flooring. Ideal for pickup games and tournaments.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    amenities: ["Parking", "Stands", "Canteen"],
    baseRate: 2400,
    bookedSlots: [8, 9, 14, 15, 16], // mock booked hours
  };

  const canReserve = selectedDate && selectedDuration && selectedSlot !== null;

  // Auto-scroll to booking card on mobile after date selection
  useEffect(() => {
    if (selectedDate && window.innerWidth < 768 && bookingCardRef.current) {
      bookingCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedDate]);

  const handleReserve = () => {
    // In production, this would call your API
    alert(
      `Booking confirmed!\nDate: ${selectedDate?.toLocaleDateString()}\nTime: ${selectedSlot}:00\nDuration: ${selectedDuration}h\nTotal: Rs ${(venue.baseRate * selectedDuration).toLocaleString()}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* LEFT SECTION — Venue Info */}
          <div className="lg:col-span-6 space-y-6">
            {/* Venue Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Venue Details */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{venue.name}</h1>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">{venue.category}</Badge>
                {venue.isOpen24Hours && (
                  <Badge variant="outline" className="border-primary text-primary">
                    <Clock className="h-3 w-3 mr-1" />
                    Open 24 Hours
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {venue.location}
                </span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {venue.description}
              </p>

              <div className="pt-2">
                <h3 className="font-semibold text-foreground mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION — Booking Card (Sticky) */}
          <div className="lg:col-span-4" ref={bookingCardRef}>
            <div className="lg:sticky lg:top-8">
              <Card className="shadow-lg border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Book Your Slot</CardTitle>
                  <p className="text-primary font-semibold text-sm">
                    Rs {venue.baseRate.toLocaleString()}/hour base rate
                  </p>
                </CardHeader>

                <CardContent className="space-y-5">
                  {/* Date Selector */}
                  <DateSelector
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                  />

                  <Separator />

                  {/* Duration Selector */}
                  <DurationSelector
                    selectedDuration={selectedDuration}
                    onDurationSelect={(d) => {
                      setSelectedDuration(d);
                      setSelectedSlot(null); // reset slot on duration change
                    }}
                  />

                  <Separator />

                  {/* Time Slots */}
                  <TimeSlotGrid
                    selectedSlot={selectedSlot}
                    onSlotSelect={setSelectedSlot}
                    duration={selectedDuration}
                    baseRate={venue.baseRate}
                    selectedDate={selectedDate}
                    bookedSlots={venue.bookedSlots}
                  />

                  <Separator />

                  {/* Price Summary */}
                  <PriceSummary
                    selectedSlot={selectedSlot}
                    duration={selectedDuration}
                    baseRate={venue.baseRate}
                  />

                  {/* CTA Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!canReserve}
                    onClick={handleReserve}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Reserve & Continue to Payment
                  </Button>

                  {canReserve && (
                    <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Slot reserved for 5 mins
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
