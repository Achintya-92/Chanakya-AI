import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
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
    date:{
        type:String,
     default:() => new Date().toISOString().split("T")[0]
    },
    action: {
      type: mongoose.Schema.Types.Mixed,
      required:true,
    },
    status:{
      type:String,
     enum: [
  "pending",
  "in_progress",
  "completed"
],
      default:"pending"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Action", actionSchema);