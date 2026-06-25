import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

// Register User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
   console.log("REGISTER BODY", req.body);
    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
       
    // Create user
const otp = Math.floor(100000 + Math.random() * 900000).toString();

const user = await User.create({
    username,
    email,
    password,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
});

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log(token);
res.status(201).json({
  success: true,
  message: "User registered successfully",
  token,
  user: {
    id: user._id,
    username: user.username,
    email: user.email,
  },
});

  } catch (error) { 
    
     console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Please Sign In first.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};