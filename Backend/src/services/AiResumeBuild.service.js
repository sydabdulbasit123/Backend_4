const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const { getModel } = require("./gemini");

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You create ATS-friendly resumes in HTML.

RULES:
1. Return ONLY valid HTML. No Markdown, no JSON, no explanations.
2. Do NOT include <html>, <head>, <body>, <script>, or <style>.
3. The response MUST start with <div class="resume"> and end with </div>.
4. Return exactly ONE root <div class="resume">.
5. Use semantic HTML: <header>, <section>, <h1>, <h2>, <p>, <ul>, <li>.
6. Keep it professional, concise, clean, and ATS-friendly.
7. Use the Job Description ONLY to understand the target role and prioritize keywords.
8. Candidate facts MUST come ONLY from the Candidate Resume and Self Description.
9. NEVER invent companies, job titles, experience, projects, education, certifications,
   achievements, dates, technologies, skills, or qualifications.
10. NEVER generate placeholder or fake contact information.
11. Use email, phone, GitHub, LinkedIn ONLY if explicitly present in the candidate info.
    If missing, OMIT it completely.
12. If a section has no valid candidate information, omit that section.
13. Do not claim a skill merely because it appears in the Job Description.
14. Rewrite existing candidate information professionally without changing its factual meaning.`,
  ],
  [
    "human",
    `CANDIDATE RESUME:
{resume}

SELF DESCRIPTION:
{selfDescription}

TARGET JOB DESCRIPTION:
{jobDescription}`,
  ],
]);

async function AtsResumeByAi({ Resume, selfDescription, jobDescription }) {
  const chain = promptTemplate.pipe(getModel()).pipe(new StringOutputParser());

  let content = await chain.invoke({
    resume: Resume || "No resume provided",
    selfDescription: selfDescription || "No self description provided",
    jobDescription: jobDescription || "No job description provided",
  });

  if (!content) {
    throw new Error("AI did not return resume HTML");
  }

  // Strip accidental markdown fences
  content = content
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return content;
}

module.exports = { AtsResumeByAi };