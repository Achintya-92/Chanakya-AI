// import dotenv from "dotenv";
// dotenv.config();

// import { Resend } from "resend";
// import User from "../models/User.js";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const emailSend = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log(email);

//     const response = await resend.emails.send({
//       from: "onboarding@resend.dev", // Use this for testing
//       to: email,
//       subject: "Verify Email",
//       html: "<h1>Your OTP is 493821</h1>",
//     });

//     return res.status(200).json({
//       success: true,
//       response,
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const verifyOTP = async(req,res)=>{
   const {email,otp} = req.body;
   const user = await User.findOne({email});
      console.log(user.otp);
   if(!user){
      return res.status(404).json({
         message:"User not found"
      });
   }
   if(user.otp !== otp){
      return res.status(400).json({
         message:"Invalid OTP"
      });
   }

   if(user.otpExpiry < Date.now()){
      return res.status(400).json({
         message:"OTP expired"
      });
   }

   user.isVerified = true;
   user.otp = null;
   user.otpExpiry = null;

   await user.save();
   res.json({
      success:true,
      token
   });

}


export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your New OTP",
      html: `<h2>Your OTP is <b>${otp}</b></h2>
             <p>It expires in 10 minutes.</p>`,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};