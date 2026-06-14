import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

     goalType: {
  type: String,
  enum: [
    "daily",
    "weekly",
    "monthly",
    "yearly",
    "lifetime"
  ]
  ,    required: true,
}
,
    description: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    currentState: {
      type: String,
      required: true,
    },

    availableTime: {
      type: String,
      required: true,
    },

    analysis: {
      difficulty: String,
      timeline: String,
      requirements: [String],
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Goal", goalSchema);