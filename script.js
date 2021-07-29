const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const displayNum = display.textContent;
    const keyNum = key.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      //console.log("number.");
      if (
        displayNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "equals"
      ) {
        display.textContent = keyNum;
      } else {
        display.textContent = display.textContent + keyNum;
      }
      if (previousKeyType === "equals") {
        clear();
      }
      calculator.dataset.previousKeyType = "number";
    } else if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //console.log("operator.");
      const firstNum = calculator.dataset.firstNum;
      const operator = calculator.dataset.operator;
      const secondNum = displayNum;
      if (
        firstNum &&
        operator &&
        secondNum &&
        previousKeyType !== "operator" &&
        previousKeyType !== "equals"
      ) {
        display.textContent = calculate(firstNum, operator, secondNum);
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstNum = display.textContent;
      calculator.dataset.operator = key.dataset.action;
    } else if (action === "decimal") {
      //console.log("decimal.");
      if (!display.textContent.includes(".")) {
        display.textContent = display.textContent + ".";
      }
      if (previousKeyType === "operator" || previousKeyType === "equals") {
        display.textContent = "0.";
      }
      if (previousKeyType === "equals") {
        clear();
      }
      calculator.dataset.previousKeyType = "decimal";
    } else if (action === "clear") {
      //console.log("clear.");
      if (key.textContent === 'AC') {
        clear();
      } else {
          key.textContent = 'AC';
      }
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    } else {
      //console.log("equals.");
      let firstNum = calculator.dataset.firstNum;
      const operator = calculator.dataset.operator;
      let secondNum = displayNum;

      if (firstNum) {
        if (previousKeyType === "equals") {
          firstNum = displayNum;
          secondNum = calculator.dataset.modNum;
        }
        display.textContent = calculate(firstNum, operator, secondNum);
      }

      calculator.dataset.modNum = secondNum;
      calculator.dataset.previousKeyType = "equals";
    }

    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
  }
});

const calculate = (n1, op, n2) => {
  if (op === "add") return parseFloat(n1) + parseFloat(n2); 
  if (op === "subtract") return parseFloat(n1) - parseFloat(n2); 
  if (op === "multiply") return parseFloat(n1) * parseFloat(n2);
  if (op === "divide") return parseFloat(n1) / parseFloat(n2);
};

const clear = () => {
  delete calculator.dataset.firstNum;
  delete calculator.dataset.operator;
  delete calculator.dataset.modNum;
  delete calculator.dataset.previousKeyType;
};
