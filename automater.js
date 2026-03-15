import { systemInstruction as SI } from "./systemMessage.js";
import { GeminiApiKey } from "./utils/apiKey.js";
import { getCoverLetterPrompt, getCVprompt, getDMPrompt, getKeywordsPrompt, getBatchedQuestionsAnswerPrompt } from "./prompts.js";

const API_KEY = GeminiApiKey || 'YOUR_GEMINI_API_KEY_HERE';

const systemInstruction = {
    parts: [{
        text: SI
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
                displayResult(task.type, response);
                outputContainer.classList.remove('hidden');
            } catch (taskError) {
                console.log({ taskType: task.type, taskError });
                displayResult(task.type, `Error: ${taskError.message || taskError}`);
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

function displayResult(title, text) {
    if (title === 'Screening Questions') {
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
