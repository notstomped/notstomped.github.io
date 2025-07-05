// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '🌞';
} else {
    body.classList.add('dark-theme');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});

// Form validation logic
document.getElementById('form1').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('input1').value.toLowerCase().replace(/\s/g, '');
    const resultDiv = document.getElementById('result1');
    if (input === 'cap') {
        resultDiv.textContent = 'AYYYYYYYYYYY DU HELD.';
        resultDiv.className = 'result success';
    } else if (input === 'san' || input === 'diego') {
        resultDiv.textContent = 'Falsches Feld :p';
        resultDiv.className = 'result wrongfield';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else if (
        input === 'cap' ||
        input.replace(/[^a-zA-Z]/g, '').toLowerCase() === 'cap' ||
        input.startsWith('cap') ||
        input.endsWith('cap')
    ) {
        resultDiv.textContent = 'Knappe Sache.';
        resultDiv.className = 'result almost';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else {
        resultDiv.textContent = 'Nö..';
        resultDiv.className = 'result error';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    }
});

document.getElementById('form2').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('input2').value.toLowerCase().replace(/\s/g, '');
    const resultDiv = document.getElementById('result2');
    if (input === 'san') {
        resultDiv.textContent = 'AYYYYYYYYYYY DU HELD.';
        resultDiv.className = 'result success';
    } else if (input === 'cap' || input === 'diego') {
        resultDiv.textContent = 'Falsches Feld :p';
        resultDiv.className = 'result wrongfield';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else if (
        input === 'san' ||
        input.replace(/[^a-zA-Z]/g, '').toLowerCase() === 'san' ||
        input.startsWith('san') ||
        input.endsWith('san')
    ) {
        resultDiv.textContent = 'Knappe Sache.';
        resultDiv.className = 'result almost';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else {
        resultDiv.textContent = 'Nö..';
        resultDiv.className = 'result error';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    }
});

document.getElementById('form3').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('input3').value.toLowerCase().replace(/\s/g, '');
    const resultDiv = document.getElementById('result3');
    if (input === 'diego') {
        resultDiv.textContent = 'AYYYYYYYYYYY DU HELD.';
        resultDiv.className = 'result success';
    } else if (input === 'cap' || input === 'san') {
        resultDiv.textContent = 'Falsches Feld :p';
        resultDiv.className = 'result wrongfield';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else if (
        input === 'diego' ||
        input.replace(/[^a-zA-Z]/g, '').toLowerCase() === 'diego' ||
        input.startsWith('diego') ||
        input.endsWith('diego')
    ) {
        resultDiv.textContent = 'Knappe Sache.';
        resultDiv.className = 'result almost';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    } else {
        resultDiv.textContent = 'Nö..';
        resultDiv.className = 'result error';
        // Count as error
        let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
        localStorage.setItem('totalErrors', totalErrors + 1);
    }
});

