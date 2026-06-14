export default function TaskSection({
tasks 
}) 
{
  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🚀 Tasks Todo
      </h2>

      <div className="space-y-6">

        {tasks.map((item, index) => (
          <div
            key={index}
            className="
              border-l-4
              border-indigo-500
              pl-5
            "
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p className="text-slate-700 leading-7 text-sm">
              {item.description}
            </p>
            <br />
            <p className="text-sm p-2">
              <strong className="text-bold text-black-900">priority:</strong> {item.priority}
            </p>    
            <p >
              <strong className="text-bold text-black-900">duration:</strong>{item.duration}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}