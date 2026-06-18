import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import TodoSection from "../component/Todo/TodoSection";
import RoadmapSection from "../component/Roadmap/RoadmapSection";
import SystemSection from "../component/System/SystemSection";

function Dashboard() {
  const { id } = useParams();
  const [goalData, setGoal] = useState(null);
  const [roadmap, setRoadmap] = useState("");
  const [todo, setTodo] = useState("");
  const [system, setSystem] = useState("");
useEffect(() => {
  const token = localStorage.getItem("token");

  const fetchGoal = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // console.log(data);
      setGoal(data.goal);
    } catch (error) {
      console.log(error);
    }
  };

 

   const fetchRoadmap = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/roadmap/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

       const data = await response.json();
       const roadmapJson = JSON.parse(data.roadmap[0].roadmap);
       console.log(roadmapJson);
    setRoadmap(
      roadmapJson
    );
     } catch (error) {
      console.log(error);
    }
  };

   const fetchSystem = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/system/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
          console.log(data);
      setSystem(data?.system
      ? JSON.parse(data.system)
      :null);
      
    } catch (error) {
      console.log(error);
    }
  };

  // fetchGoal();
  // fetchTodo();
  // console.log(todo);
  fetchRoadmap();
console.log(roadmap);
  // console.log(goalData)
  // console.log(todo);
  // fetchSystem();
}, [id]);


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* goal sectiom */}
      {/* <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div
            key={goalData._id}
            className="bg-indigo-600 text-white rounded-3xl px-6 py-12"
          >
            <h2 className="text-3xl font-bold text-slate-900">
              {" "}
              {goalData.title}
            </h2>
            <p className="mt-5 text-white-600 leading-8">
              {goalData.description}
            </p>
            <p className="mt-5 text-white-600 leading-8">
              {goalData.currentState}
              <button>Change</button>
            </p>
            <br />
            <p className="mt-5 text-white-600 leading-8">
              {goalData.availableTime}
            </p>
            <br />
            <p className="mt-5 text-white-600 leading-8">
              {goalData.updatedAt}
            </p>
          </div>
        </div>
      </section> */}

      {/* Todo section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
         {
          // todo && <TodoSection todo={todo}/>
         }
        </div>
      </section>

      {/* Roadmap */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
        {
          roadmap && <RoadmapSection roadmap={roadmap}/>
        }
        </div>
      </section>
      
      {/* System section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-10 shadow-sm">
         {/* {system && <SystemSection system={system} />} */}
        </div>
      </section>

    </div>
  );
}

export default Dashboard;
