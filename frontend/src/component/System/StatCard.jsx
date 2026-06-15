export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
      <p className="text-sm opacity-80">
        {title}
      </p>
      
      <h3 className="text-2xl font-bold mt-1">
        {value}
      </h3>
    </div>
  );
}