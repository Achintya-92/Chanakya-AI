import AnalysisSection from "./AnalysisSection";
import TaskSection from "./TaskSection";
import MilestoneSection from "./MilestoneSection";
import Navbar from "../common/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";

export default function TodoSection() {
  const {id} =useParams();
  const [todo,setTodo]=useState("");
  const token = localStorage.getItem("token");

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
  
  if (!todo) {
  return <h1>Loading...</h1>;
}
  return (
    <div className="space-y-8">
       <Navbar/>
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

    </div>
  );
}