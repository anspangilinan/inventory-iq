import dbConnect from "../../../data/db";
import Reservation from "@/data/models/reservation";
import Equipment from "@/data/models/equipment";
import EquipmentCategory from "@/data/models/equipmentCategory";
import User from "@/data/models/user";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const reservations = await Reservation.find()
          .populate({
            path: "equipment",
            model: "Equipment",
            populate: {
              path: "category",
              model: "EquipmentCategory",
            },
          })
          .populate({
            path: "user",
            model: "User",
          });
        res.status(200).json({ success: true, data: reservations });
        console.log({ reservations });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
