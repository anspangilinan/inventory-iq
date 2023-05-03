import dbConnect from "../../../../data/db";
import User from "@/data/models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "PATCH":
      try {
        const { userId } = req.query;
        const user = await User.updateOne({ _id: userId }, { ...req.body });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
