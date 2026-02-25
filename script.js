document.addEventListener('DOMContentLoaded', () => {
    // 1. Keyboard Interaction
    document.addEventListener('keydown', (e) => {
        // Ctrl + H for Home shortcut
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            navigateTo('home');
            showToast('Navigation: Home (Keyboard Shortcut)');
        }
    });

    // Enter key for card interactions
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => {
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                showToast(`Opening Module: ${card.querySelector('h3').innerText}`);
            }
        });
        // 2. Mouse Interaction
        card.addEventListener('click', () => {
            showToast(`Clicked Module: ${card.querySelector('h3').innerText}`);
        });
    });

    // 4. Voice Interaction (Web Speech API)
    const voiceTrigger = document.getElementById('voice-trigger');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        voiceTrigger.addEventListener('click', () => {
            voiceTrigger.classList.add('active');
            recognition.start();
            showToast('Listening for commands...');
        });

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            voiceTrigger.classList.remove('active');
            processVoiceCommand(command);
        };

        recognition.onerror = () => {
            voiceTrigger.classList.remove('active');
            showToast('Voice Error. Please try again.');
        };

        recognition.onend = () => {
            voiceTrigger.classList.remove('active');
        };
    } else {
        voiceTrigger.style.display = 'none';
        console.warn('Speech Recognition not supported in this browser.');
    }

    // 6. Permit Easy Reversal (Undo Submission)
    let lastSubmission = null;

    const hciForm = document.getElementById('hci-form');
    hciForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit();
    });

    function handleSubmit() {
        const name = document.getElementById('name').value;
        lastSubmission = { name, time: Date.now() };

        showToast(`Success! Message sent by ${name}. `, true);
        hciForm.reset();
    }

    function undoSubmission() {
        if (lastSubmission) {
            showToast('Submission undone.');
            lastSubmission = null;
        }
    }

    function processVoiceCommand(command) {
        showToast(`Voice Command: "${command}"`);
        if (command.includes('home') || command.includes('open home')) {
            navigateTo('home');
        } else if (command.includes('courses') || command.includes('open courses')) {
            navigateTo('courses');
        } else if (command.includes('modes') || command.includes('open modes') || command.includes('interactions')) {
            navigateTo('courses'); // Using courses as a proxy for modes section
        } else if (command.includes('submit form') || command.includes('submit')) {
            handleSubmit();
        } else if (command.includes('contact') || command.includes('open contact')) {
            navigateTo('contact');
        }
    }

    // 3. Touch Interaction (Visual ripple on touch)
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createVisualFeedback(touch.pageX, touch.pageY);
    }, { passive: true });

    function createVisualFeedback(x, y) {
        const circle = document.createElement('div');
        circle.className = 'touch-ripple';
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        document.body.appendChild(circle);

        setTimeout(() => circle.remove(), 600);
    }

    function navigateTo(id) {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // 5. Visual Feedback (Toast Messaging)
    function showToast(message, canUndo = false) {
        const toast = document.getElementById('status-toast');
        const toastMsg = document.getElementById('toast-message');

        // Clear previous content
        toastMsg.innerHTML = message;

        if (canUndo) {
            const undoBtn = document.createElement('button');
            undoBtn.innerText = 'Undo';
            undoBtn.className = 'btn-undo';
            undoBtn.onclick = undoSubmission;
            toastMsg.appendChild(undoBtn);
        }

        toast.classList.remove('hidden');

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    }
});
