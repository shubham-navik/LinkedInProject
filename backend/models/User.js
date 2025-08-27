// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true }, // hash with bcrypt if using auth
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
