/* ---------- Number Guessing Game ---------- */
/* initialization */
const resultDisplay = document.getElementById("result");
const triesDisplay = document.querySelector(".tries");

let tries = 0;
let correctNum;

/* Number Guessing Game function() */
function guessNumber() {
  const input = document.getElementById("guessNum");
  const guessNum = Number(input.value);

  const guessButton = document.getElementById("guessButton");
  const minNumber = Number(document.getElementById("min").value);
  const maxNumber = Number(document.getElementById("max").value);

  //GENERATE RANDOM NUMBER if it has no current value
  if (correctNum == undefined) {
    correctNum =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  if (input.value === "") {
    alert("Make sure to input a valid guess number first");
    input.value = "";
    resultDisplay.textContent = "";
  }
  // if guess number is outside the scope of min and max numbers
  else if (guessNum < minNumber || guessNum > maxNumber) {
    resultDisplay.style.color = `tomato`;
    resultDisplay.textContent = `Your guess number must be from ${minNumber} to ${maxNumber} ONLY!`;
    input.value = "";
  } else {
    tries++;
    triesDisplay.textContent = `TRIES: ${tries}`;

    if (guessNum === correctNum) {
      resultDisplay.style.color = `green`;
      resultDisplay.textContent = `Well done!, it only took you ${tries} tries to guess the number (${correctNum}) correctly!`;
      tries = 0;

      // call the playAgain() function
      playAgain(input, guessButton, resultDisplay);
    } else {
      // display hint: higher or lower
      let hint = guessNum < correctNum ? "Higher!" : "Lower!";
      resultDisplay.style.color = `green`;
      resultDisplay.textContent = hint;
    }
  }
}

// Play Again button function
function playAgain(input, guessButton, resultDisplay) {
  // hide the input and guess button
  input.style.display = `none`;
  guessButton.style.display = `none`;
  input.value = "";

  // Created new Button "Play Again?" -------------------------------------------
  const playAgain = document.createElement("button");
  playAgain.textContent = `Play Again?`;
  document
    .getElementById("numGuessingContainer")
    .insertBefore(playAgain, guessButton);

  // function() of new Button "Play Again?" -------------------------------------
  playAgain.onclick = function () {
    input.style.display = `inline-block`;
    guessButton.style.display = `inline-block`;
    playAgain.style.display = `none`;
    resultDisplay.style.color = `black`;
    resultDisplay.textContent = ``;

    //RESET ALL THE VALUES (min, max, guessNum, tries) to start another round
    document.getElementById("min").value = "1";
    document.getElementById("max").value = "100";
    document.getElementById("guessNum").value = "";
    triesDisplay.textContent = `TRIES: ${tries}`;
    correctNum = undefined; // reset the value of random number
  };
}

// change() function when minimum and maximum number
function change() {
  let minNumber = document.getElementById("min").value;
  let maxNumber = document.getElementById("max").value;
  tries = 0;

  triesDisplay.textContent = `TRIES: ${tries}`;

  // Reset the min or max numbers if the value is invalid
  if (minNumber.length === 0 || isNaN(minNumber)) {
    alert("INVALID MIN NUMBER!");
    document.getElementById("min").value = "1"; // Reset to default value
  } else if (maxNumber.length === 0 || isNaN(maxNumber)) {
    alert("INVALID MAX NUMBER!");
    document.getElementById("max").value = "100"; // Reset to default value
  }

  //changing the type of values to a number
  minNumber = Number(minNumber);
  maxNumber = Number(maxNumber);

  // Ensure that min is less than max
  if (minNumber < maxNumber) {
    //GENERATE NEW RANDOM NUMBER
    correctNum =
      Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  } else {
    // Reset the min and max to default
    document.getElementById("min").value = "1";
    document.getElementById("max").value = "100";
    alert("Make sure that Min value is less than Max value!");
  }
}
