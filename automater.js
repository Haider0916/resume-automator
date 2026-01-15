const API_KEY = 'AIzaSyA4m_N3BXb29E_rGN5pfU3h0AlTE9OH6wE';
let MASTER_CV = `Syed Haider Imam Abidi
Karachi, Pakistan | +923002437195 | syedhaider0916@gmail.com
PROFESSIONAL SUMMARY
Full Stack Developer with 3+ years of experience in product-based companies, specializing in JavaScript, TypeScript, React, and
Node.js. Proven expertise in building and scaling applications in FinTech, AI, and Telephony sectors. Strong background in
front-end and back-end development, LLM fine-tuning, and prompt engineering.
PROFESSIONAL EXPERIENCE
Software engineer | Turing
May 2024 – Present
● Engineered process improvements on the ServiceNow CRM platform utilizing Glide Script.
● Mentored teams in developing and implementing best practices for LLM notebook creation and prompt engineering.
● Spearheaded research initiatives to optimize and streamline notebook creation workflows, enhancing team efficiency.
● Facilitated daily stand-ups and leadership meetings to align team objectives and track project milestones.
Software engineer | Afiniti
Nov 2022 – June 2024
● Worked on two services inside a telephony switch using TypeScript, Nest.js, and Node.js.
● Revamped UI and backend services, improving performance and user experience.
● Optimized RESTful endpoints; integrated third-party services and libraries for feature enhancements.
● Conducted R&D to evaluate and select viable third-party libraries, reducing development time and improving system
capabilities.
● Collaborated with team leads to enforce clean code principles and advanced logic, improving codebase maintainability.
Software engineer | Contour Software
Dec 2021 – June 2022
● Full-stack development of a consumer-facing application using React.js front-end and Express.js middleware.
● Integrated new features and endpoints from a SaaS API, expanding application functionality.
● Ensured adherence to Scrum methodologies and clean code practices through active collaboration in daily stand-ups.
Software engineer | TPS Worldwide
April 2021 – November 2021
● Customized and enhanced the IRIS software ecosystem for new clients using C#, JavaScript, and SQL.
● Integrated new banking and biller systems into the IRIS platform, expanding its market capabilities.
● Contributed to a cloud-based team, assisting in the development of the Sokin crypto wallet on AWS during the last
month of employment.
EDUCATION
Bachelor of computer science
CGPA: 2.91
Karachi University(UBIT), Pakistan
SKILLS
● Languages & Frameworks: JavaScript (TypeScript), React.js (Next.js, Redux), Node.js (Nest.js, Express.js), C#, SQL
● Tools & Platforms:, Git, Bitbucket, GitHub, ServiceNow, Scrum, TypeORM
● Specializations: LLM Fine-Tuning, Prompt Engineering, RESTful API Development, Web developement
LANGUAGES
English | Urdu`;
const namee = "Syed Abidi";
const email = "syedhaider0916@gmail.com";
const phone = "+923002437195";
const github = "https://www.github.com/syedhaider0916/";
const linkedin = "https://www.linkedin.com/in/syed-abidi-426178175/";

const systemInstruction = {
    parts: [{
        text: `You are an elite Technical Career Consultant specializing in the DACH and Western tech markets. Your objective is to generate high-density, professionally urgent job application materials that minimize relocation friction and maximize technical credibility.

CORE OPERATING DIRECTIVES:
1. ZERO FILLER: Start every response immediately with the requested content. Never include introductory phrases (e.g., "Here is the cover letter," "Sure, I can help with that") or concluding remarks (e.g., "Let me know if you need anything else," "Good luck").
2. NO CHAT/ACKNOWLEDGMENT: Do not acknowledge the user's instructions. Do not provide meta-commentary on the JD or the CV.
3. ADJECTIVE BAN: Strictly forbid the following words: "passionate," "results-driven," "motivated," "enthusiastic," "expert," "visionary," "seasoned," "proven track record," or "synergy." Replace "excitement" with "technical readiness."

THE GERMAN "CHANCENKARTE"
- For German opportunities, explicitly state the candidate is "eligible for the Opportunity Card (Chancenkarte)," highlighting a streamlined, self-sponsored visa process. FYI: Only only mention about the CHANCENKARTE if you are certain that the opportunity is for Germany.

REMOTE PROTOCOL:
- REMOTE FALLBACK: In all Cover Letters and DMs, insert this specific contingency: "To ensure project continuity and an immediate start, I am prepared to begin working on a remote basis while relocation and administrative processing are finalized."

DOCUMENT-SPECIFIC LOGIC:
- RESUMES: Use the "Action Verb + Task + Quantifiable Result" formula. Prioritize numbers (%, $, time, user counts) from the Master CV. (e.g., 'Optimized SQL queries, reducing API latency by 30%').
- DMs: Always include the candidate's Name, Phone, and LinkedIn. Identify and map exactly 2-3 core technical overlaps between the Master CV and the JD requirements to show immediate value.
- TONE: Academic, professional, and direct. Maintain an "Urgent Professional" tone. The writing must reflect a candidate who is highly qualified, ready to start yesterday, and capable of solving the company's specific technical pain points without being a "visa headache."

DATA INTEGRITY:
- Use the candidate's provided contact details (Name, Email, Phone, GitHub, LinkedIn) in all formal documents. 
- If a recruiter name is provided, use it. If not, use "Hiring Manager."

FORMATTING:
- For CVs and cover letters specifically aim for a clean, single page layout with no markdown. Focus on high information density.
- Do not use Markdown (bolding, italics, headers) for DMs, Keywords, or Cover Letters. Only use Markdown for Resumes if specifically requested. Do not use long dashes (—) or en-dashes (–); use standard hyphens (-) only.


The 'Proof' Bridge: Pick the core requirements from the JD which overlap with my achievements in my resume and properly highlight them.
DO not oversell me as a candidate; be direct and factual.
For ATS friendly CV and proper cover letter, refer to the JD which will be provided along with my MASTER CV below to extract relevant experience and skills.

Use these personal details:
Name: ${namee}
Email: ${email}
Phone: ${phone}
GitHub: ${github}
LinkedIn: ${linkedin}
Candidate CV: ${MASTER_CV}
`
    }]
};

