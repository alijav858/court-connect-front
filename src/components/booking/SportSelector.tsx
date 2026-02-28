import { Loader2 } from "lucide-react";

export interface Sport {
  id: string;
  name: string;
  icon: string;
}

interface SportSelectorProps {
  sports: Sport[];
  selectedSport: string | null;
  onSportSelect: (sportId: string) => void;
  loading?: boolean;
}

export const SportSelector = ({
  sports,
  selectedSport,
  onSportSelect,
  loading = false,
}: SportSelectorProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg">Select Sport</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground text-lg">Select Sport</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sports.map((sport) => {
          const isSelected = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => onSportSelect(sport.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/30"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-2xl">{sport.icon}</span>
              <span
                className={`text-sm font-medium ${
                  isSelected ? "text-primary" : "text-foreground"
                }`}
              >
                {sport.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
