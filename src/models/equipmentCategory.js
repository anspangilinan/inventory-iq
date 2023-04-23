import mongoose from "mongoose";

const EquipmentCategory = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this equipment category."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.EquipmentCategory ||
  mongoose.model("EquipmentCategory", EquipmentCategory);
