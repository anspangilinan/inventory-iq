import mongoose from "mongoose";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name for this User."],
    maxlength: [60, "First name cannot be more than 60 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a first name for this User."],
    maxlength: [60, "Last name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email address.",
    ],
    required: [true, "Please provide an email address for this User."],
    maxlength: [60, "Email address cannot be more than 60 characters"],
  },
  grade: {
    type: Number,
    required: [true, "Grade is required."],
  },
  section: {
    type: String,
    required: [true, "Please provide section for this User."],
    maxlength: [60, "Section cannot be more than 60 characters"],
  },
});

export default mongoose.models.User || mongoose.model("User", User);
