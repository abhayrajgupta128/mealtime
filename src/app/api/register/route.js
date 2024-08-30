import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  mongoose.connect(process.env.MONGO_URL);

  const body = await req.json();
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("password must be at least 5 characters");
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
};
