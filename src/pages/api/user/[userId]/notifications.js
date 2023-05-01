import dbConnect from "../../../../data/db";
import Notification from "../../../../data/models/notification";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const notifications = await Notification.find({ recipient: userId })
          .populate({
            path: "reservation",
            model: "Reservation",
            populate: {
              path: "equipment",
              model: "Equipment",
              populate: {
                path: "category",
                model: "EquipmentCategory",
              },
            },
          })
          .populate({
            path: "recipient",
            model: "User",
          });
        res.status(200).json({ success: true, data: notifications });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
