"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // 1. Ensure 'image' is in the initial state
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Car not found");
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || "",
          brand: data.brand || "",
          category: data.category || "",
          price: data.price ? data.price.toString() : "",
          image: data.image || "", // 2. Fill the image field from the database
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

 
const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...form, 
        price: Number(form.price) 
      }),
    });

    if (res.ok) {
      alert("Changes saved to MongoDB!");
      router.push(`/cars/${id}`);
      router.refresh(); // ✅ Forces Next.js to show the new data immediately
    } else {
      const errData = await res.json();
      alert(`Error: ${errData.error}`);
    }
  } catch (err) {
    alert("Network error: Could not save changes.");
  }
};
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this vehicle?");
    if (!confirmDelete) return;

    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Vehicle removed from fleet.");
        router.push("/cars");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.error);
      }
    } catch (err) {
      alert("Could not connect to server to delete.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto py-10 max-w-lg flex-1">
        <h1 className="text-2xl font-bold mb-6">Edit Vehicle</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label>Car Name</Label>
            <Input 
              value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} 
              required 
            />
          </div>
          <div>
            <Label>Brand</Label>
            <Input 
              value={form.brand} 
              onChange={e => setForm({...form, brand: e.target.value})} 
              required 
            />
          </div>
          <div>
            <Label>Price per Day</Label>
            <Input 
              type="number" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
              required 
            />
          </div>

          {/* 3. Added Image URL Input Field */}
          <div>
            <Label>Image URL</Label>
            <Input 
              type="text" 
              placeholder="e.g. /cars/tesla.jpg or https://image.com/car.jpg"
              value={form.image} 
              onChange={e => setForm({...form, image: e.target.value})} 
              required 
            />
            {form.image && (
              <p className="text-[10px] text-muted-foreground mt-1 truncate">
                Current path: {form.image}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button type="submit" className="w-full">Save Changes</Button>
            
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete} 
              className="w-full"
            >
              Delete Vehicle
            </Button>

            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()} 
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}