import Card from "./Card";
import Info from "./Info";
import StatCard from "./StatCard";
  import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

export default function System() {
const { id } = useParams();
  const [data, setSystem] = useState("");
  const token = localStorage.getItem("token");

   const fetchSystem = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/system/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

 const data = await response.json();
 console.log(data);
const systemJson = JSON.parse(data.system[0].system);
console.log(systemJson);
    setSystem(systemJson);
    }catch(err){
      console.log(err);
    }
   
  }
    useEffect(()=>{
    fetchSystem();
  },[id])
  console.log(data);
  if (!data) {
  return <h1>Loading...</h1>;
}
  return (
    <div className="space-y-8">

      {/* Analysis */}
    {/* Analysis */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    📊 Analysis
  </h2>

  <p className="mb-5">
    {data.analysis.currentSituation}
  </p>

  <div className="grid md:grid-cols-2 gap-4">
    <Card
      title="Strengths"
      items={data.analysis.strengths}
    />

    <Card
      title="Weaknesses"
      items={data.analysis.weaknesses}
    />

    <Card
      title="Obstacles"
      items={data.analysis.obstacles}
    />

    <Card
      title="Execution Gaps"
      items={data.analysis.executionGaps}
    />
  </div>
</section>

      {/* Rules */}
{/* Non Negotiable Rules */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    ⚖️ Non Negotiable Rules
  </h2>

  <Card
    title="Rules"
    items={data.nonNegotiableRules}
  />
</section>

{/* Daily Execution System */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🚀 Daily Execution System
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Morning System"
      items={data.dailyExecutionSystem.morningSystem}
    />

    <Card
      title="Work System"
      items={data.dailyExecutionSystem.workSystem}
    />

    <Card
      title="Evening Review"
      items={data.dailyExecutionSystem.eveningReviewSystem}
    />

    <Card
      title="Minimum Actions"
      items={data.dailyExecutionSystem.minimumActions}
    />

    <Card
      title="Ideal Actions"
      items={data.dailyExecutionSystem.idealActions}
    />

  </div>
</section>

{/* Environment Design */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🏠 Environment Design
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Digital Environment"
      items={data.environmentDesign.digitalEnvironment}
    />

    <Card
      title="Physical Workspace"
      items={data.environmentDesign.physicalWorkspace}
    />

    <Card
      title="Phone Usage Rules"
      items={data.environmentDesign.phoneUsageRules}
    />

    <Card
      title="Social Environment"
      items={data.environmentDesign.socialEnvironment}
    />

  </div>
</section>

<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🔄 Habit Stacking System
  </h2>

  <div className="grid md:grid-cols-2 gap-4">
    {data.habitStackingSystem.map((habit, i) => (
      <div
        key={i}
        className="border rounded-xl p-4"
      >
        <p>
          <strong>Trigger:</strong>{" "}
          {habit.trigger}
        </p>

        <p className="mt-2">
          <strong>Action:</strong>{" "}
          {habit.action}
        </p>

        <p className="mt-2">
          <strong>Reward:</strong>{" "}
          {habit.reward}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* Deep Work */}
      <section className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          🎯 Deep Work System
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <Info
            label="Session Duration"
            value={data.deepWorkSystem.sessionDuration}
          />

          <Info
            label="Break Structure"
            value={data.deepWorkSystem.breakStructure}
          />

        </div>

      </section>

      {/* Success Dashboard */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          📈 Success Dashboard
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <StatCard
            title="Weekly Score"
            value={data.successDashboard.weeklyScoreTarget}
          />

          <StatCard
            title="Focus Hours"
            value={data.successDashboard.focusHoursTarget}
          />

          <StatCard
            title="Consistency"
            value={data.successDashboard.consistencyTarget}
          />

          <StatCard
            title="Habits"
            value={data.successDashboard.keyHabits.length}
          />

        </div>

      </section>

      {/* Accountability System */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    📋 Accountability System
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Daily Scorecard"
      items={data.accountabilitySystem.dailyScorecard}
    />

    <Card
      title="Weekly Review"
      items={data.accountabilitySystem.weeklyReview}
    />

    <Card
      title="Monthly Review"
      items={data.accountabilitySystem.monthlyReview}
    />

    <Card
      title="Success Indicators"
      items={data.accountabilitySystem.successIndicators}
    />

  </div>
</section>

{/* Failure Recovery */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🔄 Failure Recovery
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Missed Day Recovery"
      items={data.failureRecoverySystem.missedDayRecovery}
    />

    <Card
      title="Missed Week Recovery"
      items={data.failureRecoverySystem.missedWeekRecovery}
    />

    <Card
      title="Momentum Recovery"
      items={data.failureRecoverySystem.momentumRecovery}
    />

  </div>
</section>

{/* Low Motivation Protocol */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    ⚡ Low Motivation Protocol
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Minimum Viable Progress"
      items={data.lowMotivationProtocol.minimumViableProgress}
    />

    <Card
      title="5 Minute Restart"
      items={data.lowMotivationProtocol.fiveMinuteRestartStrategy}
    />

    <Card
      title="Anti Procrastination"
      items={data.lowMotivationProtocol.antiProcrastinationActions}
    />

  </div>
</section>

{/* Long Term Sustainability */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🌱 Long Term Sustainability
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Burnout Prevention"
      items={data.longTermSustainability.burnoutPrevention}
    />

    <Card
      title="Energy Management"
      items={data.longTermSustainability.energyManagement}
    />

    <Card
      title="Sleep Recommendations"
      items={data.longTermSustainability.sleepRecommendations}
    />

    <Card
      title="Recovery Practices"
      items={data.longTermSustainability.recoveryPractices}
    />

  </div>
</section>

{/* Deep Work System */}
<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🎯 Deep Work System
  </h2>

  <div className="grid md:grid-cols-2 gap-4 mb-6">

    <Info
      label="Focus Schedule"
      value={data.deepWorkSystem.focusSchedule}
    />

    <Info
      label="Session Duration"
      value={data.deepWorkSystem.sessionDuration}
    />

    <Info
      label="Break Structure"
      value={data.deepWorkSystem.breakStructure}
    />

  </div>

  <Card
    title="Focus Rituals"
    items={data.deepWorkSystem.focusRituals}
  />

</section>

<section className="bg-white rounded-2xl shadow p-6">
  <h2 className="text-2xl font-bold mb-4">
    🌱 Long Term Sustainability
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <Card
      title="Burnout Prevention"
      items={data.longTermSustainability.burnoutPrevention}
    />

    <Card
      title="Energy Management"
      items={data.longTermSustainability.energyManagement}
    />

    <Card
      title="Sleep Recommendations"
      items={data.longTermSustainability.sleepRecommendations}
    />

    <Card
      title="Rest Practices"
      items={data.longTermSustainability.restPractices}
    />

    <Card
      title="Recovery Practices"
      items={data.longTermSustainability.recoveryPractices}
    />

  </div>
</section>

    </div>
  );
}