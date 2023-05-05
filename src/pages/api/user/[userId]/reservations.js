import dbConnect from "../../../../data/db";
import Reservation from "../../../../data/models/reservation";
import User from "@/data/models/user";
import Notification from "@/data/models/notification";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId, equipmentId } = req.query;
        const query = {
          user: userId,
          ...(equipmentId && { equipment: equipmentId }),
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
        const cursor = User.find({ role: "admin" }).cursor();
        for (
          let superAdmin = await cursor.next();
          superAdmin != null;
          superAdmin = await cursor.next()
        ) {
          await Notification.create({
            recipient: superAdmin._id,
            reservation: reservation._id,
            message: `A new reservation has been requested`,
          });
        }
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
