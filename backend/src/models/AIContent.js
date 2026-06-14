import mongoose from "mongoose";

const aiContentSchema = new mongoose.Schema(
  {
    goalHash: {
      type: String,
      required: true,
      unique: true,
    },

    analysis: Object,
    roadmap: Array,
    system: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AIContent", aiContentSchema);