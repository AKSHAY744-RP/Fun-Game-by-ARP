let display = document.getElementById("display");

function appendNumber(num) {
  display.value += num;
}

function appendOperator(op) {
  display.value += " " + op + " ";
}

function appendDot() {
  if (!display.value.includes(".")) display.value += ".";
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}
