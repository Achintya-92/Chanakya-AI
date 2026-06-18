import GoalCard from "./GoalCard";

export default function GoalSection({
  title,
  goals,
}) 
{

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">
        {goals.map(goal => (
          <GoalCard
            key={goal._id}
            goal={goal}
          /> 
        ))}
      </div>
    </section>
  );
}