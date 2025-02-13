"use client";
import { useEffect, useState } from "react";
import { IUser } from "../models/User";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl p-6 text-center bg-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to My Landing Page
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Build modern web apps effortlessly with Next.js and ShadCN.
        </p>
        <Button className="px-6 py-3 text-lg" variant="default">
          Get Started
        </Button>
      </Card>
    </main>
  );
}
