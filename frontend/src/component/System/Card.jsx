export default function Card({ title, items }) {
  if (!items?.length) return null;

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-lg mb-3">
        {title}
      </h3>

      <ul className="space-y-2 list-disc ml-5">
        {items.map((item, index) => (
          <li key={index}>
            {typeof item === "string"
              ? item
              : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}