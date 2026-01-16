import { namee, email, phone, github, linkedin } from "./utils/personalDetails.js";
import { masterCV } from "./utils/resumeText.js";

export const getCVprompt = (jd) => {
    return `
The Resume Optimizer(The "Lebenslauf" Engine)
Goal: A single - page, keyword - perfect, factual CV that 100 % passes ATS and impresses German / Western recruiters.

Use my master CV.

Rewrite the Experience section to include keywords from this JD: ${jd}

Prompt: "You are an expert Technical Recruiter specializing in the DACH region and Western tech markets. I will provide a Job Description (JD) and my Resume.

Your Task: Rewrite the 'Experience' and 'Skills' sections of my resume to align perfectly with the JD.

Strict Constraints:

Keyword Mirroring: Identify the top technical requirements in the JD.Ensure these keywords appear in my experience bullets, but only where my resume provides evidence for them.

Tone: Academic, professional, and direct.

Output: Provide the output using no Markdown, optimized for a clean, single - page layout.Focus on high information density."
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

export const getDMPrompt = (jd, rName) => {
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