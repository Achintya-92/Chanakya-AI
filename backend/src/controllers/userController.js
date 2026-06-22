import User from "../models/User.js";
import Goal from "../models/Goal.js";
import Feedback from "../models/Feedback.js";

export const getUserData =async (req,res)=>{
  async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id).select("-password");

    const goals = await Goal.findOne({
      userId: req.user.id,
    });
         
    const feedback = await Feedback.find({
        userId:req.user._id
    })

    res.json({
      success: true,
      user,
      goals,
      feedback
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}}

export const Sendfeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;

    if (!feedback || !rating) {
      return res.status(400).json({
        success: false,
        message: "Feedback and rating are required.",
      });
    }

    await Feedback.create({
      userId: req.user._id.toString(),
      feedback,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getFeedback=async (req,res)=>{
    try {
        const feedback = await Feedback.find({
        userId:req.user._id
    });
    if(feedback.length>0){
        res.status(201).send({
            success:true,
            feedback:feedback
        })
    }else{
        res.send(404).send({
            success:false,
            message:"Add feedback First!"
        })
    }
    }catch (error) {
        res.send(500).send({
            success:false,
            message:"Iternal Server Error."
        })
      console.error(error);
    }
}

export const updateUsername = async (req,res)=>{
  async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id).select("-password");

    const goals = await Goal.findOne({
      userId: req.user.id,
    });
         
    const feedback = await Feedback.find({
        userId:req.user._id
    })

    res.json({
      success: true,
      user,
      goals,
      feedback
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}}

export const updatePassword =async (req,res)=>{
  async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id).select("-password");

    const goals = await Goal.findOne({
      userId: req.user.id,
    });
         
    const feedback = await Feedback.find({
        userId:req.user._id
    })

    res.json({
      success: true,
      user,
      goals,
      feedback
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}}

