import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import InternalNavbar from "./InternalNavbar";

function ChatBar({ closeSidebar }) {
  const [chats, setChats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/ai/chats/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChats(data.chats))
      .catch(console.error);
  });

  if(!chats){
    return(<>
    </>
    );
  }
  return (
    <div className="w-1/2 h-screen p-2 bg-black text-white border-r shadow-[0_4px_6px_0_rgba(0,255,0)]">
      <h3 className="border mb-2 border-white-500 p-4 rounded-3xl">Your Chats</h3>
      <ul className="p-4 bg-[rgba(71, 97, 71, 0.1)]">
        {chats?.map((chat, index) => (
          <li
            key={chat._id}
            onClick={() => {
              setSelectedIndex(index);
               closeSidebar();
              navigate(`/chatpage/${chat._id}`);
            }}
            className={`w-full p-2 border-b border-gray-500 text-white hover:bg-gray-300 cursor-pointer
            ${selectedIndex == index ? "bg-gray-400 text-white" : "bg-black"}`}
          >
            {chat.chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatBar;
