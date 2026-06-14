import Roadmap from "../models/Roadmap.js";

export default async function RoadmapGenerator({
    userId,
    goalId,
    title,
      goalType,
      description,
      age,
      currentState,
      availableTime,}){

const apiKey = process.env.VITE_OPENROUTER_API_KEY;
    try{
 const res =await fetch(`https://openrouter.ai/api/v1/chat/completions`,
        {
        method: "POST",

        headers: {
            Authorization:`Bearer ${apiKey.trim()}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        model : "openrouter/free",

        messages: [
            {
                role: "user",
                content: `
          You are a world-class career strategist, roadmap architect, learning planner, skill development expert, and execution coach.

USER INFORMATION

Title: ${title}

Goal Type: ${goalType}

Description: ${description}

Age: ${age}

Current State: ${currentState}

Available Time: ${availableTime}

OBJECTIVE

Create a realistic and highly actionable roadmap that takes the user from their current state to successful goal achievement.

IMPORTANT RULES

* Think deeply before answering.
* Analyze the user's current situation first.
* Focus on execution, not motivation.
* Avoid generic advice.
* Avoid theoretical explanations.
* Adapt the roadmap according to:

  * Age
  * Current skill level
  * Available time
  * Goal type
* Prioritize the highest-impact activities.
* Every phase must move the user closer to the goal.

ROADMAP FRAMEWORK

1. Analyze current situation.

2. Identify:

   * Current strengths
   * Weaknesses
   * Missing skills
   * Major risks
   * Opportunities

3. Build a progression:

Current State
→ Foundation
→ Skill Development
→ Practical Application
→ Real World Experience
→ Advanced Execution
→ Goal Achievement

4. Divide roadmap into logical phases.

5. Each phase must contain:

   * Phase title
   * Objective
   * Duration
   * Key actions
   * Deliverables
   * Success criteria

6. Consider Goal Type:

Today
→ Hourly roadmap

Weekly
→ Day-wise roadmap

Monthly
→ Week-wise roadmap

Yearly
→ Month-wise roadmap

Lifetime
→ Long-term phases

7. Include measurable outcomes.

8. Focus on practical implementation.

OUTPUT FORMAT

Return ONLY valid JSON.

{
"analysis": {
"currentSituation": "",
"strengths": [],
"weaknesses": [],
"skillGaps": [],
"risks": [],
"opportunities": []
},

"roadmapSummary": {
"estimatedCompletionTime": "",
"totalPhases": 0,
"primaryFocus": ""
},

"phases": [
{
"phaseNumber": 1,
"title": "",
"objective": "",
"duration": "",

  "keyActions": [],

  "deliverables": [],

  "resourcesToLearn": [],

  "successCriteria": [],

  "commonMistakes": []
}

],

"milestones": [
{
"title": "",
"targetDate": "",
"successCriteria": []
}
],

"criticalSkills": [
{
"skill": "",
"importance": "",
"reason": ""
}
],

"priorityOrder": [],

"successMetrics": [],

"riskManagement": [
{
"risk": "",
"prevention": [],
"recovery": []
}
],

"finalOutcome": {
"expectedResult": "",
"proofOfAchievement": [],
"nextLevelAfterCompletion": []
}
}

Return JSON only.

Do not return markdown.

Do not return HTML.

Do not return explanations.

Do not return notes.

Do not return code fences.
                `
            }
        ]
        })
     })

const data = await res.json();
console.log(data);
const content = data.choices?.[0]?.message?.content;
   console.log(content);
try {

await Roadmap.create({
  userId,
  goalId,
  roadmap: content,
});

} catch (err) {
  console.log("Invalid JSON:");
}

    } catch(err){
         console.error(err);
    }
    
}

