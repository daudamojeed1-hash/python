let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple zeros at the start
    if (currentInput === '0' && num === '0') {
        return;
    }
    
    // Replace leading zero with the new number
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput === '') {
        return;
    }
    
    if (operation !== null && currentInput !== '') {
        calculate();
    }
    
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput.includes('.')) {
        return;
    }
    
    if (currentInput === '') {
        currentInput = '0';
    }
    
    currentInput += '.';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput === '') {
        return;
    }
    
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (operation === null || currentInput === '' || previousInput === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;
    
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function updateDisplay() {
    if (currentInput === '') {
        display.value = '0';
    } else {
        display.value = currentInput;
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();
