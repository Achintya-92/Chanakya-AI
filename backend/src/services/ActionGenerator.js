import Action from "../models/Action.js";

export default async function ActionGenerator({
    userId,
    goalId,
    date,
    deadline,
    system,
    todo,
   previousActions,
   isFirstDay
  }){

let prompt = `
You are Chanakya AI, an elite execution coach and productivity strategist.

Your job is NOT to create generic to-do lists.

Your job is to analyze the user's execution history and generate today's action plan that maximizes progress toward the user's goal.

──────────────────────────────
USER'S EXECUTION SYSTEM
──────────────────────────────

${system}

──────────────────────────────
MASTER TODO / ROADMAP
──────────────────────────────

${todo}

──────────────────────────────
PREVIOUS 7 DAYS EXECUTION HISTORY
──────────────────────────────

${previousActions}

──────────────────────────────
TODAY'S DATE
──────────────────────────────

${date}

──────────────────────────────
Goal Complition Last Date
──────────────────────────────

${deadline}

──────────────────────────────
OBJECTIVE
──────────────────────────────

Generate today's execution plan.

Today's plan should intelligently adapt based on:

• User's gaol deadline
• User's long-term goal
• Master roadmap
• Daily execution system
• Previous execution history
• Completed tasks
• Pending tasks
• Missed tasks
• Current momentum

Do NOT generate a generic daily schedule.

──────────────────────────────
EXECUTION RULES
──────────────────────────────

1. Important: Give task in a way or Enough task so that user should complete Before Goal Complition Last Date: ${deadline}.

2. Never repeat completed tasks.

3. Continue unfinished HIGH priority tasks.

4. If a task has remained incomplete for multiple days:
   • Break it into smaller tasks.
   • Reduce complexity.
   • Make it easier to complete.

5. If the user consistently completes work:
   • Increase difficulty slightly.
   • Increase responsibility gradually.

6. If the user misses many tasks:
   • Reduce workload.
   • Focus only on essential tasks.
   • Rebuild momentum.

7. Balance coding, revision, applications, portfolio, and interview preparation.

8. Arrange tasks according to natural daily triggers instead of arbitrary times.

Example:

After waking up
↓
Drink water

After brushing
↓
Stretching

After breakfast
↓
JavaScript Revision

After Lunch
↓
Resume Improvement

After Evening Tea
↓
Apply to internships

Before Sleeping
↓
Daily Review

8. Every task must directly contribute toward the user's goal.

9. Keep the workload realistic.

10. Avoid duplicate work.

11. Maintain continuity with previous days.

12. Prioritize unfinished critical tasks before introducing new tasks.

13. If introducing new tasks, ensure they logically follow the roadmap.

14. Think like a human mentor who remembers everything the student did yesterday.

──────────────────────────────
OUTPUT REQUIREMENTS
──────────────────────────────

Return ONLY valid JSON.

Do NOT return:

- Markdown
- Explanations
- Notes
- Comments
- Code fences
- Text before JSON
- Text after JSON

──────────────────────────────
JSON SCHEMA
──────────────────────────────

{
  "title": "Today's Execution Plan",
  "date": "${date}",
  "overallStatus": "pending",
  "summary": "",
  "focusOfTheDay": "",
  "actions": [
    {
      "id": 1,
      "trigger": "",
      "task": "",
      "reason": "",
      "time": "",
      "estimatedDuration": "",
      "priority": "High",
      "status": "pending"
    }
  ],
  "unfinishedTasksCarriedForward": [],
  "newTasksIntroduced": [],
  "dailyGoal": "",
  "motivation": "",
  "endOfDayReviewQuestions": [
    "",
    "",
    ""
  ]
}

Generate realistic values for every field.

Return ONLY valid JSON.
`;


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
        model: "deepseek/deepseek-chat",

  messages: [
            {
                role: "user",
                content: prompt,
            }
            ]
          })
        })
console.log(res);
const data = await res.json();
 if(!data){
    res.send({message:"Chek Internet Connectivity"})
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

try {
  await Action.create({
    userId,
    goalId,
    action:parsed
  });

} catch (err) {
  console.log("Invalid JSON:");
}
} catch (err) {
   if (
    err.cause?.code === "UND_ERR_CONNECT_TIMEOUT" ||
    err.cause?.code === "UND_ERR_HEADERS_TIMEOUT" ||
    err.cause?.code === "UND_ERR_SOCKET" ||
    err.cause?.code === "ENOTFOUND" ||
    err.cause?.code === "ECONNREFUSED"
  ) {
    return res.status(503).json({
      success: false,
      message: "Unable to connect to the AI service. Please check your internet connection or try again later.",
    });
  }else{
   return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
  }
}
}