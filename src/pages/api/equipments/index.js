import dbConnect from "../../../data/db";
import Equipment from "../../../data/models/equipment";
import EquipmentCategory from "../../../data/models/equipmentCategory";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const equipments = await Equipment.find().populate({
          path: "category",
          model: "EquipmentCategory",
        });
        res.status(200).json({ success: true, data: equipments });
      } catch (error) {
        console.log({ error });
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
