import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const user = await User.create({
      username,
      email,
      password,
    });
 
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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
  console.log("hii");
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

const isMatch = await bcrypt.compare(
  password,
  user.password
)
console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    // Generate token
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
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.username,
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
