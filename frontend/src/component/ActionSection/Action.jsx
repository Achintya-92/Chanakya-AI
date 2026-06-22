import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import InternalNavbar from "../common/InternalNavbar";
import LoaderCard from "../common/Loader";

export default function ActionPage() {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [actionData, setActionData] = useState(null);

  const [error, setError] = useState("");
  const  todo = localStorage.getItem("todo");
  const  system = localStorage.getItem("system");
  //-----------------------------------------
  // Fetch Today's Action
  //-----------------------------------------
  // if(!system || !todo){
  //   alert("Generate Todos and System First!");
  //   setTimeout(()=>{
  //     window.location.href='/creategoal';
  //   },3000);
  // }
const fetchTodayAction = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${API_URL}/actions/today`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goalId: id,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }
console.log(data);
setActionData(data.action.action);

  } catch (err) {
    console.log(err);
    setError("Unable to load today's action.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTodayAction();
  }, []);


  //-----------------------------------------
  // Update Status
  //-----------------------------------------

  const updateStatus = (index, value) => {
    const updated = { ...actionData };

    updated.actions[index].status = value;

    const allCompleted = updated.actions.every(
      (task) => task.status === "completed"
    );

    updated.overallStatus = allCompleted
      ? "completed"
      : "pending";

    setActionData(updated);
  };

  //-----------------------------------------
  // Progress
  //-----------------------------------------

  const completed =
    actionData?.actions.filter(
      (task) => task.status === "completed"
    ).length || 0;

  const total = actionData?.actions.length || 0;

  const progress =
    total === 0 ? 0 : (completed / total) * 100;


const generateTomorrowAction = async () => {
  try {

    const res = await fetch(`${API_URL}/actions/generatenext`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goalId: id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }
    fetchTodayAction();

  } catch (err) {
    console.log(err);
  }
};


  //-----------------------------------------
  // Submit
  //-----------------------------------------

  const handleSubmit = async () => {
  try {

    const res = await fetch(`${API_URL}/actions/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goalId: id,
        action: actionData,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Today's action saved successfully.");

    generateTomorrowAction();

  } catch (err) {
    console.log(err);
  }
};

  //-----------------------------------------

  if (loading)
    return <LoaderCard message="Loading Today's Action..." />;

  if (error)
    return (
      <>
        <InternalNavbar />

        <div className="text-center mt-20 text-red-500">
          {error}
        </div>
      </>
    );

  return (
    <>
      <InternalNavbar />

      <div className="min-h-screen bg-slate-100">
        <div className="max-w-5xl mx-auto py-10 px-5">
                    {/* Heading */}

          <div className="bg-white rounded-xl shadow p-6">

            <h1 className="text-3xl font-bold">

              {actionData.title}

            </h1>

            <p className="text-gray-500 mt-2">
              {actionData.date}
            </p>

          </div>

          {/* Progress */}

          <div className="bg-white rounded-xl shadow p-6 mt-6">

            <div className="flex justify-between">

              <h2 className="font-bold">

                Daily Progress

              </h2>

              <p>

                {completed} / {total}

              </p>

            </div>

            <div className="w-full h-3 bg-gray-200 rounded-full mt-4">

              <div
                className="h-3 bg-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              ></div>

            </div>

          </div>
          
<div className="bg-indigo-600 text-white rounded-xl p-6 mt-6">

<h2 className="text-lg font-semibold">

🎯 Focus of the Day

</h2>

<p className="mt-3">

{actionData?.focusOfTheDay}

</p>

</div>

<div className="bg-white rounded-xl p-6 shadow mt-4">
   <h2 className="font-bold text-xl">
      Today's Summary
   </h2>

   <p className="text-gray-600 mt-3">
      {actionData?.summary}
   </p>
</div>

<div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow p-6 mt-8 mb-4">

<h2 className="text-xl font-bold flex items-center gap-2">

💡Today's Motivation

</h2>

<p className="italic text-gray-700 mt-4 leading-8">

"{actionData?.motivation}"

</p>

</div>



{/* ActionCard */}
<div>
  <h1 className="text-3xl font-bold mt-8 ">Todays Action</h1>
   {/* Timeline */}

<div className="mt-8 space-y-6">

  {actionData?.actions?.map((task, index) => (

    <div
      key={task.id}
      className="bg-white flex flex-wrap rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
    >

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          {/* Trigger */}

          <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wide">

            ⚡ {task.trigger}

          </p>

          {/* Task */}

          <h2 className="text-2xl font-bold text-gray-900 mt-2">

            {task.task}

          </h2>

        </div>

      </div>

      {/* Why AI selected this */}

      <div className="m-5 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-4">

        <h4 className="font-semibold text-indigo-700">

          🧠 Why this task?

        </h4>

        <p className="text-gray-700 mt-1">

          {task.reason}

        </p>

      </div>

      {/* Bottom Info */}

      <div className="grid md:grid-cols-3 gap-4 mt-6">

        {/* Time */}

        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">

            Time

          </p>

          <p className="font-semibold text-gray-900 mt-1">

            🕒 {task.time}

          </p>

        </div>

        {/* Duration */}

        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm">

            Estimated Duration

          </p>

          <p className="font-semibold text-gray-900 mt-1">

            ⏳ {task.estimatedDuration}

          </p>

        </div>

        {/* Priority */}

        <div className="bg-gray-50 rounded-xl p-4">

          <p className="text-gray-500 text-sm mb-2">
            Priority
          </p>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold

            ${
              task.priority === "High"
                ? "bg-red-100 text-red-700"

                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"

                : "bg-green-100 text-green-700"
            }

            `}
          >

            {task.priority}

          </span>

        </div>
        {/* Status */}

       <div className="flex gap-2 mt-4">

  <button
    onClick={() => updateStatus(index, "pending")}
    className={`px-2 py-1 rounded-lg text-sm font-medium transition
      ${
        task.status === "pending"
          ? "bg-gray-800 text-white"
          : "bg-gray-100"
      }`}
  >
    Pending
  </button>

  <button
    onClick={() => updateStatus(index, "in_progress")}
    className={`px-2 py-1 rounded-lg text-sm font-medium transition
      ${
        task.status === "in_progress"
          ? "bg-yellow-500 text-white"
          : "bg-yellow-100 text-yellow-700"
      }`}
  >
    In Progress
  </button>

  <button
    onClick={() => updateStatus(index, "completed")}
    className={`px-2 py-1 rounded-lg text-sm font-medium transition
      ${
        task.status === "completed"
          ? "bg-green-600 text-white"
          : "bg-green-100 text-green-700"
      }`}
  >
    ✓ Completed
  </button>

</div>
      </div>

    </div>

  ))}

</div>
</div>

 {/* Carried Forward Tasks */}

{actionData?.unfinishedTasksCarriedForward?.length > 0 && (

  <div className="bg-white rounded-2xl shadow p-6 mt-8">

    <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
      📌 Carried Forward Tasks
    </h2>

    <div className="space-y-3">

      {actionData.unfinishedTasksCarriedForward.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4"
        >
          <span className="text-xl">⚠️</span>         
 <h3>{item.task}</h3>
   
    <p>{item.priority}</p>

    <p>{item.progress}</p>
            <p className="text-sm text-gray-500 mt-1">
              This task was not completed previously and has been carried forward.
            </p>
        </div>
      ))}

    </div>

  </div>
)}

{
actionData?.newTasksIntroduced?.length > 0 && (

<div className="bg-white rounded-2xl shadow p-6 mt-8">

<h2 className="text-xl font-bold mb-5">

🚀 New Today

</h2>

<div className="space-y-3">

{
actionData.newTasksIntroduced.map((item,index)=>(

<div
key={index}
className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-3"
>

<span className="text-xl">

✨

</span>

 <h3>{item.task}</h3>

    <p>{item.priority}</p>

    <p>{item.progress}</p>

</div>

))
}

</div>

</div>

)}

{/* Today's Progress */}

<div className="bg-white rounded-2xl shadow p-6 mt-6">

    <div className="flex items-center justify-between">

        <h2 className="text-xl font-bold flex items-center gap-2">

            📈 Today's Progress

        </h2>

        <span className="text-indigo-600 font-bold">

            {progress.toFixed(0)}%

        </span>

    </div>

    <div className="w-full bg-gray-200 h-3 rounded-full mt-5 overflow-hidden">

        <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{
                width: `${progress}%`
            }}
        />

    </div>

    <div className="grid grid-cols-4 gap-4 mt-6">

        <div className="bg-green-50 rounded-xl p-4 text-center">

            <p className="text-2xl font-bold text-green-600">
                {completed}
            </p>

            <p className="text-sm text-gray-600">
                Completed
            </p>

        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-center">

            <p className="text-2xl font-bold text-blue-600">

                {
                    actionData.actions.filter(
                        t => t.status === "in_progress"
                    ).length
                }

            </p>

            <p className="text-sm text-gray-600">
                In Progress
            </p>

        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">

            <p className="text-2xl font-bold text-yellow-600">

                {
                    actionData.actions.filter(
                        t => t.status === "pending"
                    ).length
                }

            </p>

            <p className="text-sm text-gray-600">
                Remaining
            </p>

        </div>

        <div className="bg-indigo-50 rounded-xl p-4 text-center">

            <p className="text-2xl font-bold text-indigo-600">

                {total}

            </p>

            <p className="text-sm text-gray-600">

                Total

            </p>

        </div>

    </div>

</div>


<button

onClick={handleSubmit}

className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 text-lg font-bold transition"

>

📖 End Today's Review

</button>
          </div>

        </div>
    </>
  );
}