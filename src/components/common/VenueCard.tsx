import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface VenueCardProps {
  id: string;
  name: string;
  location: string;
  sports: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  availability: string;
  capacity?: number;
}

export const VenueCard = ({
  id,
  name,
  location,
  sports,
  rating,
  reviewCount,
  priceRange,
  image,
  availability,
  capacity
}: VenueCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {availability}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {sports.slice(0, 3).map((sport) => (
              <Badge key={sport} variant="outline" className="text-xs">
                {sport}
              </Badge>
            ))}
            {sports.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{sports.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="text-sm text-muted-foreground">({reviewCount})</span>
              </div>
            </div>
            {capacity && (
              <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                <span>{capacity}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-primary font-semibold">
              {priceRange}
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>per hour</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="default">
          <Link to={`/venue/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};