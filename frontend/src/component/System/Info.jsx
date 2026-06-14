export default function Info({ label, value }) {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold">
        {label}
      </h3>

        <p className="font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}