import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import TextLoader from "../component/common/TextLoader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("submitting");
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log(response);
      if (!response.ok) {
        setLoading(false);
      setMessage(data.message || "Login failed");
      return;
    }
    
//   if (response.status === 403) {
//   navigate("/verify-email", {
//     state: {
//       email: data.email,
//     },
//   });
//   return;
// }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setLoading(false);
        setMessage("✅ Logged in successfully!");
        const token = localStorage.getItem("token");
        localStorage.setItem("userId",data.user.id);
        navigate(`/creategoal`)
      } else {
        setLoading(false);
        setMessage(`❌ ${data.message} || Login failed!`);
      }
    } catch (err) {
      if(!navigator.onLine){
        setLoading(false);
        setMessage("🌐 Please connect to the internet.");
      }
      else {
      setLoading(false);
      setMessage("Something went wrong. Please try again.");
    }
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-6">
          Jump to your success journey
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-l font-medium">Email</label>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <label className="block mb-l font-medium">Password</label>
          </div>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <br />
           {loading?<TextLoader text={message}/>:message}
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          if you have no account?
          <a href="/register" className="text-blue-500 ml-1 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

