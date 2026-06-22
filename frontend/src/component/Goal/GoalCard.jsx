import {useNavigate} from "react-router-dom";
import { API_URL } from "../../config/api";
import { useState } from "react";
import TextLoader from "../common/TextLoader";

function GoalCard({goal,index}) {
  const navigate = useNavigate();
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const token=localStorage.getItem("token");

   const handelDelete=async ()=>{
  //  let ans = prompt("Realy want to delete!.write goal title.");
    setLoading(true);
    setMessage("deleting goal.");
    try{
  const res = await  fetch(`${API_URL}/goals/goal/delete/${goal._id}`,{
      method :"delete",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
      const data = res.json();
      console.log(res);
   if (!res.ok) {
        throw new Error(data.message || "Failed to load goals");
      }

       if(res.ok){
        setLoading(false);
        setMessage("goal Deleted successfully!")
        navigate("/creategoal");
      }

      setMessage(" ");
    } catch (err) {
      console.error(err);
      if (!navigator.onLine) {
        setLoading(false);
        setMessage("🌐 Please connect to the internet.");
      } else {
        setLoading(false);
        setMessage(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


   
    return ( 
        <div className="
 bg-white
 rounded-2xl
 p-6
 shadow-md
 hover:shadow-xl
 transition
 cursor-pointer
 m-2
">
  <h3 className="text-xl font-bold">
   {index+1}. {goal.title}
  </h3>

 <div className="mt-2 mb-2">
      <span className="
      bg-red-200
      text-red-700
      px-3
      py-1
      rounded-full
      text-sm
    ">
      {goal.fireLine || "since I want to become"}
    </span>
 </div>
  <p className="text-gray-600 mt-3">
    {goal.description}
  </p>


  <div className="mt-4">
    <span className="
      bg-blue-100
      text-blue-700
      px-3
      py-1
      rounded-full
      text-sm
    ">
      {goal.currentState}
    </span>
    <div className="mx-auto flex flex-wrap  col-span-1 md:col-span-2 m-4 pl-8 bg-gray-100 gap-4">
      <button className="p-2 hover:bg-blue-400 rounded-xl p-4" onClick={()=>navigate(`/todo/${goal._id}`)} >Todo</button>
      <button className="p-2 hover:bg-orange-400 rounded-xl" onClick={()=>navigate(`/roadmap/${goal._id}`)} >Roadmap</button>
      <button className="p-2 hover:bg-yellow-400 rounded-xl" onClick={()=>navigate(`/system/${goal._id}`)} >System</button>
      <button className="p-2 hover:bg-green-400 rounded-xl" onClick={()=>navigate(`/action/${goal._id}`)} >Today Action</button>
      <div className="mt-4 mb-4">
        {loading?<TextLoader text={message}/>:message}
      </div>
    </div>
    <div className="flex flex-wrap bg-slate-100  gap-12">
        <button className="p-2 text-yellow-500 hover:bg-yellow-200 rounded-xl" onClick={()=>navigate(`/update/${goal._id}`)} >Update</button>
    <button className="p-2 text-red-300 hover:bg-red-200 rounded-xl" onClick={handelDelete} >Delete</button>
    </div>
  </div>
</div>
     );
}

export default GoalCard;