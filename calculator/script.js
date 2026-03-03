document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    function updateDisplay(value) {
        display.innerText = value;
    }

    function handleNumber(number) {
        currentInput += number;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '' && previousInput === '') {
            return;
        }
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        if (!operator || currentInput === '' || previousInput === '') {
            return;
        }

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
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
                    alert('Error: Division by zero');
                    clearAll();
                    return;
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        updateDisplay(result);
        currentInput = result.toString();
        previousInput = '';
        operator = null;
    }

    function clearAll() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('');
    }

    document.getElementById('zero').addEventListener('click', () => handleNumber('0'));
    document.getElementById('one').addEventListener('click', () => handleNumber('1'));
    document.getElementById('two').addEventListener('click', () => handleNumber('2'));
    document.getElementById('three').addEventListener('click', () => handleNumber('3'));
    document.getElementById('four').addEventListener('click', () => handleNumber('4'));
    document.getElementById('five').addEventListener('click', () => handleNumber('5'));
    document.getElementById('six').addEventListener('click', () => handleNumber('6'));
    document.getElementById('seven').addEventListener('click', () => handleNumber('7'));
    document.getElementById('eight').addEventListener('click', () => handleNumber('8'));
    document.getElementById('nine').addEventListener('click', () => handleNumber('9'));

    document.getElementById('add').addEventListener('click', () => handleOperator('+'));
    document.getElementById('subtract').addEventListener('click', () => handleOperator('-'));
    document.getElementById('multiply').addEventListener('click', () => handleOperator('*'));
    document.getElementById('divide').addEventListener('click', () => handleOperator('/'));

    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearAll);
});