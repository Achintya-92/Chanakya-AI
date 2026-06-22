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

  //-----------------------------------------
  // Fetch Today's Action
  //-----------------------------------------
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
 console.log(data);
    if (!res.ok) {
      setError(data.message);
      return;
    }

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

  //-----------------------------------------
  // Submit
  //-----------------------------------------
  const generateTomorrowAction = async () => {
  try {

    const res = await fetch(`${API_URL}/actions/generate-next`, {
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

    alert("Tomorrow's Action Generated!");

    fetchTodayAction();

  } catch (err) {
    console.log(err);
  }
};


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
    return <LoaderCard message="Loading Today's Action" />;

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

          {/* Timeline */}

          <div className="mt-8 space-y-5">

            {actionData.actions.map((task, index) => (

              <div
                key={task.id}
                className="bg-white rounded-xl shadow p-6 border-l-4 border-indigo-600"
              >

                <div className="flex justify-between">

                  <div>

                    <p className="text-indigo-600 text-sm font-semibold">

                      {task.trigger}

                    </p>

                    <h2 className="text-xl font-bold mt-1">

                      {task.task}

                    </h2>

                    <p className="text-gray-500 mt-2">

                      🕒 {task.time}

                    </p>

                  </div>

                  <div>

                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(
                          index,
                          e.target.value
                        )
                      }
                      className="border rounded-lg p-2"
                    >

                      <option value="pending">

                        Pending

                      </option>

                      <option value="in_progress">

                        In Progress

                      </option>

                      <option value="completed">

                        Completed

                      </option>

                    </select>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Submit */}

          <div className="sticky bottom-5 mt-10">

            <button
              disabled={
                actionData.overallStatus !==
                "completed"
              }
              onClick={handleSubmit}
              className={`w-full py-4 rounded-xl text-lg font-bold transition

              ${
                actionData.overallStatus ===
                "completed"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }

              `}
            >

              {actionData.overallStatus ===
              "completed"
                ? "Generate Tomorrow's Action"
                : "Complete Today's Tasks"}

            </button>

          </div>

        </div>

      </div>
    </>
  );
}