import { systemInstruction as SI } from "./systemMessage.js";
import { GeminiApiKey } from "./utils/apiKey.js";
import { getCoverLetterPrompt, getCVprompt, getDMPrompt, getKeywordsPrompt } from "./prompts.js";

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
