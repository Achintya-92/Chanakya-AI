import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import Navbar from "../component/common/InternalNavbar";
import GoalForm from "../component/Goal/GoalForm";
import GoalSection from "../component/Goal/GoalSection";
import ChatBox from "../component/common/ChatBox";
import TextLoader from "../component/common/TextLoader";

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

    <GoalForm/>
    <div>
     {loading?<TextLoader text={message}/>:message}
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

   