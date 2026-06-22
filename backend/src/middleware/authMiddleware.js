import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";


export const protect = async (req, res, next) => {
  try {
    let token;

    // Bearer Token Check
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // User Find
    req.user = await User.findById(decoded.id).select("-password");
    
    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


export const verify =
  [
    body("username")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),

    body("email")
    .trim()
    .isLowercase()
    .withMessage("All letters must be in lowercase")
    .isEmail()
    .withMessage("Invalid email address"),

    body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one digit")
        .matches(/[!@#$%^&*]/).withMessage("Password must contain at least one Special character"),

(req, res,next) => {
    
    const errors = validationResult(req);

if (!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        field: errors.array()[0].path
    });
}

next();
}
];