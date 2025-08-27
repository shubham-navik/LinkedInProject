const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
questions: [
  {
    questionId: { type: Number, required: true },
    selectedOption: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
  },
],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  weakAreas: [{ type: String }],
  difficulty: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);
