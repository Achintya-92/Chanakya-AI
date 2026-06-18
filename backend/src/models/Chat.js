import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default:null
    },
    chat: {
          type: mongoose.Schema.Types.Mixed,
          required:true,
        }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);