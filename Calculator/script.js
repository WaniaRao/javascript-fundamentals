const resultDisplay = document.getElementById("result");
const expressionDisplay = document.getElementById("expression");
const buttons = document.querySelectorAll("button");

let currentInput = "0";
let firstNumber = null;
let currentOperator = null;
let waitingForNumber = false;
let justCalculated = false;
let expressionText = "";

function updateDisplay() {
    resultDisplay.textContent = currentInput;
    expressionDisplay.textContent = expressionText || "Ready to calculate";
}

function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    const rounded = Number.parseFloat(number.toPrecision(12));
    return String(rounded);
}

function operatorSymbol(operator) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[operator] || operator;
}

function appendNumber(number) {
    if (justCalculated) {
        currentInput = number;
        expressionText = "";
        firstNumber = null;
        currentOperator = null;
        waitingForNumber = false;
        justCalculated = false;
        updateDisplay();
        return;
    }

    if (waitingForNumber) {
        currentInput = number;
        waitingForNumber = false;
    } else if (currentInput === "0") {
        currentInput = number;
    } else if (currentInput === "-0") {
        currentInput = "-" + number;
    } else if (currentInput.length < 15) {
        currentInput += number;
    }

    if (firstNumber !== null && currentOperator !== null) {
        expressionText =
            formatNumber(firstNumber) + " " +
            operatorSymbol(currentOperator) + " " +
            currentInput;
    }

    updateDisplay();
}

function chooseOperator(operator) {
    const inputValue = Number(currentInput);

    if (!Number.isFinite(inputValue)) {
        clearCalculator();
        return;
    }

    if (currentOperator && !waitingForNumber) {
        calculate(false);
    } else {
        firstNumber = inputValue;
    }

    currentOperator = operator;
    waitingForNumber = true;
    justCalculated = false;

    expressionText =
        formatNumber(Number(currentInput)) +
        " " + operatorSymbol(operator);

    updateDisplay();
}

function calculate(showFullExpression = true) {
    if (currentOperator === null || firstNumber === null) {
        return;
    }

    if (waitingForNumber) {
        return;
    }

    const secondNumber = Number(currentInput);
    const leftNumber = firstNumber;
    let answer;

    switch (currentOperator) {
        case "+":
            answer = leftNumber + secondNumber;
            break;

        case "-":
            answer = leftNumber - secondNumber;
            break;

        case "*":
            answer = leftNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                expressionText = "Cannot divide by zero";
                currentInput = "Error";
                firstNumber = null;
                currentOperator = null;
                waitingForNumber = false;
                justCalculated = true;
                updateDisplay();
                return;
            }

            answer = leftNumber / secondNumber;
            break;

        default:
            return;
    }

    if (!Number.isFinite(answer)) {
        currentInput = "Error";
        expressionText = "Result out of range";
        firstNumber = null;
        currentOperator = null;
        waitingForNumber = false;
        justCalculated = true;
        updateDisplay();
        return;
    }

    const formattedLeft = formatNumber(leftNumber);
    const formattedRight = formatNumber(secondNumber);
    const formattedAnswer = formatNumber(answer);

    if (showFullExpression) {
        expressionText =
            formattedLeft + " " +
            operatorSymbol(currentOperator) + " " +
            formattedRight + " =";
    }

    currentInput = formattedAnswer;
    firstNumber = null;
    currentOperator = null;
    waitingForNumber = false;
    justCalculated = true;

    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    currentOperator = null;
    waitingForNumber = false;
    justCalculated = false;
    expressionText = "";

    updateDisplay();
}

function deleteNumber() {
    if (justCalculated) {
        clearCalculator();
        return;
    }

    if (waitingForNumber) {
        return;
    }

    if (currentInput === "Error") {
        clearCalculator();
        return;
    }

    currentInput = currentInput.slice(0, -1);

    if (currentInput === "" || currentInput === "-") {
        currentInput = "0";
    }

    if (firstNumber !== null && currentOperator !== null) {
        expressionText =
            formatNumber(firstNumber) + " " +
            operatorSymbol(currentOperator) + " " +
            currentInput;
    } else {
        expressionText = "";
    }

    updateDisplay();
}

function addDecimal() {
    if (justCalculated) {
        currentInput = "0.";
        expressionText = "";
        firstNumber = null;
        currentOperator = null;
        waitingForNumber = false;
        justCalculated = false;
        updateDisplay();
        return;
    }

    if (waitingForNumber) {
        currentInput = "0.";
        waitingForNumber = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    if (firstNumber !== null && currentOperator !== null) {
        expressionText =
            formatNumber(firstNumber) + " " +
            operatorSymbol(currentOperator) + " " +
            currentInput;
    }

    updateDisplay();
}

function toggleSign() {
    if (currentInput === "0" || currentInput === "Error") {
        return;
    }

    currentInput = currentInput.startsWith("-")
        ? currentInput.slice(1)
        : "-" + currentInput;

    justCalculated = false;

    if (firstNumber !== null && currentOperator !== null) {
        expressionText =
            formatNumber(firstNumber) + " " +
            operatorSymbol(currentOperator) + " " +
            currentInput;
    }

    updateDisplay();
}

function percentage() {
    if (currentInput === "Error") {
        return;
    }

    currentInput = formatNumber(Number(currentInput) / 100);
    justCalculated = false;

    if (firstNumber !== null && currentOperator !== null) {
        expressionText =
            formatNumber(firstNumber) + " " +
            operatorSymbol(currentOperator) + " " +
            currentInput;
    } else {
        expressionText = currentInput + " %";
    }

    updateDisplay();
}

function handleAction(action) {
    switch (action) {
        case "clear":
            clearCalculator();
            break;

        case "delete":
            deleteNumber();
            break;

        case "decimal":
            addDecimal();
            break;

        case "sign":
            toggleSign();
            break;

        case "percent":
            percentage();
            break;

        case "equals":
            calculate(true);
            break;
    }
}

/* Mouse and touch buttons */

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.dataset.number !== undefined) {
            appendNumber(button.dataset.number);
        } else if (button.dataset.operator !== undefined) {
            chooseOperator(button.dataset.operator);
        } else if (button.dataset.action !== undefined) {
            handleAction(button.dataset.action);
        }
    });
});

/* Keyboard support */

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
        return;
    }

    if (key === ".") {
        addDecimal();
        return;
    }

    if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate(true);
        return;
    }

    if (key === "Backspace") {
        deleteNumber();
        return;
    }

    if (key === "Escape" || key === "Delete") {
        clearCalculator();
        return;
    }

    if (key === "%") {
        percentage();
    }
});

updateDisplay();
