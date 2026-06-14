import {useNavigate} from "react-router-dom";

function GoalCard({goal}) {
  const navigate = useNavigate();
    return ( 
        <div className="
 bg-white
 rounded-2xl
 p-6
 shadow-md
 hover:shadow-xl
 transition
 cursor-pointer
">
  <h3 className="text-xl font-bold">
    {goal.title}
  </h3>

  <p className="text-gray-600 mt-3">
    {goal.description}
  </p>

  <div className="mt-4">
    <span className="
      bg-blue-100
      text-blue-700
      px-3
      py-1
      rounded-full
      text-sm
    ">
      {goal.currentState}
    </span>

    <div className="flex col-span-1 md:col-span-2 p-2">
      <button className="p-2" onClick={()=>navigate(`/todo/${goal._id}`)} >Todo</button>
      <button className="p-2" onClick={()=>navigate(`/roadmap/${goal._id}`)} >Roadmap</button>
      <button className="p-2" onClick={()=>navigate(`/system/${goal._id}`)} >System</button>
    </div>
  </div>
</div>
     );
}

export default GoalCard;