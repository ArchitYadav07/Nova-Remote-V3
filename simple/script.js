const statusBadge = document.getElementById('statusBadge');
const logsBox = document.getElementById('logs');
const connectBtn = document.getElementById('connectBtn');

const buyBtn = document.getElementById('buyBtn');
const sellBtn = document.getElementById('sellBtn');
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');

function addLog(message, type = 'event') {
    const p = document.createElement('p');
    p.className = `log-entry ${type}`;
    p.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
    logsBox.appendChild(p);
    logsBox.scrollTop = logsBox.scrollHeight;
}

function flashButton(buttonElement) {
    buttonElement.classList.add('active-flash');
    setTimeout(() => {
        buttonElement.classList.remove('active-flash');
    }, 200);
}

// Mouse Click Listeners for visual feedback
buyBtn.addEventListener('click', () => { addLog('BUY action triggered!', 'event'); flashButton(buyBtn); });
sellBtn.addEventListener('click', () => { addLog('SELL action triggered!', 'event'); flashButton(sellBtn); });
plusBtn.addEventListener('click', () => { addLog('PLUS action triggered!', 'event'); flashButton(plusBtn); });
minusBtn.addEventListener('click', () => { addLog('MINUS action triggered!', 'event'); flashButton(minusBtn); });

// Update UI to reflect Keyboard Mode
connectBtn.innerText = "Listening for Keyboard Input...";
connectBtn.disabled = true;
statusBadge.innerText = "Ready";
statusBadge.classList.remove('disconnected');
statusBadge.classList.add('connected');
addLog("Website is ready! Ensure this window is active and press the physical buttons on your ESP32.", "system");

// Listen for the Keystrokes sent by the ESP32 BLE Keyboard
document.addEventListener('keydown', (event) => {
    // Prevent default browser behavior for these keys if needed
    if (['b', 's', '+', '-'].includes(event.key.toLowerCase())) {
        addLog(`Received keystroke: '${event.key}'`, 'system');
        
        switch(event.key.toLowerCase()) {
            case 'b':
                buyBtn.click();
                break;
            case 's':
                sellBtn.click();
                break;
            case '+':
                plusBtn.click();
                break;
            case '-':
                minusBtn.click();
                break;
        }
    }
});
