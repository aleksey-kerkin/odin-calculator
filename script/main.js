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
  let op = event.target.id;
  selectOperator(op);
});

function inputNumber(number) {
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

function selectOperator(op) {
  if (currentNumber === "") return;
  if (previousNumber !== "") {
    calculate();
  }
  operator = op;
  previousNumber = currentNumber;
  currentNumber = "";
  const symbol = operatorSymbols[op];
  displayField.value = `${previousNumber}${symbol}`;
}

function calculate() {
  if (previousNumber === "" || currentNumber === "" || operator === "") return;
  let result = operate(previousNumber, currentNumber, operator);
  if (result === "err") {
    displayField.value = "Error";
    return;
  }
  previousNumber = result.toString();
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
