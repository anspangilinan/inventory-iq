import mongoose from "mongoose";

const Equipment = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this equipment."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", Equipment);
