import dbConnect from "../../../../data/db";
import Bookmark from "../../../../data/models/bookmark";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { userId, equipmentId, categoryId } = req.query;
        const bookmarkQuery = {
          user: userId,
          $or: [
            {
              equipment: equipmentId,
            },
            {
              category: categoryId,
            },
          ],
        };
        const bookmarks = await Bookmark.findOne(bookmarkQuery)
          .populate({
            path: "equipment",
            model: "Equipment",
            populate: {
              path: "category",
              model: "EquipmentCategory",
            },
          })
          .populate({
            path: "category",
            model: "EquipmentCategory",
          });
        res.status(200).json({ success: true, data: bookmarks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
