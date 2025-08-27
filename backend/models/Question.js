// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }], // [ "A", "B", "C", "D" ]
    correctAnswer: { type: Number, required: true }, // index of correct option
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    topic: { type: String, required: true }, // e.g. "Elasticity", "Market Structures"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
