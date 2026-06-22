import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import Navbar from "../component/common/InternalNavbar";
import GoalForm from "../component/Goal/GoalForm";
import GoalSection from "../component/Goal/GoalSection";
import ChatBox from "../component/common/ChatBox";
import TextLoader from "../component/common/TextLoader";
import MotivationCard from "./Motivation";

function CreateGoal() {
  const [goals, setGoals] = useState([]);
  const id = localStorage.getItem("userId");
 const [loading,setLoading]=useState(true);
 const [message,setMessage]=useState("")

 useEffect(() => {
  const fetchGoals = async () => {
    try {
      setLoading(true);
      setMessage("Loading goals");

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/goals/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to load goals");
      }
      setGoals(data.goals || []);
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

  fetchGoals();
}, []);

if(goals.length>0){

const todayGoals = goals.filter(
  goal => goal.goalType === "today"
);

const weeklyGoals = goals.filter(
  goal => goal.goalType === "weekly"
);

const monthlyGoals = goals.filter(
  goal => goal.goalType === "monthly"
);

const yearlyGoals = goals.filter(
  goal => goal.goalType === "yearly"
);

 const lifetimeGoals = goals.filter(
  goal => goal.goalType === "lifetime"
); 
   return (

  <>

    <Navbar/>
    <div className="max-w-4xl mx-auto text-center mb-4 px-4 mt-8">
  {/* Badge */}
  <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-4 py-2 mb-6">
    <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
    <span className="text-sm font-medium text-indigo-700">
      AI-Powered Goal Planning
    </span>
  </div>

  {/* Heading */}
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
    Let's Build Your{" "}
    <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
      Success Blueprint
    </span>
  </h1>

  {/* Description */}
  <p className="mt-6 text-lg md:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
    Describe your goal, current situation, and available time.
    <span className="font-semibold text-gray-800"> Chanakya AI </span>
    will generate a
    <span className="font-semibold text-indigo-600">
      {" "}personalized roadmap
    </span>
    , a
    <span className="font-semibold text-indigo-600">
      {" "}daily execution plan
    </span>
    , and
    <span className="font-semibold text-indigo-600">
      {" "}AI coaching
    </span>{" "}
    tailored specifically to help you achieve your goal faster.
  </p>

  {/* Bottom Decoration */}
  <div className="mt-8 flex justify-center">
    <div className="h-1 w-32 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500"></div>
  </div>
</div>
    <GoalForm/>
    <MotivationCard/>
    <div>
     {loading?<TextLoader text={message}/>:message}
    </div>
     <h1  className="text-4xl font-bold mt-4 mb-4 flex items-center justify-center">🎯Your Goals</h1>
      <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2 mb-6">
        <span className="h-2 w-2 rounded-full bg-green-700 animate-pulse"></span>
      <span  className="text-sm font-medium text-green-700">
        safe and secure
      </span>
      </div>
      </div> 
    <GoalSection
      title="Today's Goals"
      goals={todayGoals}
    />

    <GoalSection
      title="Weekly Goals"
      goals={weeklyGoals}
    />

    <GoalSection
      title="monthly Goals"
      goals={monthlyGoals}
    />

    <GoalSection
      title="Yearly Goals"
      goals={yearlyGoals}
    />

      <GoalSection
      title="Life time Goals"
      goals={lifetimeGoals}
    />
<div className="pt-4"> 
    <ChatBox/>
</div>
  </>
);
}
else{
   return (
  <>
    <Navbar />

    <GoalForm/>

<br />
<br />
<h2 className="p-4">Create goals still there No goal Exist!</h2>
    <ChatBox id={id}/>
  </>
);
}
}
export default CreateGoal;

   