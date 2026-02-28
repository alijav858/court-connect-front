import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Court {
  id: string;
  name: string;
  type: "Indoor" | "Outdoor";
  feature?: string;
  available: boolean;
  images: string[];
}

interface CourtSelectorProps {
  courts: Court[];
  selectedCourt: string | null;
  onCourtSelect: (courtId: string) => void;
  loading?: boolean;
}

export const CourtSelector = ({
  courts,
  selectedCourt,
  onCourtSelect,
  loading = false,
}: CourtSelectorProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images: string[], index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg">Select Court</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground text-lg">Select Court</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {courts.map((court) => {
          const isSelected = selectedCourt === court.id;
          return (
            <button
              key={court.id}
              disabled={!court.available}
              onClick={() => court.available && onCourtSelect(court.id)}
              className={`rounded-xl border bg-card shadow-sm overflow-hidden text-left transition-all duration-200 ${
                !court.available
                  ? "opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "border-primary ring-1 ring-primary/30 shadow-md"
                  : "border-border hover:border-primary/40 hover:shadow-md hover:scale-[1.02]"
              }`}
            >
              {/* Thumbnail */}
              {court.images.length > 0 && (
                <div
                  className="h-[120px] w-full overflow-hidden cursor-zoom-in"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (court.available) openModal(court.images);
                  }}
                >
                  <img
                    src={court.images[0]}
                    alt={court.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-3 space-y-1.5">
                <p
                  className={`font-medium text-sm ${
                    isSelected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {court.name}
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {court.type}
                  </Badge>
                  {court.feature && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {court.feature}
                    </Badge>
                  )}
                  {!court.available && (
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                      Unavailable
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black/95 border-none">
          <DialogTitle className="sr-only">Court Image Preview</DialogTitle>
          <div className="relative flex items-center justify-center min-h-[400px]">
            <img
              src={modalImages[modalIndex]}
              alt={`Court image ${modalIndex + 1}`}
              className="max-h-[80vh] w-auto object-contain"
            />

            {modalImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setModalIndex((p) => (p - 1 + modalImages.length) % modalImages.length)
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5 hover:bg-background transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={() =>
                    setModalIndex((p) => (p + 1) % modalImages.length)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 rounded-full p-1.5 hover:bg-background transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}

            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {modalIndex + 1} / {modalImages.length}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
