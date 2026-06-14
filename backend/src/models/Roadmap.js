import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
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

    roadmap: [
      {
         type: mongoose.Schema.Types.Mixed,
        required:true,
      },
    ]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roadmap", roadmapSchema);