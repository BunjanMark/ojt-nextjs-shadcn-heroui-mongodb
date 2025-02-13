"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Task {
  _id: string;
  task: string;
  description: string;
}

export default function TaskCard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ task: "", description: "" });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const handleCreateTask = async () => {
    if (!newTask.task || !newTask.description)
      return alert("Fields are required");

    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setNewTask({ task: "", description: "" });
      fetchTasks();
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    const res = await fetch(`/api/tasks`, {
      method: "PUT",
      body: JSON.stringify(editingTask),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setEditingTask(null);
      fetchTasks();
    }
  };

  const handleDeleteTask = async (_id: string) => {
    const res = await fetch(`/api/tasks`, {
      method: "DELETE",
      body: JSON.stringify({ id: _id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      fetchTasks();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* New Task Form */}
      <Card className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Add Task</h2>
        <Input
          placeholder="Task Title"
          value={newTask.task}
          onChange={(e: any) =>
            setNewTask({ ...newTask, task: e.target.value })
          }
        />
        <Textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e: any) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <Button onClick={handleCreateTask}>Add Task</Button>
      </Card>

      {/* Task List */}
      {tasks.map((task) => (
        <Card key={task._id} className="p-4 space-y-4">
          {editingTask?._id === task._id ? (
            // Edit Mode
            <>
              <Input
                value={editingTask.task}
                onChange={(e: any) =>
                  setEditingTask({ ...editingTask, task: e.target.value })
                }
              />
              <Textarea
                value={editingTask.description}
                onChange={(e: any) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
              />
              <Button onClick={handleUpdateTask}>Save</Button>
              <Button variant="outline" onClick={() => setEditingTask(null)}>
                Cancel
              </Button>
            </>
          ) : (
            // View Mode
            <>
              <h3 className="text-lg font-bold">{task.task}</h3>
              <p>{task.description}</p>
              <Button onClick={() => setEditingTask(task)}>Edit</Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </Button>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}
