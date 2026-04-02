import { namee, email, phone, github, linkedin } from "./utils/personalDetails.js";
import { masterCV } from "./utils/resumeText.js";

export const getCVprompt = (jd) => {
    return `
Act as a Senior Technical Recruiter and Resume Architect. 
Goal: Generate a single-page, keyword-perfect, factual CV in JSON format that aligns the User's Master CV to a specific Job Description (JD) for Western markets.

### SOURCE DATA:
Master CV: ${masterCV}
Job Description: ${jd}

### GLOBAL CONSTRAINTS:
1. Factual Integrity: Do NOT invent experience. Do not oversell or undersell. Use only evidence found in the Master CV.
2. Tone: Senior-level, strategic, and "Systems-First." Shift language from "Tasks" (what was done) to "Systems" (how it was solved).
3. German Market Logic: If the JD is identified as a German-based role, explicitly mention eligibility for the "Chancenkarte" (Opportunity Card) within the SUMMARY or a relevant field to highlight work authorization readiness.
4. Formatting Constraint (Character Counts): To maintain layout integrity, every experience bullet must satisfy one of two conditions: be UNDER 140 characters.
5. Keyword Mirroring: Identify top technical requirements in the JD. Prioritize these keywords in bullets and skill sections ONLY where the Master CV provides supporting evidence.

### SECTION-SPECIFIC INSTRUCTIONS:

[SUMMARY]
Generate a high-impact, 4-sentence paragraph using this formula:
- Sentence 1 (Identity): Professional title, years of experience, and primary tech stack from the Master CV.
- Sentence 2 (Systems Core): Highlight backend internals, scalable architectures, or DevOps integration most relevant to the JD.
- Sentence 3 (Quantifiable Result): A tangible achievement from the Master CV using a specific metric (%, $, or time).
- Sentence 4 (Strategic Alignment): Connect a specialized niche (e.g., AI automation, agentic workflows, LLM integration) to a core challenge in the JD.

[SKILLS SECTIONS]
- Prioritize and filter LANGUAGES_FRAMEWORKS, SPECIALIZATIONS, and TOOLS_PLATFORMS based on JD relevance. 
- Proficiencies to draw from: JavaScript (TypeScript), React.js (Next.js, Redux), Node.js (Nest.js, Express.js), C#, SQL, Git, Bitbucket, GitHub, ServiceNow, Scrum, TypeORM, LLM Fine-Tuning, Prompt Engineering, RESTful API Development.

### OUTPUT FORMAT:
- Return ONLY valid JSON.
- No markdown, no explanations, no preamble.
- Maintain EXACT bullet counts as defined in the keys.

JSON STRUCTURE:
{
  "SUMMARY": "",

  "TURING_BULLET_1": "",
  "TURING_BULLET_2": "",
  "TURING_BULLET_3": "",
  "TURING_BULLET_4": "",

  "AFINITI_BULLET_1": "",
  "AFINITI_BULLET_2": "",
  "AFINITI_BULLET_3": "",
  "AFINITI_BULLET_4": "",
  "AFINITI_BULLET_5": "",

  "CONTOUR_BULLET_1": "",
  "CONTOUR_BULLET_2": "",
  "CONTOUR_BULLET_3": "",

  "TPS_BULLET_1": "",
  "TPS_BULLET_2": "",
  "TPS_BULLET_3": "",

  "TOOLS_PLATFORMS": "",
  "SPECIALIZATIONS": "",
  "LANGUAGES_FRAMEWORKS": ""
`

}

export const getCoverLetterPrompt = (jd) => {
    return `
The Cover Letter (The "Anschreiben" Engine)
Goal: A one-page letter that looks like it was written by a high-level professional, not a bot.

The cover letter is for this JD: ${jd}.

Incoporate my personal details given below properly:
Name: ${namee}
Email: ${email}
Phone: ${phone}
GitHub: ${github}
LinkedIn: ${linkedin}

No markdown in text please, no "cover letter" heading should be present.

Prompt: "Write a formal German-style 'Anschreiben' (Cover Letter) that also works for the broader Western market.

Structure:

The Hook: Start by stating the specific role and why my background in [insert your core tech, e.g., Backend Dev] specifically solves the primary problem mentioned in the JD.

The 'Proof' Bridge: Pick the 2 most difficult requirements from the JD. Find the 2 most relevant achievements in my resume. Connect them directly. Use the phrase 'My experience with [X] allows me to contribute to [Company Name] by [Y].'

The Cultural Fit: Mention a focus on 'efficiency,' 'documentation,' and 'scalability'—values highly prized in Germany and the West.

The Logistics: Include my earliest possible start date(which should be the next immediate working day) and a professional closing ('Mit freundlichen Grüßen' for German roles, 'Sincerely' for others).

Strict Constraints:

NO 'I am thrilled to apply.'

NO 'I am the perfect candidate.'

Maximum 250 words. Be brutally concise."
`
}

