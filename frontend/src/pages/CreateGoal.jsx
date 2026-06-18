import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config/api";
import Navbar from "../component/common/InternalNavbar";
import GoalForm from "../component/Goal/GoalForm";
import GoalSection from "../component/Goal/GoalSection";
import ChatBox from "../component/common/ChatBox";

function CreateGoal() {
  const {id} = useParams();
  const [goals, setGoals] = useState([]);
     
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGoals(data.goal))
      .catch((err) => console.error(err));
  }, []);

if(goals){

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

    <Navbar userId={id}/>

    <GoalForm/>

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
    <ChatBox/>
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
<h2>Create goals still there No goal Exist!</h2>
    <ChatBox data={roadmap} id={id}/>
  </>
);
}
}
export default CreateGoal;

   