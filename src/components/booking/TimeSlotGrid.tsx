import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeSlotGridProps {
  selectedSlot: number | null;
  onSlotSelect: (slotHour: number) => void;
  duration: number;
  baseRate: number;
  selectedDate: Date | null;
  bookedSlots?: number[];
}

export const TimeSlotGrid = ({
  selectedSlot,
  onSlotSelect,
  duration,
  baseRate,
  selectedDate,
  bookedSlots = [],
}: TimeSlotGridProps) => {
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [selectedDate]);

  const now = new Date();
  const isToday = selectedDate && selectedDate.toDateString() === now.toDateString();

  const slots = Array.from({ length: 24 }, (_, i) => {
    const isPast = isToday && i < now.getHours();
    const isBooked = bookedSlots.includes(i);
    // Check if duration fits
    const exceedsMidnight = i + duration > 24;
    const overlapsBooked = Array.from({ length: duration }, (_, d) => i + d).some((h) =>
      bookedSlots.includes(h % 24)
    );
    const disabled = isPast || isBooked || exceedsMidnight || overlapsBooked;

    return { hour: i, disabled };
  });

  const filteredSlots = showAvailableOnly ? slots.filter((s) => !s.disabled) : slots;

  const formatHour = (hour: number) => {
    if (hour === 0) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    if (hour > 12) return `${hour - 12}:00 PM`;
    return `${hour}:00 AM`;
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Select a time slot</h3>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Select a time slot</h3>
        <button
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-all ${
            showAvailableOnly
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          <Filter className="h-3 w-3" />
          Available
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
        {filteredSlots.map((slot) => {
          const isSelected = selectedSlot === slot.hour;
          return (
            <button
              key={slot.hour}
              disabled={slot.disabled}
              onClick={() => onSlotSelect(slot.hour)}
              className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                slot.disabled
                  ? "bg-muted/50 border-border text-muted-foreground/50 cursor-not-allowed"
                  : isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-primary-light text-foreground"
              }`}
            >
              <span className="font-semibold text-sm">{formatHour(slot.hour)}</span>
              <span className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {duration}h · Rs {baseRate.toLocaleString()}/hr
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
