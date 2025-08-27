const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },

  questions: [
    {
      questionId: { type: Number, required: true }, // use Number instead of ObjectId
      selectedOption: { type: Number },
      isCorrect: { type: Boolean },
    },
  ],
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  weakAreas: [String],
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", sessionSchema);
