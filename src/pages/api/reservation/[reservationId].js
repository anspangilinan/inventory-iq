import dbConnect from "../../.../../../data/db";
import Reservation from "../../.../../../data/models/reservation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { reservationId } = req.query;
        const reservation = await Reservation.findOne({
          _id: reservationId,
        }).populate({
          path: "equipment",
          model: "Equipment",
          populate: {
            path: "category",
            model: "EquipmentCategory",
          },
        });
        res.status(200).json({ success: true, data: reservation });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
