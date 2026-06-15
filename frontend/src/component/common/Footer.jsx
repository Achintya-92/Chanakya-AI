export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h3 className="text-2xl font-bold text-indigo-400">
              Chanakya AI
            </h3>

            <p className="mt-4 text-slate-400">
              Transform goals into systems, habits and
              actionable roadmaps powered by AI.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Features
            </h4>

            <ul className="space-y-2 text-slate-400">
              <li>Goal Roadmaps</li>
              <li>AI Mentor</li>
              <li>Daily Systems</li>
              <li>Progress Tracking</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">
              Contact
            </h4>

            <ul className="space-y-2 text-slate-400">
              <li>support@chanakya.ai</li>
              <li>India</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
          © 2026 Chanakya AI. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}