const displayField = document.getElementById("display");
let previousNumber = "";
let currentNumber = "";
let operator = "";

const operatorSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

document.querySelector(".numbers").addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() !== "button") return;
  let number = event.target.textContent;
  inputNumber(number);
});

// Event listener for operator buttons
document.querySelector(".operators").addEventListener("click", (event) => {
  if (event.target.tagName.toLowerCase() !== "button") return;
  if (event.target.id === "clear") {
    clearCalculator();
    return;
  }
  if (event.target.id === "equal") {
    calculate();
    return;
  }
  if (event.target.id === "subtract") {
    if (currentNumber === "" || currentNumber === "-") {
      // Start a negative number
      inputNumber("-");
    } else {
      // Use subtract as an operator
      selectOperator("subtract");
    }
    return;
  }
  let op = event.target.id;
  selectOperator(op);
});

// Function to handle operator selection
function selectOperator(op) {
  if (currentNumber === "") {
    if (op === "subtract" && previousNumber !== "") {
      operator = op;
      const symbol = operatorSymbols[op];
      displayField.value = `${previousNumber}${symbol}`;
    }
    return;
  }
  if (previousNumber !== "") {
    calculate();
  }
  operator = op;
  previousNumber = currentNumber;
  currentNumber = "";
  const symbol = operatorSymbols[op];
  displayField.value = `${previousNumber}${symbol}`;
}

// Function to handle number input
function inputNumber(number) {
  if (number === "-" && currentNumber !== "") {
    return; // Prevent multiple negative signs
  }

  if (displayField.value === "0" && number !== ".") {
    currentNumber = number;
    displayField.value = currentNumber;
  } else if (currentNumber === "" && number === ".") {
    currentNumber = "0.";
    displayField.value = currentNumber;
  } else if (currentNumber.includes(".") && number === ".") {
    return; // Prevent multiple decimals
  } else {
    currentNumber += number;
    if (previousNumber && operator) {
      const symbol = operatorSymbols[operator];
      displayField.value = `${previousNumber}${symbol}${currentNumber}`;
    } else {
      displayField.value = currentNumber;
    }
  }
}

// Function to perform calculations
function calculate() {
  if (previousNumber === "" || currentNumber === "" || operator === "") return;
  if (isNaN(parseFloat(previousNumber)) || isNaN(parseFloat(currentNumber))) {
    displayField.value = "Error";
    return;
  }
  let result = operate(previousNumber, currentNumber, operator);
  if (result === "err") {
    displayField.value = "Error";
    return;
  }
  previousNumber = result.toFixed(2).toString();
  operator = "";
  currentNumber = previousNumber;
  displayField.value = currentNumber;
}

function clearCalculator() {
  previousNumber = "";
  currentNumber = "";
  operator = "";
  displayField.value = "0";
}

function operate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      if (num2 === 0) return "err";
      return num1 / num2;
    default:
      return "err";
  }
}
