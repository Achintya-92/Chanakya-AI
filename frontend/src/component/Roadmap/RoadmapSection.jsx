import Card from "./Card";
import RoadmapList from "./RoadmapList";
import { API_URL } from "../../config/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatBox from "../common/ChatBox";
import InternalNavbar from "../common/InternalNavbar";
import LoaderCard from "../common/Loader";

export default function RoadmapSection()
 {
  const { id } = useParams();
  const [roadmap,setRoadmap] = useState(null);
  const token =localStorage.getItem("token");
  const [message,setMessage]=useState("");
 const [loaded,setLoaded] =useState(true); 
   
  const fetchRoadmap = async () => {
     if(!navigator.onLine){
      setLoaded(false);
      setMessage("Check your Internet Connectivity!");
    }else{
    try {
      const response = await fetch(
        `${API_URL}/goals/roadmap/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        if(!response.ok){
  setMessage("Somthing went wrong!");
  return;
}
 const data = await response.json();
  console.log(data);
console.log(data?.roadmap?.[0]?.roadmap[0]);
  setRoadmap(data?.roadmap[0]?.roadmap[0]);
    }
    catch(err){
      setMessage("Failed To load roadmap!");
      console.log(err);
    }finally{
      setLoaded(false);
    }
  }
  }

  useEffect(()=>{
  fetchRoadmap();
  },[id])

   if (loaded) {
    const msg=message||"Loading Roadmap.";
    return (
      <>
    {    <LoaderCard message={msg} />|| message};
      </>
    );
  }

    if (!roadmap) {
    const msg=message||"Loading Roadmap.";
    return (
      <>
        <LoaderCard message={msg} />
      </>
    );
  }

function RiskManagementSection({
  risks,
}) {
  return (
    <div className="space-y-4">
      {risks.map((risk, index) => (
        <div
          key={index}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <h3 className="font-bold text-red-700">
            ⚠️ {risk.risk}
          </h3>

          <p className="mt-2">
            <strong>Prevention:</strong>{" "}
            {risk.prevention}
          </p>

          <p>
            <strong>Recovery:</strong>{" "}
            {risk.recovery}
          </p>
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="space-y-8">
<InternalNavbar/>
      {/* Analysis */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          🔍 Situation Analysis
        </h2>

        <p className="mb-4 text-slate-600">
          {roadmap.analysis.currentSituation}
        </p>

        <div className="grid md:grid-cols-2 gap-4">

        <strong className="">Stregnths:</strong>
        <p className="p-2">
          {roadmap.analysis.strengths}
        </p>

          <Card
            title="Weaknesses"
            items={roadmap.analysis.weaknesses}
            color="red"
          />

          <Card
            title="Skill Gaps"
            items={roadmap.analysis.skillGaps}
            color="yellow"
          />

          <Card
            title="Opportunities"
            items={roadmap.analysis.opportunities}
            color="blue"
          />

           <Card
            title="Risks"
            items={roadmap.analysis.risks}
            color="blue"
          />

        </div>
      </section>
    
  <RiskManagementSection
  risks={roadmap.riskManagement}
/>
      {/* Summary */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          🎯 Roadmap Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <p className="text-sm opacity-80">
              Completion Time
            </p>

            <h3 className="font-bold">
              {roadmap.roadmapSummary.estimatedCompletionTime}
            </h3>
          </div>

          <div>
            <p className="text-sm opacity-80">
              Total Phases
            </p>

            <h3 className="font-bold">
              {roadmap.roadmapSummary.totalPhases}
            </h3>
          </div>

          <div>
            <p className="text-sm opacity-80">
              Primary Focus
            </p>

            <h3 className="font-bold">
              {roadmap.roadmapSummary.primaryFocus}
            </h3>
          </div>

        </div>
      </section>

      {/* Phases */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          🛣️ Roadmap Phases
        </h2>

        <div className="space-y-6">
          {roadmap.phases.map((phase) => (
            <div
              key={phase.phaseNumber}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {phase.phaseNumber}
                </span>

                <div>
                  <h3 className="text-xl font-bold">
                    {phase.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {phase.duration}
                  </p>
                </div>
              </div>

              <p className="mb-5">
                {phase.objective}
              </p>

              <RoadmapList title={"Key Actions"} items={phase.keyActions} />
             <RoadmapList title={"Deliverables"} items={phase.deliverables} />
            <RoadmapList title={"Resources"} items={phase.resourcesToLearn} />
            <br />
            <h2 className="font-semibold mb-2">Success Criteria</h2>
            <br />
             <p>
{phase.successCriteria}
             </p>
             <br />
<h2  className="font-semibold mb-2">Common Mistakes</h2>
<br />
<p>{phase.commonMistakes}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-5">
          🏆 Milestones
        </h2>

        <div className="space-y-4">
          {roadmap.milestones.map((m, index) => (
            <div 
              key={index}
              className="border-l-4 border-indigo-500 pl-4"
            >
              <h3 className="font-semibold">
                {m.title}
              </h3>

              <p className="text-sm text-slate-500">
                {m.targetDate}
              </p>

             <p className="text-sm text-slate-500">
                {m.successCriteria}
             </p>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Skills */}
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-5">
          🚀 Critical Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {roadmap.criticalSkills.map((skill, i) => (
            <div
              key={i}
              className="border rounded-xl p-4"
            >
              <h3 className="font-bold">
                {skill.skill}
              </h3>

              <p className="text-sm text-indigo-600">
                {skill.importance}
              </p>

              <p className="text-slate-600 mt-2">
                {skill.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Outcome */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          🎉 Success Metrics
        </h2>

      <RoadmapList title={"Success Metrics"} items={roadmap.successMetrics} />

      </section>
       <ChatBox d={roadmap} id={id}/>
    </div>
  );
}

 
