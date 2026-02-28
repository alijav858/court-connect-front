import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CalendarDays, List } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

interface DateSelectorProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const visibleDays = 4;

  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  const visibleDates = dates.slice(startIndex, startIndex + visibleDays);

  const handlePrev = () => setStartIndex(Math.max(0, startIndex - 1));
  const handleNext = () => setStartIndex(Math.min(dates.length - visibleDays, startIndex + 1));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Select a date</h3>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2 flex-1 justify-center">
          {visibleDates.map((date) => {
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                className={`flex flex-col items-center px-3 py-2 rounded-lg border transition-all min-w-[60px] ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary-light"
                }`}
              >
                <span className="text-xs font-medium">
                  {format(date, "EEE")}
                </span>
                <span className="text-lg font-bold">{format(date, "d")}</span>
                <span className="text-xs">{format(date, "MMM")}</span>
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={handleNext}
          disabled={startIndex >= dates.length - visibleDays}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
