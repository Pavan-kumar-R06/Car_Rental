"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import {
  Car as CarIcon,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
} from "lucide-react";


// 1. Define the Car interface to solve the TypeScript 'never' error
interface Car {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  available: boolean;
}

// Define Rental interface for table safety
interface Rental {
  _id: string;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

    useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting...</p>; // ✅ prevents blank screen
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // ✅ THEN condition
  if (!user) {
    return <p>Redirecting...</p>;
  }

  // 2. Initialize state for Cars and Rentals
  const [dbCars, setDbCars] = useState<Car[]>([]);
  const [dbRentals, setDbRentals] = useState<Rental[]>([]); // Added this state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (user && user.role !== "admin") {
      router.push("/login");
      return;
    }

    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        // Fetch both Cars and Rentals from your Express Backend
        const [carsRes, rentalsRes] = await Promise.all([
          
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/rentals`) // Ensure this endpoint exists in server.js
        ]);
        
        const carsData = await carsRes.json();
        const rentalsData = await rentalsRes.json();
        
        setDbCars(Array.isArray(carsData) ? carsData : []);
        setDbRentals(Array.isArray(rentalsData) ? rentalsData : []);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAdminStats();
    }
  }, [user, router]);

  // Prevent flicker during redirect
  if (!user || user.role !== "admin") return null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg animate-pulse">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // 4. Calculations based on fetched data
  const totalCars = dbCars.length;
  const availableCars = dbCars.filter((c) => c.available).length;
  const activeRentals = dbRentals.filter((r) => r.status === "active").length;
  const totalRevenue = dbRentals
    .filter((r) => r.status !== "cancelled")
    .reduce((acc, r) => acc + r.totalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Here&apos;s an overview of your rental business.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Fleet
                </CardTitle>
                <CarIcon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalCars}</div>
                <p className="text-sm text-muted-foreground">
                  {availableCars} available now
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Rentals
                </CardTitle>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{activeRentals}</div>
                <p className="text-sm text-muted-foreground">
                  {dbRentals.length} total bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  From all bookings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Utilization
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {totalCars > 0 ? Math.round((activeRentals / totalCars) * 100) : 0}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Fleet utilization rate
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fleet Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Fleet Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price/Day</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dbCars.map((car) => (
                      <TableRow key={car._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-8 rounded overflow-hidden">
                              <Image
                                src={car.image}
                                alt={car.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{car.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {car.brand}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{car.category}</Badge>
                        </TableCell>
                        <TableCell>${car.price}</TableCell>
                        <TableCell>
                          {car.available ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Available</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-destructive">
                              <XCircle className="h-4 w-4" />
                              <span className="text-sm">Rented</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {dbRentals.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dbRentals.map((rental) => (
                        <TableRow key={rental._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-8 rounded overflow-hidden">
                                <Image
                                  src={rental.carImage}
                                  alt={rental.carName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="font-medium text-sm">
                                {rental.carName}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(rental.startDate).toLocaleDateString()} -{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium">
                            ${rental.totalPrice}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                rental.status === "active"
                                  ? "default"
                                  : rental.status === "completed"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {rental.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No bookings yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/cars">View All Cars</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/car-add")}
                >
                  Add New Vehicle
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                >
                  Manage Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}