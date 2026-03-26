"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Fuel, Settings2 } from "lucide-react";

type Car = {
  _id: string;
  id: string; // optional but safe
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
  seats: number;
  transmission: string;
  fuel: string;
  rating: number;
  reviews: number;
};

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-4 py-1">
              Currently Unavailable
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm">
          {car.category}
        </Badge>
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {car.brand}
            </p>
            <h3 className="font-semibold text-lg leading-tight">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{car.rating}</span>
            <span className="text-muted-foreground">({car.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4" />
            <span>{car.fuel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-2xl font-bold">${car.price}</span>
            <span className="text-muted-foreground text-sm">/day</span>
          </div>
          <Button asChild disabled={!car.available}>
            <Link href={`/cars/${car._id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
