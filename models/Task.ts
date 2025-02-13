import mongoose, { Schema, Document, model, models } from "mongoose";

// Define TypeScript interface for Task
export interface ITask extends Document {
  _id: string;
  task: string;
  description: string;
}

// Define Task Schema
const TaskSchema = new Schema<ITask>(
  {
    _id: { type: String, required: true, unique: true, auto: true },
    task: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Use existing model if available, otherwise create a new one
const Task = models.Task || model<ITask>("Task", TaskSchema);

export default Task;
