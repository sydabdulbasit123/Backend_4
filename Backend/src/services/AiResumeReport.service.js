const OpenAI = require("openai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ).min(0).max(100),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    ).min(3)
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    ).min(3)
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    ).min(4)
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string()).min(2)
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    ).min(5)
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function InterViewReportByAi({
  Resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report for this candidate.

Resume: ${Resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY a JSON object matching EXACTLY this schema:
{
  "matchScore": number (0-100),
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGaps": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": string, "tasks": [string] }
  ],
  "title": string
}

Rules:
- "technicalQuestions": at least 3 items, each with non-empty question, intention, answer
- "behavioralQuestions": at least 3 items, each with non-empty question, intention,answer
- "skillGaps": at least 4 items, each with non-empty skill and a valid severity
- "preparationPlan": at least 5 days, each with at least 2 tasks
- No field may be empty, null, "", or []
- Every array must contain the minimum number of items specified
- Output raw JSON only. No markdown fences.
- Every key above MUST be present.
- "severity" must be "low", "medium", or "high".
`;

  const response = await openai.chat.completions.create({
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "interview_report",
        strict: true,
        schema: zodToJsonSchema(interviewReportSchema),
      },
    },
    max_tokens: 8000,
  });

const content = response.choices[0].message.content;

console.log("AI RAW CONTENT:", content);

try {
  const parsed = JSON.parse(content);

  const validatedReport = interviewReportSchema.parse(parsed);

  return validatedReport;
} catch (error) {
  console.error("JSON PARSE / VALIDATION ERROR:", error);
  console.error("AI RAW CONTENT:", content);

  throw new Error("AI returned invalid JSON");
}
}

module.exports = { InterViewReportByAi };