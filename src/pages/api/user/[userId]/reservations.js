import dbConnect from "../../../../data/db";
import Reservation from "../../../../data/models/reservation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId, equipmentId } = req.query;
        const query = {
          user: userId,
          ...(equipmentId && { equipmentId: equipmentId }),
        };
        const reservations = await Reservation.find(query)
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
      } catch (error) {
        console.log({ error });
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
