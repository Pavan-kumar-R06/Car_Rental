"use client";

import { useEffect, useState } from "react"; // Added hooks
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CarCard } from "@/components/car-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, MapPin, Headphones } from "lucide-react";

// 1. Define the Car type to match your Express API
interface Car {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
}

export default function HomePage() {
  // 2. Setup state for API data
  const [dbCars, setDbCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Fetch cars from Express backend on mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
        const data = await response.json();
        setDbCars(data);
      } catch (error) {
        console.error("Error fetching cars for Home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // 4. Slice the first 3 cars from the database state
  const featuredCars = dbCars.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        <Image
          src="/hero-bg.jpg"
          alt="Luxury car showroom"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-balance">
              Drive Your Dreams with Premium Rentals
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Experience luxury, performance, and comfort with our handpicked fleet of premium vehicles. 
              From sleek sports cars to spacious SUVs, find your perfect ride.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base px-8" asChild>
                <Link href="/cars">
                  Browse All Cars
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Why Choose DriveElite?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide an exceptional car rental experience with premium vehicles and outstanding service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Fully Insured", description: "All vehicles come with comprehensive insurance coverage for your peace of mind." },
              { icon: Clock, title: "24/7 Availability", description: "Pick up and return your vehicle any time that suits your schedule." },
              { icon: MapPin, title: "Multiple Locations", description: "Convenient pickup points across the city and at major airports." },
              { icon: Headphones, title: "Expert Support", description: "Our dedicated team is always ready to assist you with any questions." },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-background border border-border/50 hover:border-border transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Vehicles</h2>
              <p className="text-muted-foreground">
                Explore our most popular premium rentals
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/cars">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* 5. Logic to show loading or the fetched cars */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Button asChild>
              <Link href="/cars">
                View All Cars
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Ready to Hit the Road?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Sign up today and get 10% off your first rental. Experience the DriveElite difference.
          </p>
          <Button size="lg" variant="secondary" className="text-base px-8" asChild>
            <Link href="/signup">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}