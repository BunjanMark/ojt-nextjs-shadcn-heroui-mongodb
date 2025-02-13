import mongoose, { Schema, Document, model, models } from "mongoose";

// Define TypeScript interface for User
export interface IUser extends Document {
  name: string;
  email: string;
}

// Define User Schema
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Use existing model if available, otherwise create a new one
const User = models.User || model<IUser>("User", UserSchema);

export default User;
