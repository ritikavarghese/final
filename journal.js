const emotionContinueButton = document.getElementById('emotion-continue');
const mentalContinueButton = document.getElementById('mental-continue');
const thoughtsContinueButton = document.getElementById('thoughts-continue');
const addEntryButton = document.getElementById('add-entry-button');

const emotionQuestion = document.getElementById('emotion-question');
const mentalStateQuestion = document.getElementById('mental-state-question');
const thoughtsQuestion = document.getElementById('thoughts-question');
const addEntrySection = document.getElementById('add-entry-section');
const journalEntries = document.getElementById('journal-entries');


const getCheckedValues = (selector) => {
    return Array.from(document.querySelectorAll(selector + ' input:checked'))
                .map(checkbox => checkbox.value);
};


const saveEntry = (entry) => {
    const currentDate = new Date().toLocaleDateString();
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || {};
    if (!entries[currentDate]) entries[currentDate] = [];
    entries[currentDate].push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
};


const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || {};
    journalEntries.innerHTML = '';

    for (const [date, dateEntries] of Object.entries(entries)) {
        const dateSection = document.createElement('div');
        dateSection.classList.add('date-section');
        dateSection.innerHTML = `<h2>${date}</h2>`;

        dateEntries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <p><strong>Emotions:</strong> ${entry.emotions.join(', ')}</p>
                <p><strong>Mental State:</strong> ${entry.mentalState.join(', ')}</p>
                <p><strong>Thoughts:</strong> ${entry.thoughts}</p>
            `;
            dateSection.appendChild(entryDiv);
        });

        journalEntries.appendChild(dateSection);
    }


    const today = new Date().toLocaleDateString();
    if (entries[today] && entries[today].length > 0) {
        addEntrySection.classList.remove('hidden');
    }
};


const clearCheckboxes = (selector) => {
    const checkboxes = document.querySelectorAll(selector + ' input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
};


emotionContinueButton.addEventListener('click', () => {
    const emotions = getCheckedValues('#emotion-options');
    if (emotions.length > 0) {
        emotionQuestion.classList.add('hidden');
        mentalStateQuestion.classList.remove('hidden');
        sessionStorage.setItem('emotions', JSON.stringify(emotions));
    } else {
        alert('Please select at least one emotion.');
    }
});


mentalContinueButton.addEventListener('click', () => {
    const mentalState = getCheckedValues('#mental-state-options');
    if (mentalState.length > 0) {
        mentalStateQuestion.classList.add('hidden');
        thoughtsQuestion.classList.remove('hidden');
        sessionStorage.setItem('mentalState', JSON.stringify(mentalState));
    } else {
        alert('Please select at least one mental state.');
    }
});


thoughtsContinueButton.addEventListener('click', () => {
    const emotions = JSON.parse(sessionStorage.getItem('emotions'));
    const mentalState = JSON.parse(sessionStorage.getItem('mentalState'));
    const thoughts = document.getElementById('thoughts-input').value;

    const entry = { emotions, mentalState, thoughts };
    saveEntry(entry);
    loadEntries();


    thoughtsQuestion.classList.add('hidden');
    document.getElementById('thoughts-input').value = ''; 
});


addEntryButton.addEventListener('click', () => {
    emotionQuestion.classList.remove('hidden'); 
    clearCheckboxes('#emotion-options');
    clearCheckboxes('#mental-state-options'); 
    document.getElementById('thoughts-input').value = ''; 
    journalEntries.scrollIntoView({ behavior: 'smooth', block: 'end' }); 
});


document.addEventListener('DOMContentLoaded', loadEntries);