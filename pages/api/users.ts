import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";

type ResponseData = IUser | IUser[] | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();

  switch (req.method) {
    case "GET": {
      // Fetch all users
      const users = await User.find({});
      return res.status(200).json(users);
    }

    case "POST": {
      // Create a new user
      const { name, email } = req.body;
      if (!name || !email)
        return res.status(400).json({ message: "Missing name or email" });

      const newUser = await User.create({ name, email });
      return res.status(201).json(newUser);
    }

    case "PUT": {
      // Update a user
      const { id, name, email } = req.body;
      if (!id || (!name && !email))
        return res.status(400).json({ message: "Invalid request" });

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email },
        { new: true }
      );
      return updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(404).json({ message: "User not found" });
    }

    case "DELETE": {
      // Delete a user
      const { id } = req.body;
      if (!id) return res.status(400).json({ message: "Missing user ID" });

      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted" });
    }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
