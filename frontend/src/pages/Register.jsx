import { useState } from "react";
import { API_URL } from "../config/api";
import {useNavigate} from "react-router-dom"
function Register() {
    const [username,setUsername] =useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
       e.preventDefault();
      try{
      const response=await fetch(`${API_URL}/auth/register`,{
         method:"POST",
     headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
           localStorage.setItem("token", data.token); 
           localStorage.setItem("userId",data.user.id)
           console.log(data.token);
        setMessage("Registered successfully!");
        navigate(`/creategoal`)
      } else {
        setMessage(`${data.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

    return (  
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">
            Create Account 
          </h1>
          <p className="text-center text-gray-500 mb-6">
               Sign up to get started
          </p>

       <form className="space-y-4"  onSubmit={handleSubmit}>
        <div>
          <label className="block mb-l font-medium">
            Full Name
          </label>
        </div>
        <input    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
         type="text"
          name="username" 
          id="username"
           onChange={(e)=>{setUsername(e.target.value)}} />
         <div>
          <label className="block mb-l font-medium">
            Email
          </label>
         </div>
        <input 
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
        type="email" name="email" id="email"  onChange={(e)=>{setEmail(e.target.value)}}  />
        <div>
          <label className="block mb-l font-medium">
           Create Password
          </label>
        </div>
        <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
        type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}  />

        <br />
        <p className="text-red-500">{message}</p>
        <br />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
       </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <a href="/login" className="text-blue-500 ml-1 font-medium">
            Login
          </a>
        </p>
         </div>
       </div> 
    );
}

export default Register;
