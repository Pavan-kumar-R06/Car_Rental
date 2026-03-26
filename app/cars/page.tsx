"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Car = {
  _id: string;
  id: string;
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

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // --- 1. DYNAMIC CATEGORY LOGIC ---
  // This extracts unique categories from your MongoDB data
  const uniqueCategories = useMemo(() => {
    const cats = cars.map((car) => car.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [cars]);

  const loadCars = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?t=${Date.now()}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      const fixedData = data.map((car: any) => ({
        ...car,
        id: car._id,
      }));

      setCars(fixedData);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
    window.addEventListener("focus", loadCars);
    return () => window.removeEventListener("focus", loadCars);
  }, [loadCars]);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || car.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Browse Our Fleet</h1>
            <p className="text-muted-foreground">Find the perfect vehicle.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* --- 2. RENDER UNIQUE CATEGORIES --- */}
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category) => (
                <Button
                  key={category} // Guaranteed unique now
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {loading ? "Loading..." : `Showing ${filteredCars.length} vehicles`}
          </p>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-20 border rounded-lg bg-slate-50">
                <p>No vehicles found.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                  Clear Filters
                </Button>
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}