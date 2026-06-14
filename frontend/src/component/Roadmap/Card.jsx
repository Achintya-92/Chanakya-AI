export default function Card({ title, items }) {
  console.log(title,":",items);
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-bold mb-3">
        {title}
      </h3>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}