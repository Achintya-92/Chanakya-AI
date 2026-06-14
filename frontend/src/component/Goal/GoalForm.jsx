import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";

function GoalForm() {
     const { id } = useParams();
     const [title,setTitle] = useState("")
     const [description,setDescription] = useState("")
     const [age,setAge] = useState(null)
     const [currentState,setState] = useState("")
     const [availableTime,setAvailableTime] = useState("")
     const [message,setMessage]=useState("");
     const token = localStorage.getItem("token");
     const navigate = useNavigate();
     const [userData, setUserData] = useState([]);
      const [ goalType,setType] = useState("");


     const handleSubmit = async (e)=>{
                   e.preventDefault();
                 try{
                 const response=await fetch(`${API_URL}/goals/`
                   ,{
                    method:"POST",
                    headers: {
                         "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                            },
                    body: JSON.stringify({title,goalType,description,age,currentState,availableTime}),
                 });
           
                 const data = await response.json();
                 if (response.ok) {
                    setMessage("✅ Goal created successfully!");
                 } else {
                   setMessage(`❌ ${data.message}`);
                 }
               } catch (err) {
                 console.log(err);
                   setMessage(err.message);
               }
            }
        

    return ( 
  <div className="min-h-screen bg-slate-50">

  <div className="max-w-7xl mx-auto px-4 py-10">

<div className="text-center mb-12">
  <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
    Build Your Goal System 🚀
  </h1>

  <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
    Enter your goal and let Lakshya generate
    a roadmap, systems, habits and action plan.
  </p>
</div>
{/* Form section */}
<div className="grid lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm">
        <form className="space-x-4" onSubmit={handleSubmit}>
            <div>
                <label className="block mb-l font-medium">Enter type of goal</label>
            </div>
           <select
  onChange={(e) =>
    setType(e.target.value)
  }
>
  <option value="today">Today</option>

  <option value="weekly">Weekly</option>

  <option value="monthly">
    Monthly
  </option>

  <option value="yearly">
    Yearly
  </option>
    <option value="lifetime">
    Lifetime
  </option>
</select>
               <div>
                <label className="block mb-l font-medium">title</label>
            </div>
            <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
             type="text"  name="title" id="title" onChange={(e)=>{setTitle(e.target.value)}}></input>
               <div>
                <label className="block mb-l font-medium">Describe goal</label>
            </div>
            <textarea
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
             type="text"  name="description" id="description" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <div>
                <label className="block mb-l font-medium">Age</label>
            </div>
            <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
             type="number"  name="age" id="age" onChange={(e)=>{setAge(e.target.value)}} ></input> 
            <div>
                <label className="block mb-l font-medium">What is your CurrentState</label>
            </div>
            <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
             type="text"  name="currentState" id="currentState" placeholder="Like i am in 12th.."  onChange={(e)=>{setState(e.target.value)}}></input>
             <div >
                <label className="block mb-l font-medium">How many time available!</label>
            </div>
            <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            type="date"  name="available" id="available" placeholder="want to achieve goal in 5 year.."  onChange={(e)=>{setAvailableTime(e.target.value)}}></input>

             <br />
       {message && (
  <div className="mt-4 p-3 rounded-xl bg-green-50 text-green-700">
    {message}
  </div>
)}
        <br />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Submit</button>
        </form>
        </div>
        </div>
  </div>
</div>
     );
}

export default GoalForm;

   