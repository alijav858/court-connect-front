interface DurationSelectorProps {
  selectedDuration: number;
  onDurationSelect: (hours: number) => void;
}

export const DurationSelector = ({ selectedDuration, onDurationSelect }: DurationSelectorProps) => {
  const durations = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground">Duration</h3>
      <div className="grid grid-cols-4 gap-2">
        {durations.map((hours) => (
          <button
            key={hours}
            onClick={() => onDurationSelect(hours)}
            className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
              selectedDuration === hours
                ? "bg-primary text-primary-foreground border-primary shadow-md"
                : "border-border hover:border-primary/50 hover:bg-primary-light text-foreground"
            }`}
          >
            {hours}h
          </button>
        ))}
      </div>
    </div>
  );
};
