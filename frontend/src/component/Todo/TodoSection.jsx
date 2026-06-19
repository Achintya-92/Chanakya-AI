import AnalysisSection from "./AnalysisSection";
import TaskSection from "./TaskSection";
import MilestoneSection from "./MilestoneSection";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import  ChatBox from "../common/ChatBox";
import InternalNavbar from "../common/InternalNavbar";
import LoaderCard from "../common/Loader";

export default function TodoSection() {
  const {id} =useParams();
  console.log(id);
  const [todo,setTodo]=useState("");
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState([]);
  const [loaded,setLoaded] =useState(false); 
  const [message,setMessage]=useState("");

  
  useEffect(() => {
    if(!loaded){
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>{ setGoals(data?.goal), data.success ? setLoaded(true):setLoaded(false) })
      .catch((err) => {console.error(err); setMessage(err);});
  }else{
     if(message){
return(
      <LoaderCard message={message}/>
)
      }
      <LoaderCard message="Creating Todos for you!"/>
  }
  }, [id]);

 function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON found");
  }

  return JSON.parse(match[0]);
}

   const fetchTodo = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/todo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUserId(data?.todos[0]?.userId);
      const todoJson = extractJson(data?.todos[0]?.todo);
      console.log(todoJson);
     setTodo(todoJson || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
  fetchTodo();
  },[id])
  
  if(userId){
    localStorage.setItem("userId",userId);
  }
  if (!todo && loaded) {
  return <><InternalNavbar/><h1 className="p-8">Loading Todos...</h1></>;
}
  return (
    <div className="space-y-8">
      <InternalNavbar/>
      <AnalysisSection
        analysis={todo.analysis}
      />

      <TaskSection
        title="🔥 Daily Tasks"
        tasks={todo.dailyTasks}
      />

      <TaskSection
        title="📅 Weekly Tasks"
        tasks={todo.weeklyTasks}
      />
          <MilestoneSection
        milestones={todo.milestones}
      />

    <ChatBox data={todo} id={id}/>
    </div>
  );
}