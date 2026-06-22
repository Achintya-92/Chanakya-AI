import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

export default function Motivation() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const res = await fetch(`${API_URL}/motivation`);

      const data = await res.json();

      if (data.success) {
        setQuote(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!quote) return <p className="mt-[-200px]"></p>;

  return (
    <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4">
        🌟 Daily Motivation
      </h2>

      <p className="italic text-lg">
        "{quote.quote}"
      </p>

      <p className="mt-4 text-right font-semibold">
        — {quote.author}
      </p>
    </div>
  );
}