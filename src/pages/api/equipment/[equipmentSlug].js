import dbConnect from "../../../data/db";
import Equipment from "../../../data/models/equipment";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { equipmentSlug } = req.query;
        const equipment = await Equipment.findOne({
          slug: equipmentSlug,
        }).populate({ path: "category", model: "EquipmentCategory" });
        res.status(200).json({ success: true, data: equipment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}