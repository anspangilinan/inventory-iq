import mongoose from "mongoose";

const Reservation = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  quantity: {
    type: Number,
  },
  dateStart: {
    type: Date,
  },
  dateEnd: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  comments: [{ body: "string", by: mongoose.Schema.Types.ObjectId }],
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", Reservation);
