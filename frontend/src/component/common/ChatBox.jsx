import { useState } from "react";

function ChatBox({data,id}) {
    const [goal,setGoal] = useState(null);
    const [chat,setChat] = useState("");

    const fetchGoal = async () => {
        try {
          const response = await fetch(
            `${API_URL}/goals/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const Gdata = await response.json();
          setGoal(Gdata.goal);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(()=>{
      fetchGoal();
      },[id])
      

      const handleChat = async (e)=>{
        const res =fetch(``)
      }
    return ( 
        <div className="container fixed mb-2 p-2 border-skyblue-100 rounded-20 bg-white-900 shadow-sm-t">
     <form onSubmit={handleChat}>
           <input type="text" name="chat" id="chat" onChange={(e)=>setChat(e.target.value)}/>
    </form>       
 </div>
     );
}

export default ChatBox;