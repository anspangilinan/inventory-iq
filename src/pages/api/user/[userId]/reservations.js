import dbConnect from "../../../../data/db";
import Reservation from "../../../../data/models/reservation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const reservations = await Reservation.find({ user: userId }).populate({
          path: "equipment",
          model: "Equipment",
          populate: {
            path: "category",
            model: "EquipmentCategory",
          },
        });
        res.status(200).json({ success: true, data: reservations });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { userId } = req.query;
        const reservation = await Reservation.create({
          equipment: req.body.equipmentId,
          user: userId,
          quantity: req.body.quantity,
          dateCreated: Date(0),
          dateStart: new Date(req.body.startDate),
          dateEnd: new Date(req.body.endDate),
        });
        res.status(201).json({ success: true, data: reservation });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}