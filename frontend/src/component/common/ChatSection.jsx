import { useParams } from "react-router-dom";
import ChatBar from "./ChatBar";
import InternalNavbar from "./InternalNavbar";
import ChatBox from "./ChatBox";

function ChatSection() {
    const userId=localStorage.getItem("userId");
console.log(userId);

    return ( <div>
        <InternalNavbar userId={userId}/>
        <div className="min-h-screen flex items-center justify-center">
  <ChatBox />
</div>
</div>);
}

export default ChatSection;