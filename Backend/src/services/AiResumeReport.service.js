const { z } = require("zod");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { getModel } = require("./gemini");

const qaItem = z.object({
  question: z.string().describe("The question that can be asked in the interview"),
  intention: z.string().describe("The intention of the interviewer behind asking this question"),
  answer: z
    .string()
    .describe("How to answer this question, what points to cover, what approach to take"),
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Score 0-100 for how well the candidate's profile matches the job"),
  technicalQuestions: z
    .array(qaItem)
    .min(3)
    .describe("Technical questions with intention and how to answer"),
  behavioralQuestions: z
    .array(qaItem)
    .min(3)
    .describe("Behavioral questions with intention and how to answer"),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("How important this skill is for the job and its impact on chances"),
      }),
    )
    .min(4)
    .describe("Skill gaps in the candidate's profile with severity"),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("Day number, starting from 1"),
        focus: z.string().describe("Main focus of the day, e.g. system design, mock interviews"),
        tasks: z.array(z.string()).min(2).describe("Tasks to do on this day"),
      }),
    )
    .min(5)
    .describe("Day-wise preparation plan"),
  title: z.string().describe("The job title the report is generated for"),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You generate interview preparation reports.
Requirements:
- technicalQuestions: at least 3 items
- behavioralQuestions: at least 3 items
- skillGaps: at least 4 items
- preparationPlan: at least 5 days, each with at least 2 tasks
- No field may be empty or null. Every key must be present.`,
  ],
  [
    "human",
    `Generate an interview report for this candidate.

Resume: {resume}
Self Description: {selfDescription}
Job Description: {jobDescription}`,
  ],
]);

async function InterViewReportByAi({ Resume, selfDescription, jobDescription }) {
  const structuredModel = getModel({ temperature: 0.2 }).withStructuredOutput(
    interviewReportSchema,
    { name: "interview_report" },
  );

  const chain = promptTemplate.pipe(structuredModel);

  try {
    const report = await chain.invoke({
      resume: Resume || "No resume provided",
      selfDescription: selfDescription || "No self description provided",
      jobDescription: jobDescription || "No job description provided",
    });

    // Extra safety: validate against the schema
    return interviewReportSchema.parse(report);
  } catch (error) {
    console.error("INTERVIEW REPORT ERROR:", error);
    throw new Error("AI returned invalid report");
  }
}

module.exports = { InterViewReportByAi };