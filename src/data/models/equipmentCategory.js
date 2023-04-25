import mongoose from "mongoose";

const EquipmentCategory = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this equipment category."],
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
  slug: {
    type: String,
    required: [true, "Please provide a slug for this equipment category."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  icon: {
    type: String,
    description: "FontAwesome icon identifier",
  },
});

export default mongoose.models.EquipmentCategory ||
  mongoose.model("EquipmentCategory", EquipmentCategory);
