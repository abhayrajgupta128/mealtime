import mongoose from "mongoose";
import { MenuItem } from "../../../models/MenuItem";
import { isAdmin } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  if (await isAdmin()) {
    const menuItemDoc = await MenuItem.create(data);
    return Response.json(menuItemDoc);
  } else {
    return Response.json({});
  }
};

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
};

export const GET = async () => {
  mongoose.connect(process.env.MONGO_URL);
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
};

export const DELETE = async (req) => {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  if (await isAdmin()) {
    await MenuItem.findByIdAndDelete(_id);
  }
  return Response.json(true);
};
