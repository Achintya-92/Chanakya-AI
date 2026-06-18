import Todo from "../models/Todo.js";

export default async function TodoGenerator({
    userId,
    goalId,
    title,
      goalType,
      description,
      age,
      currentState,
      availableTime}){

const apiKey = process.env.OPENROUTER_API_KEY;
    try{
 const res =await fetch(`https://openrouter.ai/api/v1/chat/completions`,
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
        model: "openrouter/free",

  messages: [
            {
                role: "user",
                content: `
You are a world-class productivity coach, execution strategist, learning planner, and performance consultant.

USER INFORMATION

Title: ${title}

Goal Type: ${goalType}

Description: ${description}

Age: ${age}

Current State: ${currentState}

Available Time: ${availableTime}

OBJECTIVE

Create a practical execution-focused Todo Plan that maximizes the probability of achieving this goal.

IMPORTANT RULES

* Think deeply before answering.
* Focus on execution, not motivation.
* Avoid generic advice.
* Avoid theory.
* Every task must be actionable.
* Adapt recommendations based on age, current state, available time, and goal type.
* Prioritize high-impact actions.
* Make recommendations realistic and measurable.
** Adapt recommendations according to:

  * Goal Type
  * Age
  * Current State
  * Available Time

ANALYSIS REQUIREMENTS

Before generating The Todo:
1. Analyze the user's current situation.

2. Identify:

   * Current strengths
   * Current weaknesses
   * Knowledge gaps
   * Execution gaps

3. Create a prioritized action plan.
4. Follow the progression:
Foundation
→ Skill Building
→ Practical Application
→ Portfolio/Proof of Work
→ Real World Execution
→ Goal Achievement

5. Tasks must be ordered from highest priority to lowest priority.

6. Every task must include:

   * Task title
   * Description
   * Priority
   * Estimated duration
   * Difficulty
   * Expected outcome

7. Generate:

   * Daily Tasks
   * Weekly Tasks
   * Milestone Tasks

8. Consider goal type:

Today
→ Hourly tasks

Weekly
→ Day-wise tasks

Monthly
→ Week-wise tasks

Yearly
→ Month-wise milestones

Lifetime
→ Long-term execution phases

OUTPUT FORMAT:


**Return ONLY valid JSON**.

Do NOT return:

* Markdown
* HTML
* Explanations
* Notes
* Comments
* Code fences
* Text before JSON
* Text after JSON

JSON SCHEMA:

{
"analysis": {
"currentSituation": "",
"strengths": [],
"weaknesses": [],
"gaps": []
},

"dailyTasks": [
{
"title": "",
"description": "",
"priority": "High",
"duration": "",
"difficulty": "Easy",
"outcome": ""
}
],

"weeklyTasks": [
{
"title": "",
"description": "",
"priority": "",
"duration": "",
"difficulty": "",
"outcome": ""
}
],

"milestones": [
{
"title": "",
"target": "",
"successCriteria": []
}
],

"focusAreas": [],

"topPriorities": [],

"successMetrics": [],

"recommendedSchedule": {
"dailyHours": "",
"weeklyHours": "",
"deepWorkHours": ""
}
}

Generate realistic values for every field.

Every array must contain meaningful items.

Return ONLY valid JSON matching the schema exactly.
`
         }
        ]                     
        })                            
     })

const data = await res.json();
 if(!data){
    res.send("Chek Internet Connectivity")
   }

const content = data.choices?.[0]?.message?.content;

const cleaned = content
  .replace(/```json|```/g, "")
  .trim();

const parsed = JSON.parse(cleaned);

try {
  await Todo.create({
    userId,
    goalId,
    todo:parsed
  });

} catch (err) {
  console.log("Invalid JSON:");
}
} catch (err) {
  console.log("Invalid JSON");
}
      }
