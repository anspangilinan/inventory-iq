import mongoose from "mongoose";

const Reservation = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", Reservation);