document.getElementById('checkAllBtn').addEventListener('click', function() {
    const pw1 = document.getElementById('input1').value.toLowerCase().replace(/\s/g, '');
    const pw2 = document.getElementById('input2').value.toLowerCase().replace(/\s/g, '');
    const pw3 = document.getElementById('input3').value.toLowerCase().replace(/\s/g, '');
    const resultDiv = document.getElementById('resultAll');
    let wrong = [];
    let checkAllErrors = 0;
    
    // Check each field and count errors for wrong answers
    if (pw1 !== 'cap') {
        wrong.push('Wort 1');
        checkAllErrors++;
    }
    if (pw2 !== 'san') {
        wrong.push('Wort 2');
        checkAllErrors++;
    }
    if (pw3 !== 'diego') {
        wrong.push('Wort 3');
        checkAllErrors++;
    }
    
    // Add the check all errors to total errors
    let totalErrors = parseInt(localStorage.getItem('totalErrors')) || 0;
    totalErrors += checkAllErrors;
    localStorage.setItem('totalErrors', totalErrors);
    
    // Turn off the bubble slider (but keep it functional)
    const minigameToggle = document.getElementById('minigameToggle');
    minigameToggle.checked = false;
    
    // Stop the bubble game
    if (bubbleGame) {
        bubbleGame.stop();
    }
    
    if (wrong.length === 0) {
        const poppedBubbles = parseInt(localStorage.getItem('poppedBubbles')) || 0;
        const missedBubbles = parseInt(localStorage.getItem('missedBubbles')) || 0;
        const totalBubbles = poppedBubbles + missedBubbles;
        
        // Show success in main result
        resultDiv.textContent = 'Alle richtig! 🎉';
        resultDiv.style.color = 'green';
        
        // Show detailed stats in stats box
        showStatsBox(true, totalErrors, poppedBubbles, missedBubbles, totalBubbles);
    } else {
        const poppedBubbles = parseInt(localStorage.getItem('poppedBubbles')) || 0;
        const missedBubbles = parseInt(localStorage.getItem('missedBubbles')) || 0;
        const totalBubbles = poppedBubbles + missedBubbles;
        
        // Show error in main result
        resultDiv.textContent = `Falsch: ${wrong.join(', ')}`;
        resultDiv.style.color = 'red';
        
        // Show detailed stats in stats box
        showStatsBox(false, totalErrors, poppedBubbles, missedBubbles, totalBubbles, wrong);
    }
});

