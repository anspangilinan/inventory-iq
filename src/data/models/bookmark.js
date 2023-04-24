import mongoose from "mongoose";

const Bookmark = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this bookmark."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

export default mongoose.models.Bookmark || mongoose.model("Bookmark", Bookmark);