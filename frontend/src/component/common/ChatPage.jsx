import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import ChatBox from "./ChatBox";
import InternalNavbar from "./InternalNavbar";
import LoaderCard from "./Loader";

function ChatPage() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [message,setMessage] = useState("")
  const [loading,setLoading]=useState(true);

  useEffect(() => {
  if (!id) return;

  const fetchChat = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/ai/chats/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setChat(data.chat.chat);
      setMessage("Chat Loaded");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Failed to load chat");
    } finally {
      setLoading(false);
    }
  };
fetchChat();
}, [id]);

if (loading) {
  return <LoaderCard message={message || "Loading Chat."} />;
}

if (!chat) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      No chat found.
    </div>
  );
}

if (!id) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <ChatBox />
      </div>
    </>
  );
}
  return (
    <div className="">
      <InternalNavbar toggle={true}/>
     {chat && <div className="h-full bg-white-500">
          <div className="p-4 bg-white-700 shadow-sm mt-4 mb-4">
            <h1 className="font-bold text-black p-4 font-lg">{chat.title}</h1>
            <p className="p-4 font-md text-black-500 shadow-sm">
              {chat.answer}
            </p>
          </div>
          <div className="p-4 bg-white-700 shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-black p-4">Why it importance</h2>
            <p className="p-4 font-md text-black-500 shadow-sm">
              {chat.relevanceToGoal}
            </p>
          </div>

          <div className="p-4 bg-white-700 shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-black p-4">How it helps</h2>
            <p className="p-4 font-md text-black-500 shadow-sm">
              {chat.personalizedInsight}
            </p>
          </div>

          <div className="p-4 bg-white shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-black p-4">How to apply</h2>

            {chat?.recommendedActions?.map((recommendedAction, index) => (
              <p key={index} className="p-4 text-black shadow-sm">
                {recommendedAction}
              </p>
            ))}
          </div>

          <div className="p-4 bg-white shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-orange-900 p-4">Warnings</h2>

            {chat?.warnings?.map((warning, index) => (
              <p key={index} className="p-4 text-black shadow-sm">
                ⚠️{warning}
              </p>
            ))}
          </div>

          <div className="p-4 bg-white-700 shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-black p-4">Accountability Check</h2>
            <p className="p-4 font-md text-black-500 shadow-sm">
              {chat.accountabilityCheck}
            </p>
          </div>

          <div className="p-4 bg-white-700 shadow-sm mt-4 mb-4">
            <h2 className="font-bold text-black p-4">What Next</h2>
            <p className="p-4 font-md text-black-500 shadow-sm">
              {chat.nextStep}
            </p>
          </div>
        </div>
}
      <ChatBox />
    </div>
  );
}
export default ChatPage;
