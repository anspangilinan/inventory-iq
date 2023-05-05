import dbConnect from "../../../data/db";
import Equipment from "../../../data/models/equipment";
import EquipmentCategory from "../../../data/models/equipmentCategory";
import Reservation from "../../../data/models/reservation";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { equipmentSlug, startDate, endDate } = req.query;
        let equipment = await Equipment.findOne({
          slug: equipmentSlug,
        }).populate({ path: "category", model: "EquipmentCategory" });

        if (startDate != undefined && endDate != undefined) {
          const dateStart = new Date(startDate);
          const dateEnd = new Date(endDate);

          // find overlapping reservations and sum up
          // their quantities. we will subtract this
          // from equipment.availableItems that we return.
          const reservations = await Reservation.aggregate([
            {
              $match: {
                equipment: equipment._id,
                $or: [
                  {
                    dateEnd: { $gte: dateStart },
                    dateStart: { $lt: dateStart },
                  },
                  {
                    dateStart: { $gte: dateStart },
                    dateEnd: { $lte: dateEnd },
                  },
                  {
                    dateStart: { $lte: dateEnd },
                    dateEnd: { $gt: dateEnd },
                  },
                ],
                status: "approved",
              },
            },
            {
              $group: {
                _id: "$_id",
                totalQuantity: { $sum: "$quantity" },
              },
            },
          ]).exec();
          const totalQuantity = reservations[0]?.totalQuantity || 0;
          equipment.availableItems -= totalQuantity;
        }
        res.status(200).json({ success: true, data: equipment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        const { equipmentSlug } = req.query;
        const equipment = await Equipment.updateOne(
          { slug: equipmentSlug },
          { ...req.body }
        );
        console.log({ equipmentSlug }, req.body);
        res.status(201).json({ success: true, data: equipment });
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
