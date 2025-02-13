import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const tasks = await Task.find({});
      return res.status(200).json(tasks);
    }
    case "POST": {
      const { task, description } = req.body;
      if (!task || !description)
        return res.status(400).json({ message: "Missing fields" });

      const newTask = await Task.create({ task, description });
      return res.status(201).json(newTask);
    }
    case "PUT": {
      const { id, task, description } = req.body;
      if (!id) return res.status(400).json({ message: "Missing ID" });

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { task, description },
        { new: true }
      );
      return res.status(200).json(updatedTask);
    }
    case "DELETE": {
      const { id } = req.body;
      if (!id) return res.status(400).json({ message: "Missing ID" });

      await Task.findByIdAndDelete(id);
      return res.status(200).json({ message: "Task deleted" });
    }
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
