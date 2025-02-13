import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, email } = await req.json();
  if (!name || !email)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const newUser = await User.create({ name, email });
  return NextResponse.json(newUser, { status: 201 });
}

export async function PUT(req: Request) {
  await dbConnect();
  const { id, name, email } = await req.json();
  if (!id || (!name && !email))
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );
  return updatedUser
    ? NextResponse.json(updatedUser)
    : NextResponse.json({ message: "User not found" }, { status: 404 });
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ message: "Missing user ID" }, { status: 400 });

  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
