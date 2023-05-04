import mongoose from "mongoose";

const Equipment = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EquipmentCategory",
  },
  name: {
    type: String,
    required: [true, "Please provide a name for this equipment."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  slug: {
    type: String,
    required: [true, "Please provide a slug for this equipment."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [
      true,
      "Please provide a description for this equipment category.",
    ],
    maxlength: [360, "Name cannot be more than 60 characters"],
  },
  availableItems: {
    type: Number,
    required: [true, "Please provide a value for available items."],
  },
});

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", Equipment);
