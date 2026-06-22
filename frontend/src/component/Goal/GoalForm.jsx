import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import TextLoader from "../common/TextLoader";

function GoalForm() {
     const { id } = useParams();
     const [title,setTitle] = useState("")
     const [description,setDescription] = useState("")
     const [age,setAge] = useState(null)
     const [currentState,setState] = useState("")
     const [fireLine,setFireLine] = useState("")
     const [availableTime,setAvailableTime] = useState("")
     const [message,setMessage]=useState("");
     const token = localStorage.getItem("token");
     const navigate = useNavigate();
     const [userData, setUserData] = useState([]);
     const [ goalType,setType] = useState("");
const [Loading,setLoading] = useState(false);

const handleSubmit = async (e)=>{
                e.preventDefault();
                setLoading(true);
                setMessage("wait");
                 try{
                 const response=await fetch(`${API_URL}/goals/`
                   ,{
                    method:"POST",
                    headers: {
                         "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                            },
                    body: JSON.stringify({title,goalType,description,age,fireLine,currentState,availableTime}),
                 });
           
                 const data = await response.json();
                 if (response.ok) {
                    setLoading(false);
                    setMessage("✅ Goal created successfully!");
                 } else {
                   setMessage(`❌ ${data.message}`);
                 }
               } catch (err) {
                 console.log(err);
                  setLoading(false);
                   setMessage(err.message);

               }
            }
        

    return ( 
  <div className="min-h-screen mx-auto bg-slate-50">

  <div className="mb-[-200px] max-w-7xl mx-auto px-16 py-10 md:ml-64">

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
            
            <div className="mt-2 mb-2">
            <label className="block mb-l font-medium">Write your Fire Line.</label>
            </div>
            <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 mb-4"
             type="text"  name="fireline" id="fireline" placeholder="Why you want to achieve. like i want go out from rat race.."  onChange={(e)=>{setFireline(e.target.value)}}></input>
 <div >
                <label className="block mb-l font-medium">How many time available!</label>
            </div>
            <input
         className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
            type="date"  name="available" id="available" placeholder="want to achieve goal in 5 year.."  onChange={(e)=>{setAvailableTime(e.target.value)}}></input>

             <br />
       {Loading?<TextLoader text={message}/>:message}
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

   