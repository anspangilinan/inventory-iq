import dbConnect from "../../data/lib/db";
import Equipment from "../../data/models/equipment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const Equipments = await Equipment.find({});
        res.status(200).json({ success: true, data: Equipments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const equipment = await Equipment.create(req.body);
        res.status(201).json({ success: true, data: equipment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