async function generateAll() {
    const jd = document.getElementById('jdInput').value;
    const rName = document.getElementById('recruiterName').value || "Hiring Manager";
    const loading = document.getElementById('loading');
    const outputContainer = document.getElementById('outputContainer');
    const resultsContent = document.getElementById('resultsContent');

    if (!jd) return alert("Paste a JD first!");
    if (API_KEY === 'YOUR_GEMINI_API_KEY_HERE') return alert("Enter your API Key in the script first!");

    loading.classList.remove('hidden');
    resultsContent.innerHTML = '';

    const tasks = [];
    if (document.getElementById('checkCV').checked) tasks.push({
        type: 'CV',
        prompt: `
        The Resume Optimizer (The "Lebenslauf" Engine)
Goal: A single-page, keyword-perfect, factual CV that 100% passes ATS and impresses German/Western recruiters.

Use my master CV.

Rewrite the Experience section to include keywords from this JD: ${jd}

Prompt: "You are an expert Technical Recruiter specializing in the DACH region and Western tech markets. I will provide a Job Description (JD) and my Resume.

Your Task: Rewrite the 'Experience' and 'Skills' sections of my resume to align perfectly with the JD.

Strict Constraints:

Keyword Mirroring: Identify the top technical requirements in the JD. Ensure these keywords appear in my experience bullets, but only where my resume provides evidence for them.

Tone: Academic, professional, and direct.

Output: Provide the output using no Markdown, optimized for a clean, single-page layout. Focus on high information density."
` });
    if (document.getElementById('checkCL').checked) tasks.push({
        type: 'Cover Letter',
        prompt: `
        The Cover Letter (The "Anschreiben" Engine)
Goal: A one-page letter that looks like it was written by a high-level professional, not a bot.

The cover letter is for this JD: ${jd}.

Incoporate my personal details.

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
    });
    if (document.getElementById('checkDM').checked) tasks.push({
        type: 'DMs',
        prompt: `
The Outreach Engine (LinkedIn/Xing)
Goal: A high-conversion, direct message that gets a response from a busy recruiter.

Job Description: ${jd}
My Background: ${MASTER_CV}
Recruiter Name: ${rName}
My Name: ${namee}

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
    });
    if (document.getElementById('checkKeywords').checked) tasks.push({
        type: 'Keywords',
        prompt: `
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
    });

    try {
        let anySuccess = false;
        for (const task of tasks) {
            try {
                const response = await callGemini(task.prompt);
                displayResult(task.type, response);
                anySuccess = true;
            } catch (taskError) {
                console.error('Task failed:', task.type, taskError);
                displayResult(task.type, `Error: ${taskError.message || taskError}`);
            }
        }
        if (anySuccess) outputContainer.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        alert("Unexpected error. Check console.");
    } finally {
        loading.classList.add('hidden');
    }
}

async function callGemini(prompt) {

    const model = "gemini-3-flash-preview";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: systemInstruction,
                contents: [{ parts: [{ text: prompt }] }]
            })
        });


        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();

        if (!data) throw new Error('Empty response from Gemini API');

        // Common response path: data.candidates[0].content.parts[0].text
        const candidate = data.candidates && data.candidates[0];
        const textPart = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0];
        if (textPart && typeof textPart.text === 'string') return textPart.text;

        // Some models return candidates[0].output or candidates[0].output_text
        if (candidate && typeof candidate.output === 'string') return candidate.output;
        if (candidate && typeof candidate.output_text === 'string') return candidate.output_text;


    } catch (error) {
        console.log(error)
    }
}

function displayResult(title, text) {
    const resultsContent = document.getElementById('resultsContent');
    const div = document.createElement('div');
    div.className = "bg-gray-700 p-4 rounded border border-gray-600";
    div.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-blue-300">${title}</h3>
            <button class="bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded">Download PDF</button>
        </div>
        <pre class="whitespace-pre-wrap text-sm text-gray-200 font-sans">${text}</pre>
    `;

    const button = div.querySelector('button');
    button.addEventListener('click', () => downloadAsPDF(title, text));

    resultsContent.appendChild(div);
}

function downloadAsPDF(title, content) {
    // Prefer jsPDF if available to make a real PDF; otherwise fallback to text download
    if (window.jspdf && window.jspdf.jsPDF) {
        const doc = new window.jspdf.jsPDF();
        const margin = 10;
        const pageWidth = doc.internal.pageSize.getWidth() - (margin * 2);

        doc.setFontSize(16);
        doc.text(title.toUpperCase(), margin, 20);
        doc.setFontSize(11);

        const splitText = doc.splitTextToSize(content, pageWidth);
        doc.text(splitText, margin, 35);

        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

    } else {
        const blob = new Blob([title + '\n\n' + content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }
}

// Initialize safely once DOM is ready
(function init() {
    function setup() {
        const btn = document.getElementById('btnGenerate');
        if (btn) btn.addEventListener('click', generateAll);
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
})();
