// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const displayNum = display.textContent;
    const keyNum = key.textContent;

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
    
    const previousKeyType = calculator.dataset.previousKeyType;

    if(!action) {
        console.log("number.");
        if(displayNum === '0' || previousKeyType === 'operator') {
            display.textContent = keyNum;
        }
        else {
            display.textContent = display.textContent + keyNum;
        }
        calculator.dataset.previousKeyType = 'number';

    }
    else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        console.log("operator.");
        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstNum = displayNum;
        calculator.dataset.operator = action;
    }
    else if (action === 'decimal') {
        console.log("decimal.");
        if(!display.textContent.includes('.')) {
            display.textContent = display.textContent + '.';
        }
        calculator.dataset.previousKeyType = 'decimal';
    }
    else if (action === 'clear') {
        console.log("clear.");
        display.textContent = '0';
        calculator.dataset.previousKeyType = 'clear';
    }
    else {
        console.log("equals.");
        const firstNum = calculator.dataset.firstNum;
        const operator = calculator.dataset.operator;
        const secondNum = displayNum;
        
        display.textContent = calculate(firstNum, operator, secondNum);
        calculator.dataset.previousKeyType = 'equals';
    }
  }
})

const calculate = (n1, op, n2) => {
    let res = ''

    if(op === 'add') {
        res = parseFloat(n1) + parseFloat(n2);
    } else if(op === 'subtract') {
        res = parseFloat(n1) - parseFloat(n2);
    } else if(op === 'multiply') {
        res =  parseFloat(n1) * parseFloat(n2);
    } else if(op === 'divide') {
        res = parseFloat(n1) / parseFloat(n2);
    }

    return res;
}