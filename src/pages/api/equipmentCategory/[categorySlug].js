import dbConnect from "../../../data/db";
import Equipment from "../../../data/models/equipment";
import EquipmentCategory from "../../../data/models/equipmentCategory";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { categorySlug } = req.query;
        const category = await EquipmentCategory.findOne({
          slug: categorySlug,
        });
        const equipments = await Equipment.find({ category });
        res.status(200).json({ success: true, data: equipments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const equipmentCategory = await Equipment.create(req.body);
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