// Function to show and populate the stats box
function showStatsBox(isSuccess, totalErrors, poppedBubbles, missedBubbles, totalBubbles, wrongFields = []) {
    const statsContainer = document.getElementById('statsContainer');
    const resultStatus = document.getElementById('resultStatus');
    const errorStat = document.getElementById('errorStat');
    const poppedStat = document.getElementById('poppedStat');
    const missedStat = document.getElementById('missedStat');
    
    // Clear any existing special messages from all possible containers first
    [resultStatus, errorStat, poppedStat, missedStat].forEach(container => {
        const existingSpecials = container.querySelectorAll('.special-message');
        existingSpecials.forEach(el => el.remove());
    });
    
    // Set result status text and class
    if (isSuccess) {
        if (totalErrors === 0) {
            strA = '🎉 First try!<br>';
        } else {
            strA = '🎉 Glückwunsch! Alle Wörter korrekt!<br>';
        }
        // Set the final result status text with hyperlink
        resultStatus.innerHTML = strA + '<a href="https://www.hidden.games/escape-room-hamburg/" target="_blank" style="color: #4a9eff; text-decoration: underline;">Wir wollen dich einsperren</a>'; 
        resultStatus.className = 'result-status success';
    } else {
        resultStatus.textContent = `❌ Noch nicht ganz richtig: ${wrongFields.join(', ')}`;
        resultStatus.className = 'result-status error';
    }
    
    // Add special messages to their respective boxes (multiple can be displayed)
    
    // Success-related specials on result status
    if (isSuccess && totalErrors === 0) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nerd';
        specialEl.textContent = 'NERD!';
        resultStatus.appendChild(specialEl);
    }
    
    // Check for music play special (show message only once after reaching 23 plays)
    const completeMusicPlays = parseInt(localStorage.getItem('completeMusicPlays')) || 0;
    const hasShown23Message = localStorage.getItem('shown23Message') === 'true';
    if (completeMusicPlays >= 23 && !hasShown23Message) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-birthday';
        specialEl.textContent = '🎉 du bist alt! 🎉';
        resultStatus.appendChild(specialEl);
        localStorage.setItem('shown23Message', 'true');
    }
    
    // Error-related specials on error stat box
    if (totalErrors === 69 || totalErrors === 420) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nice';
        specialEl.textContent = 'nice.';
        errorStat.appendChild(specialEl);
    }
    if (totalErrors === 57) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-birthday';
        specialEl.textContent = 'Happy bday!';
        errorStat.appendChild(specialEl);
    }
    if (totalErrors === 12) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-birthday';
        specialEl.textContent = 'happy bday.';
        errorStat.appendChild(specialEl);
    }
    if (totalErrors > 100) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-bored';
        specialEl.textContent = 'mf ist am raten.';
        errorStat.appendChild(specialEl);
    }
    
    // Popped bubbles specials on popped stat box
    if (poppedBubbles === 69 || poppedBubbles === 420) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nice';
        specialEl.textContent = 'nice.';
        poppedStat.appendChild(specialEl);
    }
    if (poppedBubbles === 1) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nice';
        specialEl.textContent = 'first!';
        poppedStat.appendChild(specialEl);
    }
    if (poppedBubbles === 57 || poppedBubbles === 12) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-birthday';
        specialEl.textContent = 'happy bday.';
        poppedStat.appendChild(specialEl);
    }
    if (poppedBubbles === 100) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-bored';
        specialEl.textContent = 'century!';
        poppedStat.appendChild(specialEl);
    }
    if (poppedBubbles > 1000) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-extreme';
        specialEl.textContent = 'geh gras anfassen.';
        poppedStat.appendChild(specialEl);
    } else if (poppedBubbles > 500) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-bored';
        specialEl.textContent = 'ist dir langweilig?';
        poppedStat.appendChild(specialEl);
    }
    
    // Missed bubbles specials on missed stat box
    if (missedBubbles === 69 || missedBubbles === 420) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nice';
        specialEl.textContent = 'nice.';
        missedStat.appendChild(specialEl);
    }
    if (missedBubbles === 57 || missedBubbles === 12) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-birthday';
        specialEl.textContent = 'happy bday.';
        missedStat.appendChild(specialEl);
    }
    if (missedBubbles === 1) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-nice';
        specialEl.textContent = 'oops!';
        missedStat.appendChild(specialEl);
    }
    if (missedBubbles > 100) {
        const specialEl = document.createElement('span');
        specialEl.className = 'special-message special-bored';
        specialEl.textContent = 'schlecht..';
        missedStat.appendChild(specialEl);
    }
    
    // Update error count (hide if 0 errors on first try)
    if (totalErrors === 0 && isSuccess) {
        errorStat.style.display = 'none';
    } else {
        errorStat.style.display = 'block';
        errorStat.querySelector('.stat-number').textContent = totalErrors;
    }
    
    // Show/hide bubble stats based on activity
    if (totalBubbles > 0) {
        poppedStat.style.display = 'block';
        missedStat.style.display = 'block';
        poppedStat.querySelector('.stat-number').textContent = poppedBubbles;
        missedStat.querySelector('.stat-number').textContent = missedBubbles;
    } else {
        poppedStat.style.display = 'none';
        missedStat.style.display = 'none';
    }
    
    // Show the stats container with animation
    statsContainer.style.display = 'block';
    setTimeout(() => {
        statsContainer.classList.add('show');
    }, 50);
    
    // Smooth scroll to stats box (especially important on mobile)
    setTimeout(() => {
        statsContainer.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
    }, 300);
}

// Minigame toggle functionality
const minigameToggle = document.getElementById('minigameToggle');

minigameToggle.addEventListener('change', function() {
    if (this.checked) {
        // Start the game if it's not running
        if (bubbleGame && !bubbleGame.isRunning) {
            bubbleGame.start();
        }
    } else {
        // Stop the game
        if (bubbleGame) {
            bubbleGame.stop();
        }
    }
});

// Simple Bubble Minigame
class SimpleBubbleGame {
    constructor() {
        // Reset counters on page reload
        localStorage.removeItem('poppedBubbles');
        localStorage.removeItem('missedBubbles');
        localStorage.removeItem('totalErrors');
        this.poppedCount = 0;
        this.missedCount = 0;
        this.totalErrors = 0;
        this.activeBubbles = [];
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('Starting simple bubble game');
        this.spawnBubble();
    }

