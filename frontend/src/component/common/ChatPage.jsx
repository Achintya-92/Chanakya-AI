import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config/api";
import ChatBar from "./ChatBar";
import ChatBox from "./ChatBox";
import InternalNavbar from "./InternalNavbar";

function ChatPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [chat, setChat] = useState(null);
  

  console.log(id);
  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/ai/chats/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChat(data.chat.chat);
        setUserId(data.userId);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
