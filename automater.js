import { systemInstruction as SI } from "./systemMessage.js";
import { GeminiApiKey } from "./utils/apiKey.js";
import { getCoverLetterPrompt, getCVprompt, getDMPrompt, getKeywordsPrompt, getBatchedQuestionsAnswerPrompt } from "./prompts.js";
import { namee as NAME, email as EMAIL, phone as PHONE, github as GITHUB, linkedin as LINKEDIN, github as GITHUB_URL, linkedin as LINKEDIN_URL, city as CITY, country as COUNTRY, degree as DEGREE, university as UNIVERSITY, languages as LANGUAGES, toolAndPlatforms as TOOLS_PLATFORMS, specializations as SPECIALIZATIONS, programmingLanguages as LANGUAGES_FRAMEWORKS } from "./utils/personalDetails.js";

const API_KEY = GeminiApiKey || 'YOUR_GEMINI_API_KEY_HERE';

const systemInstruction = {
    parts: [{
        text: SI
    }]
};

async function generateAll() {
    const jd = document.getElementById('jdInput');
    const rName = document.getElementById('recruiterName').value || "Hiring Manager";
    const loading = document.getElementById('loading');
    const outputContainer = document.getElementById('outputContainer');
    const resultsContent = document.getElementById('resultsContent');

    // if (!jd.value) return alert("Paste a JD first!");
    jd.textContent = `About RoomPriceGenie ✨🧞‍♂️

Founded in 2017, RoomPriceGenie is dedicated to helping hoteliers around the globe achieve optimal pricing. 🌍 We understand that many small hotels face challenges with digitalization, making their operations increasingly complex and often resulting in lost revenue. This is where we come in!

We have developed a powerful solution that enables hotels to set the right prices in just seconds. ⏱️ Our state-of-the-art algorithm analyzes both internal hotel data and market trends to recommend pricing strategies that enhance revenue and improve booking rates.

With customers spanning the globe—from the USA and Canada to Iceland, South Africa, China, Slovenia, Italy, and the UK—RoomPriceGenie has made a meaningful impact in the hospitality industry, and our clients love the results. ❤️

Now, we are excited to expand our customer base and spread the word about how we can support hoteliers in optimizing their pricing strategies. We invite you to join us on this journey! We actively encourage applications from candidates with diverse backgrounds to enrich our team and drive innovation.

Your Role
As a Senior Fullstack Engineer in the Customer Journey Team (Growth) at RoomPriceGenie, you’ll build the systems that power user activation, engagement and long-term success.

You’ll focus primarily on backend development using Python/Django, designing and delivering features end-to-end, from problem discovery and system design to implementation, testing and deployment.

While backend will be your primary focus, you’ll also collaborate across the stack and occasionally contribute to our React / Typescript frontend.

You’ll operate with high autonomy, combining technical excellence with strong product awareness. Together with Product and Design, you’ll help us build a data-informed, experimentation-driven product that continuously improves the customer journey.

What You’ll Do
Design, build and maintain robust backend services and APIs using Python/Django.

Contribute to our React / Typescript frontend when building full user-facing features.

Take end-to-end ownership of product initiatives, from discovery to deployment, monitoring and iteration.

Write clean, maintainable and well-tested code, applying modern testing practices across unit, integration and functional layers.

Collaborate closely with Product, Data and Design to deliver meaningful product improvements.

Ensure strong observability, performance and reliability across services supporting our growth initiatives.

Help instrument systems with the right events and data signals to support product analytics and experimentation.

Participate in architecture discussions and technical reviews, helping raise the engineering bar.

Drive continuous improvement in how we design, test, deploy and monitor our systems.

Your Profile
Strong professional experience as a Software Engineer, with deep backend expertise.

Advanced proficiency in Python / Django.

Experience with Typescript / React or similar modern frontend frameworks.

Strong understanding of software design, testing practices and scalable architectures.

Experience working in product-driven SaaS environments is a strong plus.

Experience with CI/CD pipelines, AWS infrastructure and modern observability tools.

A product-minded engineer who understands trade-offs, user needs and impact-driven development.

High ownership mentality — you enjoy taking projects from idea to measurable outcome.

Strong collaboration and communication skills.

Fluent in English and based in the European time zone (UTC+0 to UTC+2).

Nice to Have
Experience with:

Snowflake, Airflow, dbt, Dagster, Cube or similar data platforms.

Event-driven architectures (Kafka, Celery, message queues).

Product experimentation frameworks or analytics tooling.

What We Offer at RoomPriceGenie 💪

At RoomPriceGenie, we don’t just offer jobs; we offer an adventure! 🚀 Join us in an exciting startup atmosphere where you can grow your career while changing the world for tens of thousands of independent hoteliers. 🌍 Our global and diverse team is fueled by passion and a shared mission. We thrive in a culture that’s all about transparency, respect, and making a real impact together.

Here’s what you can expect when you become part of our Genie family:

Remote-First Model: You can work flexibly from anywhere. 🌍🧑‍💻At the same time, we support co-working and you’re of course welcome to work from our offices in Mannheim, Berlin, or Sydney whenever you like. 🏢

One Team, One Vision, One Goal: We’re in this together! 🤝 Our Genies are laser-focused on our mission, collaborating to make magic happen. ✨ It’s no wonder we score a stellar 9.3 from our team members! 🌟

Epic Team Gatherings: Every year, we bring our global crew together 🌎 for a week of networking, brainstorming, and fun. 🎉 Plus, enjoy regular hangouts in our offices to keep the camaraderie alive.

Growth and Development: We’re all about lifelong learning! 📚 Level up your skills with personal and professional development opportunities. You’ll even snag up to three extra days off each year to focus on your growth. 📈

5 Years? 5 Weeks! Stick with us, and we’ll reward your loyalty. After five years, you’ll earn an incredible five weeks of bonus vacation time 🏖️ to recharge and explore the world. 🌍

Birthday Celebrations: It’s your day, so take it off! 🎂 Celebrate your birthday the way you want, guilt-free.

Flexible Hours: We get it—life happens! ⏰ We offer flexible working hours to help you balance your work and personal life seamlessly.

Wellbeing Matters: Your mental health is a top priority. 🧘 Every Genie gets access to Headspace, the leading meditation app, to help you cultivate a happier, healthier, and more zen life. 🌿

BetterHelp Support: We also offer BetterHelp, a professional online therapy and counseling platform, giving you additional support whenever you need it.💛🧠

We kindly ask that recruitment agencies refrain from reaching out regarding this vacancy. Thank you for your understanding.`

    if (API_KEY === 'YOUR_GEMINI_API_KEY_HERE') return alert("Enter your API Key in the script first!");

    loading.classList.remove('hidden');
    resultsContent.innerHTML = '';

    const tasks = [];
    if (document.getElementById('checkCV').checked) tasks.push({
        type: 'CV',
        prompt: getCVprompt(jd)
    });

    if (document.getElementById('checkCL').checked) tasks.push({
        type: 'Cover Letter',
        prompt: getCoverLetterPrompt(jd)
    });

    if (document.getElementById('checkDM').checked) {
        const dmType = document.querySelector('input[name="dmType"]:checked')?.value || 'general';
        tasks.push({
            type: 'DMs',
            prompt: getDMPrompt(jd, rName, dmType)
        });
    }

    if (document.getElementById('checkKeywords').checked) tasks.push({
        type: 'Keywords',
        prompt: getKeywordsPrompt(jd)
    });

    if (document.getElementById('checkQuestions').checked) {
        const qInputs = document.querySelectorAll('#questionsList input[type="text"]');
        const questions = [];
        qInputs.forEach(input => {
            if (input.value.trim()) {
                questions.push(input.value.trim());
            }
        });

        if (questions.length > 0) {
            tasks.push({
                type: 'Screening Questions',
                prompt: getBatchedQuestionsAnswerPrompt(jd, questions)
            });
        }
    }

    try {
        for (const task of tasks) {
            try {
                const response = await callGemini(task.prompt);
                await displayResult(task.type, response);
                outputContainer.classList.remove('hidden');
            } catch (taskError) {
                console.log({ taskType: task.type, taskError });
                await displayResult(task.type, `Error: ${taskError.message || taskError}`);
            }
        }
    } catch (error) {
        console.log({ error });
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

async function displayResult(title, text) {
    if (title === 'CV') {
        const resultsContent = document.getElementById('resultsContent');
        const mainContainer = document.createElement('div');
        mainContainer.className = "bg-gray-700 p-4 rounded border border-gray-600";
        mainContainer.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-blue-300">${title}</h3>
            <button class="download-cv-btn bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded hidden">Download DOCX</button>
        </div>
        <div class="cv-render-container bg-white rounded p-4 min-h-[300px]"></div>
        <div class="cv-status-text text-gray-400 mt-2">Generating CV preview from template...</div>
    `;
        resultsContent.appendChild(mainContainer);

        const cvContainer = mainContainer.querySelector('.cv-render-container');
        const statusText = mainContainer.querySelector('.cv-status-text');
        // const downloadBtn = mainContainer.querySelector('.download-cv-btn');

        try {
            let cleanText = text.replace(/^```json\s*/, '').replace(/```$/, '');
            const cvData = JSON.parse(cleanText);
            console.log({ text, cvData })

            const normalizedCVdata = normalizeCVdata(cvData);
            console.log({ normalizedCVdata });

            const response = await fetch('templates/temp_doc_3.docx');
            if (!response.ok) {
                throw new Error('Could not load `templates/temp_doc_3.docx`. Please ensure the file exists.');
            }
            const templateArrayBuffer = await response.arrayBuffer();

            const zip = new window.PizZip(templateArrayBuffer);
            const doc = new window.docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            doc.setData(normalizedCVdata);
            doc.render();

            const generatedBlob = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            // Check if docx-preview is loaded
            // if (window.docx && typeof window.docx.renderAsync === 'function') {
            await window.docx.renderAsync(generatedBlob, cvContainer);
            // } else {
            //     // Fallback: Just show a message that preview isn't available
            //     cvContainer.innerHTML = '<p class="text-gray-600">Preview not available. You can download the file instead.</p>';
            //     // Show the download button
            //     downloadBtn.classList.remove('hidden');

            //     // Set up download functionality
            //     downloadBtn.onclick = () => {
            //         const url = window.URL.createObjectURL(generatedBlob);
            //         const a = document.createElement('a');
            //         a.href = url;
            //         a.download = 'generated_cv.docx';
            //         document.body.appendChild(a);
            //         a.click();
            //         document.body.removeChild(a);
            //         window.URL.revokeObjectURL(url);
            //     };
            // }

            statusText.textContent = 'CV preview generated successfully!';
            statusText.classList.remove('text-gray-400');
            statusText.classList.add('text-green-400');

        } catch (error) {
            console.error('CV Generation Error:', error);
            statusText.textContent = 'Error generating CV preview.';
            statusText.classList.remove('text-gray-400');
            statusText.classList.add('text-red-400');
        }
    }
    else if (title === 'Screening Questions') {
        const resultsContent = document.getElementById('resultsContent');
        const mainContainer = document.createElement('div');
        mainContainer.className = "bg-gray-700 p-4 rounded border border-gray-600";
        mainContainer.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-blue-300">${title}</h3>
            </div>
            <div class="space-y-6"></div>
        `;

        const answersContainer = mainContainer.querySelector('.space-y-6');

        try {
            const qaPairs = JSON.parse(text);
            qaPairs.forEach(pair => {
                const qaDiv = document.createElement('div');
                qaDiv.className = "border-t border-gray-600 pt-4";
                qaDiv.innerHTML = `
                    <p class="font-semibold text-gray-300 mb-2">${pair.question}</p>
                    <div>
                        <pre class="whitespace-pre-wrap text-sm text-gray-200 font-sans">${pair.answer}</pre>
                    </div>
                `;
                answersContainer.appendChild(qaDiv);
            });
        } catch (e) {
            console.error("Failed to parse screening questions JSON:", e);
            answersContainer.innerHTML = `<pre class="whitespace-pre-wrap text-sm text-red-400 font-sans">Error: Could not parse the response from the AI. Raw response:\n\n${text}</pre>`;
        }

        resultsContent.appendChild(mainContainer);
    } else {
        const resultsContent = document.getElementById('resultsContent');
        const div = document.createElement('div');
        div.className = "bg-gray-700 p-4 rounded border border-gray-600";
        div.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-blue-300">${title}</h3>
                <button class="bg-green-600 hover:bg-green-700 text-xs px-3 py-1 rounded">Download PDF</button>
            </div>
            <div contenteditable="true">
                <pre class="whitespace-pre-wrap text-sm text-gray-200 font-sans">${text}</pre>
            </div>
        `;

        const button = div.querySelector('button');
        const preTag = div.querySelector('div[contenteditable="true"] pre');
        button.addEventListener('click', () => downloadAsPDF(title, preTag));

        resultsContent.appendChild(div);
    }
}
function normalizeCVdata(cvData) {
    return {
        ...cvData,
        NAME,
        EMAIL,
        PHONE,
        GITHUB,
        LINKEDIN,
        CITY,
        COUNTRY,
        DEGREE,
        UNIVERSITY,
        LANGUAGES
    }
}

function downloadAsPDF(title, preTag) {
    const content = preTag.innerText;
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

function init() {
    function setup() {
        const btn = document.getElementById('btnGenerate');
        if (btn) btn.addEventListener('click', generateAll);

        // Toggle DM message type options visibility
        const dmCheckbox = document.getElementById('checkDM');
        const dmOptionsContainer = document.getElementById('dmOptionsContainer');

        if (dmCheckbox && dmOptionsContainer) {
            dmCheckbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    dmOptionsContainer.classList.remove('hidden');
                } else {
                    dmOptionsContainer.classList.add('hidden');
                }
            });
        }

        // Questions Logic
        const checkQuestions = document.getElementById('checkQuestions');
        const questionsContainer = document.getElementById('questionsContainer');
        const btnAddQuestion = document.getElementById('btnAddQuestion');
        const questionsList = document.getElementById('questionsList');

        if (checkQuestions && questionsContainer) {
            checkQuestions.addEventListener('change', (e) => {
                e.target.checked ? questionsContainer.classList.remove('hidden') : questionsContainer.classList.add('hidden');
            });
        }

        if (btnAddQuestion && questionsList) {
            btnAddQuestion.addEventListener('click', () => {
                const div = document.createElement('div');
                div.className = "flex items-center space-x-2 animate-fade-in";
                div.innerHTML = `
                    <input type="text" placeholder="Paste question..." class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 outline-none">
                `;
                const btnRemove = document.createElement('button');
                btnRemove.className = "text-red-400 hover:text-red-300 font-bold px-1";
                btnRemove.innerHTML = "&times;";
                btnRemove.onclick = () => div.remove();
                div.appendChild(btnRemove);
                questionsList.appendChild(div);
            });
        }
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }
};

init(); 
