export default function MilestoneSection({
  milestones,
})
 {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        🚀 Milestones
      </h2>

      <div className="space-y-6">

        {milestones.map((item, index) => (
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

            <p className="text-sm text-gray-500">
              {item.target}
            </p>

            <ul className="mt-3 space-y-2">
              {item.successCriteria.map(
                (criteria, i) => (
                  <li key={i}>
                    ✅ {criteria}
                  </li>
                )
              )}
            </ul>

          </div>
        ))}

      </div> 
    </div>
  );
}