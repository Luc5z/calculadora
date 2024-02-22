let inputField = document.getElementById('inputField');
let resultField = document.getElementById('resultField');
let operationInProgress = false;
let openedParentheses = 0;

function appendToInput(value) {
    if (value === '√' || value === '!' || value === 'LOG²' || value === 'LOG¹⁰' || value === 'LOGN') {
        if (operationInProgress) {
            inputField.value += ')';
            operationInProgress = false;
            openedParentheses--;
        }
        inputField.value += value + '(';
        operationInProgress = true;
        openedParentheses++;
    } else {
        inputField.value += value;
    }
}

function clearInput() {
    inputField.value = '';
    resultField.value = '';
    operationInProgress = false;
    openedParentheses = 0;
}

function calculateResult() {
    try {
        while (openedParentheses > 0) {
            inputField.value += ')';
            openedParentheses--;
        }
        
        const inputExpression = inputField.value;
        const result = evaluateExpression(inputExpression);
        if (isNaN(result) || !isFinite(result)) {
            resultField.value = 'Operação invalida';
        } else {
            resultField.value = result.toFixed(3)
            inputField.value = '';
            operationInProgress = false;
        }
    } catch (error) {
        resultField.value = 'erros de sintaxe';
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/√/g, 'Math.sqrt');
    expression = expression.replace(/\^2/g, '**2');
    expression = expression.replace(/\^/g, '**');
    expression = expression.replace(/!/g, 'factorial');
    expression = expression.replace(/LOG²/g, 'Math.log2');
    expression = expression.replace(/LOG¹⁰/g, 'Math.log10');
    expression = expression.replace(/LOGN/g, 'Math.log');

    return eval(expression);
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function backspace() {
    const inputValue = inputField.value;
    inputField.value = inputValue.substring(0, inputValue.length - 1);
}

