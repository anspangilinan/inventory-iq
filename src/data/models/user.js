import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
  role: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email address.",
    ],
    required: [true, "Please provide an email address for this User."],
    maxlength: [60, "Email address cannot be more than 60 characters"],
    validator: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Your password must be at least 6 characters long"],
    select: false, //dont send back password after request
  },
  grade: {
    type: Number,
  },
  section: {
    type: String,
    maxlength: [60, "Section cannot be more than 60 characters"],
  },
});

// ENCRYPTION
async function preHookForAddress(_this) {
  console.log({ this: _this });
  if (_this.isModified("password")) {
    _this.password = await bcrypt.hash(_this.password, 10);
  }
}

User.pre("save", async function (next) {
  await preHookForAddress(this);
  next();
});

User.pre("updateOne", { document: true, query: false }, async function (next) {
  await preHookForAddress(this);
  next();
});

User.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", User);
