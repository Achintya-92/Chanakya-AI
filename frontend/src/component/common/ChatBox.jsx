import { useState } from "react";
import { API_URL } from "../../config/api";

function ChatBox({data,id}){
    const [chat,setChat] = useState("");
  const token=localStorage.getItem("token");
  const userId=localStorage.getItem("userId");
        
  const handleChat = async (e)=>{
    if(!chat){
      return(
        alert("Enter prompt first!")
      )
    }
        e.preventDefault();
        const res =fetch(`${API_URL}/ai/Chats/send`,{
          method:"POST",
          headers:{
            "Content-Type":"Application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({chat:chat,data:data,id:id,userId:userId})
        });
      }

    return ( 
         <div className="max-w-sm mx-auto p-6 shadow-[0_-4px_6px_-1px_rgba(0,200,0,0.5)] rounded-xl">
          <h1 className="text-xl text-black-100 font-bold  mb-4">Your goal assistent</h1>
     <form onSubmit={handleChat}>
           <input className="w-full border-none onfocus:none p-2 rounded mb-4" type="text" name="chat" id="chat" onChange={(e)=>setChat(e.target.value)} placeholder="Ask anything......." required/>
           <button className="bg-green-500 px-4 py-2 rounded-xl text-black-700">send</button>
    </form>       
 </div>
     );
}

export default ChatBox;
