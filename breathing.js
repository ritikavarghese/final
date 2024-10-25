const readyButton = document.getElementById('ready-button');
const startButton = document.getElementById('start-button');
const durationContainer = document.getElementById('duration-container');
const countdownContainer = document.getElementById('countdown-container');
const finalMessage = document.getElementById('final-message');
const breathingImage = document.getElementById('breathing-image');
const mainTitle = document.getElementById('main-title'); 

let breathingDuration; 

readyButton.addEventListener('click', () => {
    mainTitle.classList.add('hidden'); 
    document.getElementById('start-container').classList.add('hidden');
    durationContainer.classList.remove('hidden');
});

const durationRadios = document.querySelectorAll('input[name="duration"]');
durationRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        startButton.classList.remove('hidden'); 
    });
});

startButton.addEventListener('click', () => {
    const selectedDuration = document.querySelector('input[name="duration"]:checked');
    if (selectedDuration) {
        breathingDuration = parseInt(selectedDuration.value) * 60;
        durationContainer.classList.add('hidden');
        startCountdown();
    } else {
        alert('Please select a duration.');
    }
});

function startCountdown() {
    let countdown = 3;
    countdownContainer.innerHTML = countdown;
    countdownContainer.classList.remove('hidden');

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownContainer.innerHTML = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownContainer.classList.add('hidden');
            startBreathing();
        }
    }, 1000);
}

function startBreathing() {
    const totalBreaths = breathingDuration / 5; 
    let breathCount = 0;

    const breathingInterval = setInterval(() => {
        breathCount++;
        if (breathCount <= totalBreaths) {
            if (breathCount % 2 === 1) {
                breathingImage.style.transform = 'scale(1.5)'; 
                countdownContainer.innerHTML = "Breathe In";
            } else {
                breathingImage.style.transform = 'scale(1)'; 
                countdownContainer.innerHTML = "Breathe Out";
            }
        } else {
            clearInterval(breathingInterval);
            finalMessage.classList.remove('hidden');
            finalMessage.innerHTML = "I'm proud of you!";
        }
    }, 5000); 
}
