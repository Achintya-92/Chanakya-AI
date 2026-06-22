import { useNavigate } from "react-router-dom";
export default function Loader({ message = "Loading" }) {
const navigate=useNavigate();
  return (
    <div className="relative max-w-sm  mx-auto min-h-screen flex items-center justify-center">
      <div className="bg-white text-gray-900 shadow-xl rounded-2xl p-16 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-green-600" />
        <div className="mt-4 text-lg font-medium">{message}</div>
        <div className="flex flex-wrap gap-16 p-4 mt-8 relative">
      <button onClick={(e)=>navigate(`/`)} className="bg-orange-500 p-4 rounded-xl px-6">Exit</button>
      <button onClick={(e)=>navigate(`/creategoal`)} className="bg-green-500 p-4 px-5 rounded-xl">Back</button>
      </div>
      </div>
    </div>
  );
};