

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddCarPage() {
  const router = useRouter();

  // ONLY state for what the user MUST provide
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload

    // Basic Validation: Ensure required fields aren't empty
    if (!form.name || !form.brand || !form.price) {
      alert("Please fill in Name, Brand, and Price!");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
     

      if (!res.ok) throw new Error("Server error");

      alert("Car added successfully");
      router.refresh(); 
      router.push("/cars");
    } catch (err) {
      console.error("FETCH ERROR:", err);
      alert("Failed to connect to backend");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-2xl font-bold mb-6">Add New Vehicle</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Required Fields */}
            <Input name="name" placeholder="Car Name *" required onChange={handleChange} />
            <Input name="brand" placeholder="Brand *" required onChange={handleChange} />
            <Input name="category" placeholder="Category (e.g. SUV, Luxury) *" required onChange={handleChange} />
            <Input name="price" type="number" placeholder="Price per day *" required onChange={handleChange} />
            
            {/* Optional Field (Backend will handle default if empty) */}
            <Input name="image" placeholder="Image URL (Optional)" onChange={handleChange} />

            <Button type="submit" className="mt-2">
              Add Vehicle
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}