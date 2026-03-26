"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import {
  Car,
  Calendar,
  DollarSign,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function UserDashboard() {
  // 1. ALL HOOKS MUST BE AT THE VERY TOP
  const { user, rentals, cancelRental } = useAuth();
  const router = useRouter();

  // 2. EFFECTS MUST ALSO BE ABOVE THE RETURN
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // 3. ONLY AFTER ALL HOOKS ARE DECLARED, YOU CAN RETURN EARLY
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Redirecting to login...</p>
      </div>
    );
  }
 

  // If the user object is empty, the rentals array should also be empty [ ]
  const activeRentals = rentals ? rentals.filter((r) => r.status === "active") : [];
  
  // This will naturally show "0" if rentals is an empty array
  const totalBookings = activeRentals.length; 

  
    // ... your JSX
  

  // 4. NOW DO YOUR CALCULATIONS
  

  // ✅ 4. YOUR RENTAL LOGIC & CALCULATIONS
  const pastRentals = rentals.filter(
    (r) => r.status === "completed" || r.status === "cancelled"
  );
  
  const totalSpent = rentals
    .filter((r) => r.status !== "cancelled")
    .reduce((acc, r) => acc + r.totalPrice, 0);

  const handleCancelRental = (rentalId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelRental(rentalId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Manage your rentals and bookings here.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Rentals</CardTitle>
                <Car className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeRentals.length}</div>
                <p className="text-sm text-muted-foreground">Currently on the road</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{rentals.length}</div>
                <p className="text-sm text-muted-foreground">All time rentals</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalSpent.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Rentals Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Active Rentals</span>
                {activeRentals.length > 0 && <Badge>{activeRentals.length}</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeRentals.length > 0 ? (
                <div className="space-y-4">
                  {activeRentals.map((rental) => (
                    <div key={rental.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg border border-border bg-background">
                      <div className="relative w-full sm:w-32 h-20 rounded-lg overflow-hidden">
                        <Image src={rental.carImage} alt={rental.carName} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{rental.carName}</h3>
                        <div className="text-sm text-muted-foreground mt-1">
                          {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold">${rental.totalPrice}</p>
                          <Badge>Active</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleCancelRental(rental.id)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Rentals</h3>
                  <Button asChild className="mt-4">
                    <Link href="/cars">Browse More Cars <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Past Rentals History */}
          {pastRentals.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Rental History</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pastRentals.map((rental) => (
                    <div key={rental.id} className="flex items-center gap-4 p-4 rounded-lg border bg-background opacity-80">
                      <div className="relative w-20 h-12 rounded overflow-hidden">
                        <Image src={rental.carImage} alt={rental.carName} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{rental.carName}</h3>
                        <p className="text-xs text-muted-foreground">{new Date(rental.startDate).toLocaleDateString()}</p>
                      </div>
                      <Badge variant={rental.status === "completed" ? "secondary" : "destructive"}>
                        {rental.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/settings">Account Settings</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}