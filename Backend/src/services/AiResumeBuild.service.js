const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function AtsResumeByAi({ Resume, selfDescription, jobDescription }) {
  const prompt = `
Create an ATS-friendly resume in HTML for the candidate.

CANDIDATE RESUME:
${Resume || "No resume provided"}

SELF DESCRIPTION:
${selfDescription || "No self description provided"}

TARGET JOB DESCRIPTION:
${jobDescription || "No job description provided"}

IMPORTANT RULES:

1. Return ONLY valid HTML.
2. Do NOT return Markdown.
3. Do NOT return JSON.
4. Do NOT include <html>, <head>, <body>, <script>, or <style>.
5. The response MUST start with <div class="resume">.
6. The response MUST end with </div>.
7. Return exactly ONE root <div class="resume">.
8. Use semantic HTML such as <header>, <section>, <h1>, <h2>, <p>, <ul>, and <li>.
9. Make the resume professional, concise, clean, and ATS-friendly.
10. Use the Job Description ONLY to understand the target role and prioritize relevant keywords.
11. Candidate facts MUST come ONLY from the Candidate Resume and Self Description.
12. NEVER invent or assume candidate information.
13. NEVER create fake companies, job titles, work experience, projects, education,
    certifications, achievements, dates, technologies, skills, or qualifications.
14. NEVER generate placeholder information.
15. NEVER generate fake contact information.

CONTACT INFORMATION:
- Use email ONLY if explicitly present in the candidate information.
- Use phone ONLY if explicitly present in the candidate information.
- Use GitHub ONLY if explicitly present in the candidate information.
- Use LinkedIn ONLY if explicitly present in the candidate information.
- If contact information is missing, OMIT it completely.
- NEVER use examples such as:
  your.email@example.com
  +91 XXXXXXXXXX
  github.com/yourusername
  linkedin.com/in/yourusername

16. Do not create a contact line just to make the resume look complete.
17. If a section has no valid candidate information, omit that section.
18. Do not add explanations, comments, or text outside the HTML.
19. Do not claim that the candidate possesses a skill merely because it appears in the Job Description.
20. Rewrite existing candidate information professionally without changing its factual meaning.

FINAL OUTPUT REQUIREMENT:

Return ONLY HTML in exactly this form:

<div class="resume">
  <!-- resume content here -->
</div>
`;

  const response = await openai.chat.completions.create({
    model: "openrouter/free",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    max_tokens: 8000,
  });

  let content = response.choices[0].message.content;

  if (!content) {
    throw new Error("AI did not return resume HTML");
  }

  content = content
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  return content;
}

module.exports = {
  AtsResumeByAi,
};
