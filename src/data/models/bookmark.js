import mongoose from "mongoose";

const Bookmark = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  dateCreated: {
    type: Date,
  },
  comments: [{ body: "string" }],
});

export default mongoose.models.Bookmark || mongoose.model("Bookmark", Bookmark);
