"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  Star,
  Users,
  Fuel,
  Settings2,
  Check,
  Calendar,
  Pencil,
} from "lucide-react";

export default function CarDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, addRental } = useAuth();

  // ✅ State for fetching from API
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  // ✅ Fetch car data from Backend API instead of local file
  useEffect(() => {
  if (!id || id === "undefined") return;

  const fetchCar = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
      if (!res.ok) throw new Error("Car not found");
      const data = await res.json();
      setCar(data);
    }  catch (err) {
  console.error(err);
} finally {
  setLoading(false); // 👈 This MUST be here or it stays on "Loading..."
}
  };

  fetchCar();
}, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
            <Button onClick={() => router.push("/cars")}>Back to Cars</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const totalPrice = days * car.price;

  const handleBooking = () => {
    if (!user) { router.push("/login"); return; }
    if (!startDate || !endDate || days <= 0) { alert("Please select valid dates"); return; }
    setIsBooking(true);
    setTimeout(() => {
      addRental({
        carId: car._id,
        carName: car.name,
        carImage: car.image,
        startDate,
        endDate,
        totalPrice,
        status: "active",
      });
      setIsBooking(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" className="-ml-2" asChild>
              <Link href="/cars">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cars
              </Link>
            </Button>

            {/* ✅ EDIT BUTTON (Visible only to Admin) */}
            {/* --- ADMIN EDIT BUTTON --- */}
{user && user.role === "admin" && (
  <div className="flex justify-end mb-4">
    <Button 
      variant="outline" 
      onClick={() => router.push(`/admin/edit/${car._id}`)}
      className="bg-white border-primary text-primary hover:bg-primary/10 font-semibold"
    >
      <Pencil className="mr-2 h-4 w-4" />
      Edit Vehicle Details
    </Button>
  </div>
)}

{/* --- YOUR EXISTING PRICE DIV STARTS HERE --- */}

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted">
                <Image src={car.image} alt={car.name} fill className="object-cover" priority />
                {!car.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive" className="text-lg px-6 py-2">Unavailable</Badge>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">{car.category}</Badge>
                    <p className="text-sm text-muted-foreground font-medium uppercase">{car.brand}</p>
                    <h1 className="text-3xl font-bold">{car.name}</h1>
                  </div>
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-lg">{car.rating || 0}</span>
                    <span className="text-muted-foreground">({car.reviews || 0} reviews)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-6 py-6 border-y border-border">
                  <div className="flex items-center gap-2"><Users className="h-5 w-5" /> <span>{car.seats} Passengers</span></div>
                  <div className="flex items-center gap-2"><Settings2 className="h-5 w-5" /> <span>{car.transmission}</span></div>
                  <div className="flex items-center gap-2"><Fuel className="h-5 w-5" /> <span>{car.fuel}</span></div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{car.description}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${car.price}</span>
                    <span className="text-muted-foreground font-normal">/day</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Pick-up Date</Label>
                      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="space-y-2">
                      <Label>Return Date</Label>
                      <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split("T")[0]} />
                    </div>
                  </div>

                  {days > 0 && (
                    <div className="space-y-2 pt-4 border-t border-border">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  )}

                  <Button className="w-full" size="lg" disabled={!car.available || isBooking} onClick={handleBooking}>
                    {isBooking ? "Processing..." : !car.available ? "Not Available" : "Book Now"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}