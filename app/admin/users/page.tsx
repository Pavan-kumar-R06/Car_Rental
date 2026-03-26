"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Single, consolidated Fetch function
  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching users from server...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      // ✅ Crucial: This stops the "Loading users..." message
      setLoading(false); 
    }
  };

  // ✅ UseEffect runs once on mount
  useEffect(() => {
    fetchUsers();
  }, []); 

  // ✅ Delete user via API and update local state
  const deleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state immediately for snappy UI
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete user from server.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

          <Card>
            <CardHeader>
              <CardTitle>Users List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-10 text-center">
                  <p className="animate-pulse text-muted-foreground">Loading users...</p>
                </div>
              ) : users.length > 0 ? (
                <div className="space-y-4">
                 {users.map((user) => (
  <div
    key={user._id}   // ✅ FIXED
    className="flex justify-between items-center border p-4 rounded-lg bg-card shadow-sm"
  >
    <div>
      <p className="font-semibold text-lg">{user.name}</p>
      <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
      <div className="flex gap-2 items-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
          user.role === 'admin' 
            ? 'bg-red-100 text-red-700 border border-red-200' 
            : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
          {user.role}
        </span>
      </div>
    </div>

    <Button
      variant="destructive"
      size="sm"
      className="hover:bg-red-600"
      onClick={() => deleteUser(user._id)}   // ✅ FIXED
    >
      Delete
    </Button>
  </div>
))}
                </div>
              ) : (
                <div className="py-10 text-center border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">No users found in the database.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}