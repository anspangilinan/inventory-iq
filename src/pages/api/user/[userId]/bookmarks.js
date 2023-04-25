import dbConnect from "../../../../data/db";
import Bookmark from "../../../../data/models/bookmark";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const bookmarks = await Bookmark.find({ user: userId }).populate({
          path: "equipment",
          model: "Equipment",
          populate: {
            path: "category",
            model: "EquipmentCategory",
          },
        });
        res.status(200).json({ success: true, data: bookmarks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { userId } = req.query;
        const bookmark = await Bookmark.create({
          equipment: req.body.equipmentId,
          user: userId,
          quantity: req.body.quantity,
          dateCreated: Date(0),
          dateStart: new Date(req.body.startDate),
          dateEnd: new Date(req.body.endDate),
        });
        res.status(201).json({ success: true, data: bookmark });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
