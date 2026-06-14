import Footer from "../component/common/Footer";
import Navbar from "../component/common/Navbar";
import { useNavigate } from "react-router-dom";
export default function About() {
    const navigate = useNavigate();
  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-slate-50">
       
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">

          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">
            About Lakshya AI
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            Helping People Turn
            <span className="text-indigo-600"> Dreams Into Action</span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Lakshya AI is an intelligent goal management platform
            that transforms ambitions into structured roadmaps,
            daily systems, and practical actions.
          </p>

        </section>

        {/* Problem */}
        <section className="max-w-6xl mx-auto px-6 py-12">

          <div className="bg-white rounded-3xl p-10 shadow-sm">

            <h2 className="text-3xl font-bold text-slate-900">
              The Problem
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Most people know what they want, but they don't know
              how to get there. Goals remain dreams because there is
              no clear roadmap, no system, and no personalized guidance.
            </p>

            <p className="mt-4 text-slate-600 leading-8">
              Students, professionals, entrepreneurs, and creators
              often struggle with confusion, inconsistency, and
              information overload.
            </p>

          </div>

        </section>

        {/* Solution */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-indigo-600 text-white rounded-3xl p-10">

            <h2 className="text-3xl font-bold">
              Our Solution
            </h2>

            <p className="mt-5 leading-8 text-indigo-100">
              Lakshya AI combines artificial intelligence,
              goal planning, and productivity systems to create
              a personalized success framework for every user.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-xl">
                  AI Roadmaps
                </h3>
                <p className="mt-3 text-indigo-100">
                  Clear step-by-step plans tailored to your goals.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-xl">
                  Daily Systems
                </h3>
                <p className="mt-3 text-indigo-100">
                  Actionable routines that build consistency.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-xl">
                  AI Mentor
                </h3>
                <p className="mt-3 text-indigo-100">
                  Personalized guidance whenever you need help.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 py-12">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">
                Our Mission
              </h2>

              <p className="mt-5 text-slate-600 leading-8">
                To help individuals achieve meaningful goals by
                providing intelligent planning, structured systems,
                and continuous guidance.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">
                Our Vision
              </h2>

              <p className="mt-5 text-slate-600 leading-8">
                To become the world's most trusted AI-powered
                life management platform where every person can
                convert ambition into achievement.
              </p>
            </div>

          </div>

        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            Your Goal Deserves More Than Motivation
          </h2>

          <p className="mt-5 text-slate-600 text-lg">
            Motivation fades. Systems create results.
            Lakshya AI helps you build those systems.
          </p>

          <button  onClick={() => navigate("/register")} className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
            Start Your Journey
          </button>
        </section>

      </div>

      <Footer />
    </>
  );
}