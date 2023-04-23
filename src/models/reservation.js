import mongoose from "mongoose";

const Reservation = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this reservation."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  dateCreated: {
    type: Date,
  },
  comments: [{ body: "string", by: mongoose.Schema.Types.ObjectId }],
});

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", Reservation);
