"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { IUser } from "@/models/User";
export default function TodoPage() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async () => {
    if (!name || !email) return alert("Please fill in both fields");
    try {
      if (editId) {
        await axios.put("/api/users", { id: editId, name, email });
      } else {
        await axios.post("/api/users", { name, email });
      }
      setName("");
      setEmail("");
      setEditId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete("/api/users", { data: { id } });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user: IUser) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      {/* <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={() => setTasks([...tasks, task])}
            className="bg-blue-500 text-white"
          >
            Add
          </Button>
        </div>

        <CardContent>
          {tasks.map((t, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2"
            >
              <span>{t}</span>
              <Button
                onClick={() =>
                  setTasks(tasks.filter((_, index) => index !== i))
                }
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card> */}

      <Card className="w-full max-w-md p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-xl font-semibold text-center mb-4  text-gray-800">
          Example test
        </h2>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            placeholder="Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: "black" }}
          />
          <Input
            placeholder="Description"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ color: "black" }}
          />
          <Button onClick={addUser} className="bg-green-500 text-black">
            {editId ? "Update Task" : "Add Task"}
          </Button>
        </div>

        <CardContent>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-2 bg-gray-200 rounded mb-2 text-black"
              >
                <span>
                  {user.name} ({user.email})
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => editUser(user)}
                    className="bg-yellow-500 text-black"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-black"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No users found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
