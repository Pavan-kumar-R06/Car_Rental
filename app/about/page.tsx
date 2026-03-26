"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              About DriveElite
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a premium car rental service dedicated to providing exceptional 
              vehicles and outstanding customer experiences since 2015.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Premium Vehicles" },
                { value: "50+", label: "Pickup Locations" },
                { value: "24/7", label: "Customer Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  DriveElite was founded with a simple mission: to make premium car 
                  rentals accessible to everyone. What started as a small fleet of 
                  luxury vehicles has grown into one of the most trusted names in 
                  the car rental industry.
                </p>
                <p>
                  Our team of automotive enthusiasts carefully curates each vehicle 
                  in our fleet, ensuring that every car meets our high standards for 
                  quality, performance, and comfort. Whether you need a sophisticated 
                  sedan for a business trip or a powerful sports car for a weekend 
                  getaway, we have the perfect vehicle for you.
                </p>
                <p>
                  We believe that driving should be an experience, not just a means 
                  of transportation. That&apos;s why we go above and beyond to ensure 
                  every rental is smooth, enjoyable, and memorable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description:
                    "All our vehicles undergo rigorous safety inspections and maintenance checks.",
                },
                {
                  icon: Award,
                  title: "Quality Excellence",
                  description:
                    "We only offer premium vehicles that meet our high standards for comfort and performance.",
                },
                {
                  icon: Users,
                  title: "Customer Focus",
                  description:
                    "Your satisfaction is our priority. We strive to exceed expectations at every interaction.",
                },
                {
                  icon: Clock,
                  title: "Reliability",
                  description:
                    "Count on us for punctual service, transparent pricing, and hassle-free rentals.",
                },
              ].map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
