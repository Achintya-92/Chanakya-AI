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
  const [todo,setTodo]=useState(null);
  const token = localStorage.getItem("token");
  const [loading,setLoading] =useState(true); 
  const [message,setMessage]=useState("");

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
    setTodo(data?.todos?.[0]?.todo);
  localStorage.setItem("todo",true);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(()=>{
  fetchTodo();
  },[id])
  console.log(todo);

 if (loading) {
  const msg=message||"Loading Todos";
  return (
    <>
      <LoaderCard message={msg} />
    </>
  );
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