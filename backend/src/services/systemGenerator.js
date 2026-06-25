import System from "../models/System.js";

export default async function SystemGenerator({
    userId,
    goalId,
    title,
      goalType,
      description,
      age,
      currentState,
      availableTime,}){

const apiKey = process.env.OPENROUTER_API_KEY;
let res;
console.log(apiKey);
    try{
  res =await fetch(`https://openrouter.ai/api/v1/chat/completions`,
        {
        method: "POST",

        headers: {
            Authorization:`Bearer ${apiKey.trim()}`,
            "Content-Type": "application/json"
        },
        response_format: {
      type: "json_object"
},
        body: JSON.stringify({
        model : "deepseek/deepseek-chat",

        messages: [
            {
                role: "user",
                content: `
You are a world-class behavioral psychologist, habit architect, performance coach, systems thinker, execution strategist, and structured JSON generator.

USER INFORMATION

Title: ${title}

Goal Type: ${goalType}

Description: ${description}

Age: ${age}

Current State: ${currentState}

Available Time: ${availableTime}

OBJECTIVE

Design a complete Psychological Execution System that maximizes the probability of achieving this goal through habits, systems, accountability, environment design, and consistent execution.

IMPORTANT RULES

* Think deeply before answering.
* Focus on execution systems, not motivation.
* Avoid generic advice.
* Avoid inspirational content.
* Avoid theory-heavy explanations.
* Every recommendation must be measurable and actionable.
* Adapt recommendations according to:

  * Goal Type
  * Age
  * Current State
  * Available Time

ANALYSIS REQUIREMENTS

Before generating the system:

1. Analyze the current situation.
2. Identify strengths.
3. Identify weaknesses.
4. Identify likely obstacles.
5. Identify execution gaps.
6. Identify leverage points.

OUTPUT FORMAT

Return ONLY valid JSON

Do NOT return:

* important: Empty array and data field should remain Empty.
* Markdown
* HTML
* Explanations
* Notes
* Comments
* Code fences
* Text before JSON

JSON SCHEMA

{
"analysis": {
"currentSituation": "",
"strengths": [],
"weaknesses": [],
"obstacles": [],
"executionGaps": [],
"leveragePoints": []
},

"successIdentity": {
"identity": "",
"dailyIdentityStatement": "",
"behavioralStandards": []
},

"nonNegotiableRules": [],

"dailyExecutionSystem": {
"morningSystem": [],
"workSystem": [],
"eveningReviewSystem": [],
"minimumActions": [],
"idealActions": [],
"recoveryActions": []
},

"habitStackingSystem": [
{
"trigger": "",
"action": "",
"reward": ""
}
],

"environmentDesign": {
"digitalEnvironment": [],
"physicalWorkspace": [],
"phoneUsageRules": [],
"socialEnvironment": [],
"positiveCues": [],
"negativeTriggers": [],
"distractionsToEliminate": []
},

"deepWorkSystem": {
"focusSchedule": "",
"sessionDuration": "",
"breakStructure": "",
"focusRituals": [],
"timeBlockingStrategy": [],
"distractionPrevention": []
},

"accountabilitySystem": {
"dailyScorecard": [],
"weeklyReview": [],
"monthlyReview": [],
"successIndicators": [],
"warningIndicators": [],
"failureIndicators": []
},

"lowMotivationProtocol": {
"minimumViableProgress": [],
"fiveMinuteRestartStrategy": [],
"antiProcrastinationActions": []
},

"failureRecoverySystem": {
"missedDayRecovery": [],
"missedWeekRecovery": [],
"momentumRecovery": []
},

"longTermSustainability": {
"burnoutPrevention": [],
"energyManagement": [],
"sleepRecommendations": [],
"restPractices": [],
"recoveryPractices": []
},

"keystoneHabits": [
{
"habit": "",
"reason": "",
"trackingMethod": ""
}
],

"obstaclePrediction": [
{
"obstacle": "",
"warningSigns": [],
"prevention": [],
"recovery": []
}
],

"successDashboard": {
"keyHabits": [],
"weeklyScoreTarget": "",
"focusHoursTarget": "",
"consistencyTarget": "",
"progressMetrics": []
}
}

Generate realistic values for every field.

Every array must contain meaningful items.

Return ONLY valid JSON matching the schema exactly.

importent note:- Output must be parseable by JSON.parse().
             `
            }
        ]
        })
     })
     if(!res.ok){
      console.log("check your internet!");
     }
const data = await res.json();

 if(!data){
    console.log("Chek Internet Connectivity");
   }

const content = data.choices?.[0]?.message?.content;
const cleaned = content
  .replace(/```json|```/g, "")
  .trim();

let parsed;

try {
  parsed = JSON.parse(cleaned);
} catch (err) {
  console.error("Invalid JSON from AI:");
  console.log(cleaned);
  throw err;
}

 await System.create({
    userId,
    goalId,
    system:parsed
  });
    }catch (err) {
  console.log(err);
}
}
