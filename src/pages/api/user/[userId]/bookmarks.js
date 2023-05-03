import dbConnect from "../../../../data/db";
import Bookmark from "../../../../data/models/bookmark";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const bookmarks = await Bookmark.find()
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
    case "POST":
      try {
        const { userId } = req.query;
        const bookmarkQuery = {
          user: userId,
          $or: [
            {
              equipment: req.body.equipmentId,
            },
            {
              category: req.body.categoryId,
            },
          ],
        };
        const bookmarks = await Bookmark.find(bookmarkQuery);
        if (bookmarks.length > 0) {
          await Bookmark.deleteMany(bookmarkQuery);
          res.status(201).json({ result: "removed from bookmarks" });
        } else {
          await Bookmark.create({
            equipment: req.body.equipmentId,
            category: req.body.categoryId,
            user: userId,
          });
          res.status(201).json({ result: "added to bookmarks" });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
