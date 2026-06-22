import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import TextLoader from "../common/TextLoader";

function UpdateForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    goalType: "",
    description: "",
    age: "",
    currentState: "",
    fireLine: "",
    availableTime: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("wait");
    try {
      const response = await fetch(`${API_URL}/goals/goal/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setMessage("✅ Goal updated successfully!");
        navigate("/creategoal");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage(err.message);
    }
  };

  const [goal, setGoal] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        setLoading(true);
        setMessage("Loading goal");

        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/goals/goal/${id}`, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.message || "Failed to load goal");
        }
        setFormData({
          title: data.goal.title || "",
          goalType: data.goal.goalType || "",
          description: data.goal.description || "",
          age: data.goal.age || "",
          currentState: data.goal.currentState || "",
          fireLine: data.goal.fireLine || "",
          availableTime: data.goal.availableTime?.split("T")[0] || "",
        });
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

    fetchGoal();
  }, []);

  return (
    <div className="min-h-screen mx-auto bg-slate-50">
      <div className="max-w-7xl mx-auto px-16 py-10">
        {/* Form section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm">
            <form className="space-x-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-l font-medium">
                  Enter type of goal
                </label>
              </div>
            <select
value={formData.goalType}
onChange={(e)=>
setFormData({
...formData,
goalType:e.target.value
})
}
>
                <option value="today">Today</option>

                <option value="weekly">Weekly</option>

                <option value="monthly">Monthly</option>

                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
              </select>

              <div>
                <label className="block mb-l font-medium">title</label>
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              ></input>
              <div>
                <label className="block mb-l font-medium">privious goal description</label>
              </div>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <div>
                <label className="block mb-l font-medium">Age</label>
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: e.target.value,
                  })
                }
              ></input>
              <div>
                <label className="block mb-l font-medium">
                  your privious CurrentState
                </label>
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                type="text"
                name="currentState"
                id="currentState"
                value={formData.currentState}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentState: e.target.value,
                  })
                }
              ></input>
              <div className="mt-2 mb-2">
                <label className="block mb-l font-medium">
                   Your suggested Fire Line.
                </label>
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 mb-4"
                type="text"
                name="fireline"
                id="fireline"
                value={formData.fireLine}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fireLine: e.target.value,
                  })
                }
              ></input>
              <div className="mt-2 mb-2">
                <label className="block mb-l font-medium">
                  Privious Deadline
                </label>
              </div>
              <input
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
                type="date"
                name="available"
                id="available"
                value={formData.availableTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableTime: e.target.value,
                  })
                }
              ></input>

              <br />
              {Loading ? <TextLoader text={message} /> : message}
              <br />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateForm;
