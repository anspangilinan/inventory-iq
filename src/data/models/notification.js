import mongoose from "mongoose";

const Notification = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: String,
    required: [true, "Notification.message is required"],
    maxlength: [255, "Email address cannot be more than 255 characters"],
  },
});

export default mongoose.models.Notification ||
  mongoose.model("Notification", Notification);