    spawnBubble() {
        if (!this.isRunning) return;

        // Create bubble element
        const bubble = document.createElement('div');
        bubble.className = 'bubble floating';
        
        // Random position at bottom of screen (mobile-friendly)
        const bubbleSize = window.innerWidth <= 480 ? 70 : window.innerWidth <= 768 ? 60 : 50;
        const margin = bubbleSize + 20; // Extra margin for safe touch area
        const x = Math.random() * (window.innerWidth - margin * 2) + margin;
        bubble.style.left = x + 'px';
        bubble.style.top = window.innerHeight + 'px'; // Start at bottom

        // Track if bubble was clicked
        let wasClicked = false;

        // Click and touch handler - instant pop
        const handleBubblePop = () => {
            if (wasClicked) return;
            wasClicked = true;
            // Stop the floating animation immediately
            bubble.style.animation = 'none';
            this.popBubble(bubble, true);
        };

        bubble.addEventListener('click', handleBubblePop);
        bubble.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            handleBubblePop();
        });

        // Add to DOM and track
        document.body.appendChild(bubble);
        this.activeBubbles.push(bubble);

        // Auto-pop after 6 seconds if not clicked (time for full animation)
        setTimeout(() => {
            if (!wasClicked && bubble.parentNode) {
                this.popBubble(bubble, false);
            }
        }, 6000);
        setTimeout(() => {
            if (!wasClicked && bubble.parentNode) {
                this.popBubble(bubble, false);
            }
        }, 4000);

        // Schedule next bubble (5 seconds delay)
        setTimeout(() => {
            if (this.isRunning) {
                this.spawnBubble();
            }
        }, bubbleDelay);
    }

    popBubble(bubble, wasClicked) {
        if (!bubble.parentNode) return;

        // Add fade animation
        bubble.classList.add('fading');

        // Update counters
        if (wasClicked) {
            this.poppedCount++;
            localStorage.setItem('poppedBubbles', this.poppedCount);
            console.log('Bubble clicked! Popped:', this.poppedCount);
        } else {
            this.missedCount++;
            localStorage.setItem('missedBubbles', this.missedCount);
            console.log('Bubble missed! Missed:', this.missedCount);
        }

        // Remove after fade animation (0.5s animation time)
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
            // Remove from tracking array
            const index = this.activeBubbles.indexOf(bubble);
            if (index > -1) {
                this.activeBubbles.splice(index, 1);
            }
        }, 500);
    }

    stop() {
        this.isRunning = false;
        // Clean up any remaining bubbles
        this.activeBubbles.forEach(bubble => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        });
        this.activeBubbles = [];
    }

    getStats() {
        return {
            popped: this.poppedCount,
            missed: this.missedCount
        };
    }
}

// Initialize and start bubble game
let bubbleGame;
document.addEventListener('DOMContentLoaded', () => {
    bubbleGame = new SimpleBubbleGame();
    
    // Ensure toggle is OFF after reload
    const minigameToggle = document.getElementById('minigameToggle');
    minigameToggle.checked = false;
    
    // Start after 2 seconds only if toggle is checked
    setTimeout(() => {
        if (minigameToggle.checked) {
            bubbleGame.start();
        }
    }, 2000);
});

// Music toggle functionality
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

// Initialize music play counter
let completePlays = parseInt(localStorage.getItem('completeMusicPlays')) || 0;

// Set initial volume
backgroundMusic.volume = 0.3;

// Set initial button state
musicToggle.classList.add('paused');

// Track if music has finished playing completely
backgroundMusic.addEventListener('ended', function() {
    completePlays++;
    localStorage.setItem('completeMusicPlays', completePlays);
    console.log(`Music played completely ${completePlays} times`);
    
    // Reset button to paused state
    musicToggle.classList.remove('playing');
    musicToggle.classList.add('paused');
});

// Handle music toggle click
musicToggle.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        // Start playing
        backgroundMusic.play().catch(e => {
            console.log('Could not play music:', e);
        });
        musicToggle.classList.remove('paused');
        musicToggle.classList.add('playing');
    } else {
        // Pause/stop playing
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to beginning
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('paused');
    }
});
