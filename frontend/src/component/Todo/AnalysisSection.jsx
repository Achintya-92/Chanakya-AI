export default function AnalysisSection({
  analysis,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-6">
        📊 Goal Analysis
      </h2>

      <p className="mb-6">
        {analysis.currentSituation}
      </p>

      <div className="grid md:grid-cols-3 gap-4">

        <Card
          title="Strengths"
          items={analysis.strengths}
        />

        <Card
          title="Weaknesses"
          items={analysis.weaknesses}
        />

        <Card
          title="Gaps"
          items={analysis.gaps}
        />

      </div>
    </div>
  );
}

function Card({ title, items }) {
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