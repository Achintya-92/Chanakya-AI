import { Target, Brain, Map, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/common/Footer";
import Navbar from "../component/common/Navbar";

export default function Home() {
    const navigate = useNavigate();
  const features = [
    {
      title: "AI Goal Roadmap",
      description:
        "Get a personalized roadmap based on your age, current skills and target goal.",
      icon: <Map size={36} />,
    },
    {
      title: "Daily Success System",
      description:
        "Convert big goals into practical daily actions and habits.",
      icon: <Target size={36} />,
    },
    {
      title: "AI Mentor",
      description:
        "Ask questions anytime and receive personalized guidance.",
      icon: <Brain size={36} />,
    },
    {
      title: "Progress Tracking",
      description:
        "Measure growth and stay motivated throughout your journey.",
      icon: <TrendingUp size={36} />,
    },
  ];

  return (
    <>
<Navbar/>
      <div className="min-h-screen bg-slate-50">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="text-center">

            <h1 className="text-6xl font-bold text-slate-900 leading-tight">
              Turn Your Goals Into
              <span className="text-indigo-600">
                {" "}Achievable Systems
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
              Chanakya AI helps you transform your dreams into
              structured roadmaps, daily systems, and actionable
              plans powered by Artificial Intelligence.
            </p>

            <div className="mt-10 flex justify-center gap-4">
  <button
      onClick={() => navigate("/register")}
      className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
      Get Started
    </button>

              <button onClick={() => navigate("/about")} className="px-8 py-4 border border-slate-300 rounded-xl font-semibold hover:bg-slate-100 transition">
                Learn More
              </button>
            </div>
          </div>

        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-20">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900">
              What Chanakya AI Does
            </h2>

            <p className="text-slate-600 mt-4">
              Everything you need to achieve ambitious goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
              >
                <div className="text-indigo-600 mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-20">

          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-center text-4xl font-bold mb-12">
              Why Choose Chanakya AI?
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              <div className="bg-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-indigo-700">
                  Personalized Guidance
                </h3>

                <p className="mt-4 text-slate-700">
                  Every roadmap is generated according to your
                  age, current position, available time and
                  future ambitions.
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-emerald-700">
                  Action-Oriented Planning
                </h3>

                <p className="mt-4 text-slate-700">
                  We don't just tell you what to do.
                  We create systems, habits and daily actions
                  that move you toward success.
                </p>
              </div>

            </div>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}