import mongoose from "mongoose";
import { Category } from "../../../models/Category";
import { isAdmin } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  }else{
    return Response.json({});
  }
};

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  if (isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }
  return Response.json(true);
};

export const GET = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const categories = await Category.find();
  return Response.json(categories);
};

export const DELETE = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (isAdmin()) {
    await Category.findByIdAndDelete(_id);
  }
  return Response.json(true);
};
