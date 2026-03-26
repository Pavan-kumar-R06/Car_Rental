

"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Example fetch

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

// --- 1. DEFINE TYPES AT THE TOP LEVEL ---
export interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface Rental {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "active" | "completed" | "cancelled";
}

interface AuthContextType {
  user: User | null;
  rentals: Rental[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  addRental: (rental: Omit<Rental, "id">) => Promise<void>;
  cancelRental: (rentalId: string) => void;
}

// --- 2. INITIALIZE CONTEXT ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [rentals, setRentals] = useState<Rental[]>([]);

  // Function to sync user data with server
  const refreshUser = useCallback(async () => {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    setUser(null);   // ✅ clear if no session
    return;
  }

  try {
    const res = await fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${sessionId}` }
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      // ✅ session invalid → clear everything
      localStorage.removeItem("sessionId");
      setUser(null);
      setRentals([]);
    }
  } catch (err) {
    console.error("Auth sync error:", err);
  }
}, []);
  
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
  localStorage.setItem("sessionId", data.sessionId);
  setUser(data.user);
  return true;
} else {
  localStorage.removeItem("sessionId"); // ✅ clear bad session
  setUser(null);
  return false;
}
    } catch (err) {
      return false;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("sessionId", data.sessionId);
        setUser(data.user);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }, []);

 // You'll need to import useRouter inside your AuthProvider or 
// handle the redirect in the component that calls logout.

const logout = useCallback(() => {
  localStorage.removeItem("sessionId");
  localStorage.removeItem("user");
  setUser(null);
  setRentals([]); // ✅ CRITICAL: Clear rentals so the next person doesn't see them
  
  // If you want a hard redirect to the login page:
  window.location.href = "/login"; 
}, []);


  const addRental = async (rentalData: any) => {
    try {
      
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalData),
      });
      const data = await response.json();
      if (data.success) {
        setRentals((prev) => [data.rental, ...prev]);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const cancelRental = useCallback((rentalId: string) => {
    setRentals((prev) =>
      prev.map((r) => (r.id === rentalId ? { ...r, status: "cancelled" as const } : r))
    );
  }, []);

  return (
    <AuthContext.Provider value={{ user, rentals, login, register, logout, refreshUser, addRental, cancelRental }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- 3. EXPORT HOOK ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}