import mongoose from "mongoose";

const feedbackSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    feedback:{
        type:String,
        default:"",
    },
    rating:{
        type:String,
        default:"0"
    }
})

export default mongoose.model("Feedback",feedbackSchema);
