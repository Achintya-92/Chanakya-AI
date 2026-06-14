export default function RoadmapList({ title, items, dark }) {

  console.log(title);
  console.log(items);
  console.log(Array.isArray(items));

  return (
    <div className="mb-5">
      <h4 className="font-semibold mb-2">{title}</h4>

      <ul className="space-y-1">
        {items?.map((item, i) => (
          <li key={i}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}