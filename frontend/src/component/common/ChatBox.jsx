import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import TextLoader from "./TextLoader";

function ChatBox({data,id}){
    const [chat,setChat] = useState("");
  const token=localStorage.getItem("token");
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  const handleChat = async (e)=>{
    if(!chat){
      return(
        alert("Enter prompt first!")
      )
    }
        e.preventDefault();
        setLoading(true);
        setMessage("Generating Answer")
  try{
        const res = await fetch(`${API_URL}/ai/Chats/send`,{
          method:"POST",
          headers:{
            "Content-Type":"Application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({chat:chat,data:data,id:id})
        });
        
        const result = await res.json();
         console.log(result);
       if (!res.ok) {
        setLoading(false);
        throw new Error(result.message || "Failed to send chat");
      }
      setLoading(false);
    setMessage("Answer Generated!");
     setChat("");
     setMessage(" ");
    navigate(`/chatpage/${result.chat._id}`);
      }
    catch(err){
      if (!navigator.onLine) {
        setMessage("🌐 Please connect to the internet.");

      } else {
        setLoading(false);
        setMessage(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
    return ( 
         <div className="max-w-sm mx-auto p-6 shadow-[0_-4px_6px_-1px_rgba(0,200,0,0.5)] rounded-xl">
          <h1 className="text-xl text-black-100 font-bold  mb-4">Your goal assistent</h1>
     <form onSubmit={handleChat}>
           <input className="w-full border-none onfocus:none p-2 rounded mb-4" type="text" name="chat" id="chat" onChange={(e)=>setChat(e.target.value)} placeholder="Ask anything......." required/>
    {loading ? <TextLoader text={message}/>:message}    
           <button className="bg-green-500 px-4 py-2 rounded-xl text-black-700">send</button>
    </form>   
 </div>
     );
}

export default ChatBox;
