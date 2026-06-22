import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";

function VerifyEmail() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const email = state?.email || "";

  const [otp,setOtp] = useState("");

  const [loading,setLoading] = useState(false);

  const [message,setMessage] = useState("");

  const verifyOTP = async(e)=>{

    e.preventDefault();

    setLoading(true);

    try{

      const res = await fetch(`${API_URL}/auth/verify-email`,{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email,
          otp
        })

      });

      const data = await res.json();

      if(!res.ok){

        setMessage(data.message);

        setLoading(false);

        return;

      }

      localStorage.setItem("token",data.token);

      navigate("/creategoal");

    }

    catch(err){

      setMessage("Unable to verify OTP.");

      setLoading(false);

    }

  }

  const resendOTP = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("📩 A new OTP has been sent to your email.");
  } catch (err) {
    alert("Unable to resend OTP.");
  }
};

  return(

<div className="min-h-screen flex justify-center items-center bg-gray-100">

<div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

<h1 className="text-3xl font-bold text-center">

Verify Email

</h1>

<p className="text-gray-500 text-center mt-2">

OTP sent to

</p>

<p className="font-semibold text-center">

{email}

</p>

<form
className="mt-8"
onSubmit={verifyOTP}
>

<input

type="text"

placeholder="Enter OTP"

value={otp}

onChange={(e)=>setOtp(e.target.value)}

className="w-full border rounded-lg px-4 py-3"

/>

<p className="mt-4 text-center text-red-500">

{message}

</p>

<button

className="w-full mt-5 bg-indigo-600 text-white rounded-lg py-3"

>

Verify

</button>
<p className="text-center mt-6">

Didn't receive the OTP?

<button

type="button"

className="text-indigo-600 ml-2"

onClick={resendOTP}

>

Resend OTP

</button>

</p>
</form>

</div>

</div>

  )

}

export default VerifyEmail;