export const getDMPrompt = (jd, rName, dmType = "general") => {
    return `
    The Outreach Engine (LinkedIn/Xing)
Goal: A high-conversion, direct message that gets a response from a busy recruiter.

Job Description: ${jd}
My Background: ${masterCV}
Recruiter Name: ${rName}

Incoporate my personal details given below properly:
Name: ${namee}
Email: ${email}
Phone: ${phone}
GitHub: ${github}
LinkedIn: ${linkedin}

Prompt: "Draft ONE concise outreach message for ${rName} regarding the position in the JD.

Structure:
1. Direct Opening: State the role and how my specific technical stack (from my CV) solves a key requirement in the JD.
2. The Evidence: Mention one specific quantifiable achievement from my background that proves I can do the job.
3. Call to Action: Ask if they are the person handling this role or if they can point you toward the hiring manager.

Strict Constraints:
- NO 'I hope this finds you well' or 'I am writing to express interest.'
- NO AI clichés like 'passionate,' 'synergy,' or 'top-tier.'
- Keep it under 450 characters.
- Sign off with 'Best regards, ${namee}'."
- Make it the adequate size do not make it too short or way too small make it the perfect size Big or small doesn't matter the adequate size matters

${dmType === 'connect_req_msg' && `You have a maximum of 200 characters to write a connect request message. Be very concise and straight to the point. Incoporate all the necessary details in this small limit. `}
${dmType === 'company_page_msg' && `You have a limit of 25-750 words to write a message for a company career page. Make sure to highlight all the necessary details within this word limit. Keep the size what you think is adequate keeping within this range.`}

`
}

export const getKeywordsPrompt = (jd) => {
    return `
The Technical Keyword Extractor (ATS Optimizer)
Goal: Extract the 15 most critical technical hard skills for automated screening.

Job Description: ${jd}

Prompt: "Analyze the provided JD and identify the top 15 technical keywords. 

Strict Guidelines:
1. Focus only on Hard Skills: Languages, frameworks, tools, databases, and specific methodologies (e.g., Kubernetes, CI/CD, Java, AWS).
2. Exclude Soft Skills: Do not include words like 'communication,' 'teamwork,' or 'problem-solving.'
3. Format: Return ONLY a comma-separated list. 

Strict Constraints:
- NO Markdown.
- NO introductory or concluding text. 
- NO numbering.
- Output should look like: React, Node.js, AWS, etc."

`

}

export const getBatchedQuestionsAnswerPrompt = (jd, questions) => {
    const formattedQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');

    return `
The Application Question Engine (Batch Mode)
Goal: Answer a list of screening questions based strictly on my Master CV and the Job Description.

Job Description: ${jd}
My Background: ${masterCV}

Questions to Answer:
${formattedQuestions}

STRICT INSTRUCTIONS:
1. Respond with ONLY a valid JSON array of objects. Do not include any other text, explanations, or markdown.
2. The JSON array should contain one object for each question answered.
3. Each object in the array must have two keys: "question" (the original question string) and "answer" (the generated answer string).
   Example format: [{"question": "Why us?", "answer": "Your company's focus on..."}, {"question": "A challenge?", "answer": "A significant challenge was..."}]

ANSWER CONSTRAINTS (for each "answer" value):
1. NO "AI Smell": Do not use words like "tapestry", "delve", "testament", "showcase", "foster", or "landscape".
2. NO Long Dashes: Do not use em-dashes (—) or en-dashes (–). Use standard hyphens (-) only.
3. Source of Truth: Answers must be factually derived from my CV. Do not invent experience.
4. Relevance: Relate my experience directly to the JD requirements mentioned in the context of the question.
5. Tone: Direct, professional, human, and concise.

Generate the JSON response now.
`;
}