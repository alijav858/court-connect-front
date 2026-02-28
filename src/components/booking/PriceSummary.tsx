import { Separator } from "@/components/ui/separator";

interface PriceSummaryProps {
  selectedSlot: number | null;
  duration: number;
  baseRate: number;
}

export const PriceSummary = ({ selectedSlot, duration, baseRate }: PriceSummaryProps) => {
  if (selectedSlot === null) return null;

  const totalPrice = baseRate * duration;

  const formatHour = (hour: number) => {
    if (hour === 0 || hour === 24) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    if (hour > 12) return `${(hour % 12)}:00 PM`;
    return `${hour}:00 AM`;
  };

  const startTime = formatHour(selectedSlot);
  const endTime = formatHour(selectedSlot + duration);

  return (
    <div className="border border-primary/30 rounded-lg p-4 bg-primary-light/30 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Total Price</p>
          <p className="text-xs text-muted-foreground">
            {startTime} - {endTime}
          </p>
        </div>
        <p className="text-2xl font-bold text-primary">
          Rs {totalPrice.toLocaleString()}
        </p>
      </div>

      <Separator />

      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground italic">Hourly Breakdown:</p>
        {Array.from({ length: duration }, (_, i) => {
          const hourStart = formatHour(selectedSlot + i);
          const hourEnd = formatHour(selectedSlot + i + 1);
          return (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Hour {i + 1}: {hourStart} - {hourEnd}
              </span>
              <span className="text-foreground">
                <span className="text-muted-foreground text-[10px] mr-1">Standard Rate</span>
                <span className="font-semibold">Rs {baseRate.toLocaleString()}</span>
              </span>
            </div>
          );
        })}
      </div>

      <Separator />

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground italic">
          Standard Rate ({duration}h × Rs {baseRate.toLocaleString()})
        </span>
        <span className="font-bold text-foreground">Rs {totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};
