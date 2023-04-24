import dbConnect from "../../data/lib/db";
import EquipmentCategory from "../../data/models/equipmentCategory";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const equipmentCategories = await EquipmentCategory.find({});
        res.status(200).json({ success: true, data: equipmentCategories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const equipmentCategory = await EquipmentCategory.create(req.body);
        res.status(201).json({ success: true, data: equipmentCategory });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
