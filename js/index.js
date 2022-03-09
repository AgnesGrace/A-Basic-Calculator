const basic_calculator = {
  displayValue: ' ',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const inputDigit = (digit) => {

  const { displayValue, waitingForSecondOperand } = basic_calculator;

  if (waitingForSecondOperand === true) {
    basic_calculator.displayValue = digit;
    basic_calculator.waitingForSecondOperand = false;
  } else {
    basic_calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

const inputDecimal = (dot) => {
  if (!basic_calculator.displayValue.includes(dot)) {
    basic_calculator.displayValue += dot;
  }
}

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = basic_calculator
  const inputValue = parseFloat(displayValue);

  if (operator && basic_calculator.waitingForSecondOperand)  {
    basic_calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null) {
    basic_calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    basic_calculator.displayValue = String(result);
    basic_calculator.firstOperand = result;
  }

  basic_calculator.waitingForSecondOperand = true;
  basic_calculator.operator = nextOperator;
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

const resetCalculator = () => {
  basic_calculator.displayValue = '0';
  basic_calculator.firstOperand = null;
  basic_calculator.waitingForSecondOperand = false;
  basic_calculator.operator = null;
}

const updateDisplay = () => {
  const display = document.querySelector('.calculator-screen');
  display.value = basic_calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});