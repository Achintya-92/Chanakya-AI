import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatBar from "./ChatBar";

function InternalNavbar() {
  const userId = localStorage.getItem("userId");
    const [toggle1,setToggle]=useState(false);
    
    return (<div className="relative">
 <nav className="flex item-center justify-between p-2 bg-black-500 shadow-[0_2px_6px_0_rgba(0,255,0)] relative z-10">

        <button onClick={()=>setToggle(!toggle1)} className="text-3xl">
  ☰
</button>
      <h1 className="text-indigo-600 p-4 text-xl font-bold" >Chanakya AI</h1>
       <ul className="flex gap-6 items-center">
        <li><a href="/">Home</a></li>
        <li onClick={() => setToggle(false)}><a href={`/chatSection/${userId}`} label="Chanakya ai you goal mentor.">Chanakya</a></li>
        <li onClick={() => setToggle(false)}><a href={`/creategoal`} label="Chanakya ai you goal mentor">New Goal</a></li>
        {/* <li><a href={`/feedback/${userId}`}>Feedback</a></li> */}
         {/* <li className="flex flex-wrap border rounded-3xl text-sm px-2 py gap-2"><a href={`/accountPage/${userId}`}>You</a><img src="usericon.jpg" alt="" className="rounded-full cover" /></li> */}
       </ul>
      </nav>
      {toggle1 && (
  <ChatBar closeSidebar={() => setToggle(false)} />
)}
     </div>);
}

export default InternalNavbar;