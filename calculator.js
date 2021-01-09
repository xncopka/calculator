let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");


document.querySelector(".calc-buttons").addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
});







function buttonClick(value) {
  if (isNaN(parseInt(value))) { // + - * /
    handleSymbol(value);
  } else {
    handleNumber(value); // 0 1 2 3 4 5 6 7 8 9
  }
  rerender();
}











function handleNumber(value) {
  if (buffer === "0") {
    buffer = value; // remplace le 0 initial
  } else {
    buffer += value; //concatenation
  }
}

function rerender() {
  screen.innerText = buffer;
}




function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;

    case "=":
      if (previousOperator === null) {
        // need two numbers to do math, cas = 
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default:
      handleMath(value);
      break;
  }
}






function handleMath(value) {
/*   if (buffer === "0") {
    // do nothing
    return;
  }
 */
  const intBuffer = parseInt(buffer); // On transforme le buffer (string) en int
  if (runningTotal === 0) { // on stocke la valeur (pas besoin de faire d'opérations)
    runningTotal = intBuffer; 
  } else {
    flushOperation(intBuffer); // On calcule la nouvelle valeur du runningTotal résultat de l'ancienne opération
  }

  previousOperator = value; // on stocke la derniere opération 

  buffer = "0"; // on reinit le buffer pour pouvoir entrer les nouveaux nombres suivants les opérations
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}


/*


function init() {
  document.querySelector(".calc-buttons").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init(); */