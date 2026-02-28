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
import { SportSelector, type Sport } from "@/components/booking/SportSelector";
import { CourtSelector, type Court } from "@/components/booking/CourtSelector";
import {
  MapPin,
  Clock,
  ArrowLeft,
  Lock,
  ShieldCheck,
  Info,
} from "lucide-react";

// Mock data — replace with API calls
const mockSports: Sport[] = [
  { id: "cricket", name: "Cricket", icon: "🏏" },
  { id: "football", name: "Football", icon: "⚽" },
  { id: "badminton", name: "Badminton", icon: "🏸" },
  { id: "tennis", name: "Tennis", icon: "🎾" },
];

const mockCourtsBySport: Record<string, Court[]> = {
  cricket: [
    { id: "c1", name: "Court A", type: "Indoor", feature: "AC", available: true, images: ["https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop", "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop"] },
    { id: "c2", name: "Court B", type: "Indoor", feature: "Non-AC", available: true, images: ["https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop"] },
    { id: "c3", name: "Turf 1", type: "Outdoor", available: false, images: ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&auto=format&fit=crop"] },
  ],
  football: [
    { id: "f1", name: "Turf A", type: "Outdoor", available: true, images: ["https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&auto=format&fit=crop"] },
    { id: "f2", name: "Turf B", type: "Outdoor", available: true, images: ["https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&auto=format&fit=crop"] },
  ],
  badminton: [
    { id: "b1", name: "Court 1", type: "Indoor", feature: "AC", available: true, images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop"] },
    { id: "b2", name: "Court 2", type: "Indoor", available: true, images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&auto=format&fit=crop"] },
  ],
  tennis: [
    { id: "t1", name: "Clay Court", type: "Outdoor", available: true, images: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&auto=format&fit=crop"] },
  ],
};

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [courtsLoading, setCourtsLoading] = useState(false);
  const [courts, setCourts] = useState<Court[]>([]);

  const bookingCardRef = useRef<HTMLDivElement>(null);

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
    bookedSlots: [8, 9, 14, 15, 16],
  };

  const bookingEnabled = selectedSport !== null && selectedCourt !== null;
  const canReserve = bookingEnabled && selectedDate && selectedDuration && selectedSlot !== null;

  // Load courts when sport changes
  useEffect(() => {
    if (selectedSport) {
      setCourtsLoading(true);
      setSelectedCourt(null);
      setSelectedSlot(null);
      // Simulate API call
      const timer = setTimeout(() => {
        setCourts(mockCourtsBySport[selectedSport] || []);
        setCourtsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCourts([]);
    }
  }, [selectedSport]);

  // Reset slot when court changes
  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedCourt]);

  // Auto-scroll to booking card on mobile after enabling
  useEffect(() => {
    if (bookingEnabled && window.innerWidth < 768 && bookingCardRef.current) {
      bookingCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [bookingEnabled]);

  const handleReserve = () => {
    alert(
      `Booking confirmed!\nSport: ${selectedSport}\nCourt: ${selectedCourt}\nDate: ${selectedDate?.toLocaleDateString()}\nTime: ${selectedSlot}:00\nDuration: ${selectedDuration}h\nTotal: Rs ${(venue.baseRate * selectedDuration).toLocaleString()}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* LEFT SECTION */}
          <div className="lg:col-span-6 space-y-6">
            {/* Venue Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
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
              <p className="text-muted-foreground text-sm leading-relaxed">{venue.description}</p>
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

            <Separator />

            {/* Sport Selection */}
            <SportSelector
              sports={mockSports}
              selectedSport={selectedSport}
              onSportSelect={(sportId) => {
                setSelectedSport(sportId === selectedSport ? null : sportId);
              }}
            />

            {/* Court Selection */}
            {selectedSport && (
              <>
                <Separator />
                <CourtSelector
                  courts={courts}
                  selectedCourt={selectedCourt}
                  onCourtSelect={(courtId) => setSelectedCourt(courtId)}
                  loading={courtsLoading}
                />
              </>
            )}
          </div>

          {/* RIGHT SECTION — Booking Card */}
          <div className="lg:col-span-4" ref={bookingCardRef}>
            <div className="lg:sticky lg:top-8">
              <Card
                className={`shadow-lg border-border transition-all duration-500 ${
                  !bookingEnabled ? "opacity-50 pointer-events-none select-none" : "opacity-100"
                }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Book Your Slot</CardTitle>
                  <p className="text-primary font-semibold text-sm">
                    Rs {venue.baseRate.toLocaleString()}/hour base rate
                  </p>
                </CardHeader>

                <CardContent className="space-y-5">
                  {!bookingEnabled && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                      <Info className="h-4 w-4 shrink-0" />
                      Please select sport and court to continue
                    </div>
                  )}

                  <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                  <Separator />

                  <DurationSelector
                    selectedDuration={selectedDuration}
                    onDurationSelect={(d) => {
                      setSelectedDuration(d);
                      setSelectedSlot(null);
                    }}
                  />
                  <Separator />

                  <TimeSlotGrid
                    selectedSlot={selectedSlot}
                    onSlotSelect={setSelectedSlot}
                    duration={selectedDuration}
                    baseRate={venue.baseRate}
                    selectedDate={selectedDate}
                    bookedSlots={venue.bookedSlots}
                  />
                  <Separator />

                  <PriceSummary
                    selectedSlot={selectedSlot}
                    duration={selectedDuration}
                    baseRate={venue.baseRate}
                  />

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
