import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    todo: {
      type: mongoose.Schema.Types.Mixed,
      required:true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);