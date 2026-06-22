import { useState } from "react";
import { API_URL } from "../../config/api";
import TextLoader from "./TextLoader";

function Feedback() {
  const [toggle, setToggle] = useState(false);
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleClick() {
    let value = null;
    const starButtons = document.querySelectorAll(".star-button");
    starButtons.forEach((button) => {
      button.addEventListener("click", function () {
        removePermanentSelectedClass();
        this.classList.add("permanent-selected");
        this.classList.add("selected");
        value = this.getAttribute("data-value");
        highlightStars(value);
        setRating(value);
      });

      button.addEventListener("mouseover", function () {
        removeTemporarySelectedClass();
        value = this.getAttribute("data-value");
        highlightStars(value);
      });

      button.addEventListener("mouseout", function () {
        removeTemporarySelectedClass();
        const selectedStarButton = document.querySelector(
          ".star-button.permanent-selected",
        );
        if (selectedStarButton) {
          value = selectedStarButton.getAttribute("data-value");
          highlightStars(value);
        }
      });
    });

    function highlightStars(value) {
      starButtons.forEach((starButton) => {
        if (starButton.getAttribute("data-value") <= value) {
          starButton.classList.add("selected");
        } else {
          starButton.classList.remove("selected");
        }
      });
    }

    function removeTemporarySelectedClass() {
      starButtons.forEach((starButton) => {
        starButton.classList.remove("selected");
      });
    }

    function removePermanentSelectedClass() {
      starButtons.forEach((starButton) => {
        starButton.classList.remove("permanent-selected");
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Submitting Feedback!");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/user/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ feedback, rating }),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to send feedback!");
      }
        setMessage("✅ Thanks for your feedback!");
    } catch (err) {
      if (!navigator.onLine) {
        setLoading(false);
        setMessage("🌐 Please connect to the internet.");
      }  else if (err.name === "TypeError") {
      // Covers network errors like server unreachable, CORS, DNS, etc.
      setMessage("⚠️ Unable to connect to the server. Please try again later.");
    } else {
        setLoading(false);
        setMessage(err.message || "Something went wrong. Please try again.");
      }
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full bg-gray-100 min-h-screen-sm flex items-center justify-center p-8">
        <div className="w-3xl max-h-sm bg-white-900 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="feedback"
                className="w-full p-4 font-bold text-3xl mb-8 mt-8 flex items-center justify-center"
              >
                Write Your Feedback
              </label>
            </div>
            <textarea
              name="feedback"
              id="feedback"
              className="p-8 w-3xl border rounded-2xl text-indigo-700"
              placeholder="Your one feedback very heplful for us......"
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            </form>
        </div>
      </div>
       <div className="p-4 text-xl flex items-center justify-center">
              {loading ? <TextLoader text={message} /> : message}
            </div>
      <h2 className="p-8 font-bold text-3xl flex items-center justify-center">
        AND
      </h2>
      <div id="ratingBody">
        <div className="div"></div>
        <div className="container mx-auto">
          <h1 className="flex items-center justify-center">Rate Our App</h1>

          <div className="flex items-center justify-center">
          <div className="rating">
            <button
              onClick={handleClick}
              className="star-button"
              data-value="5"
            >
              &#9733;
            </button>
            <button
              onClick={handleClick}
              className="star-button"
              data-value="4"
            >
              &#9733;
            </button>
            <button
              onClick={handleClick}
              className="star-button"
              data-value="3"
            >
              &#9733;
            </button>
            <button
              onClick={handleClick}
              className="star-button"
              data-value="2"
            >
              &#9733;
            </button>
            <button
              onClick={handleClick}
              className="star-button"
              data-value="1"
            >
              &#9733;
            </button>
        </div>
          </div>
           <button onClick={handleSubmit} className="mx-auto mt-8 px-4 py-2  bg-indigo-700 text-white rounded-lg flex items-center justify-center">
              submit
            </button>
        </div>
      </div>
    </>
  );
}

export default Feedback;
