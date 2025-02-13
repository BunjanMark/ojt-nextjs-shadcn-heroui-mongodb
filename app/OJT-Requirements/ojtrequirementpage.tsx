"use client";
import { useEffect, useState } from "react";
import { IUser } from "@/models/User";

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
