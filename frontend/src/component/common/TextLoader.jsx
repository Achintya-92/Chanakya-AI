import { useEffect, useState } from "react";

function TextLoader({text="Loding"}) {
    const [dots,setDots] = useState("");

    useEffect(()=>{
        const interval = setInterval(()=>{
            setDots((prev)=>prev.length>=3? "":prev+".");
        },500);
        return ()=> clearInterval(interval);
    })
    return ( 
        <div className="p-4 text-black-500" >
             {text}{dots} 
        </div>
     );
}

export default TextLoader;