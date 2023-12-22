// Selecting DOM elements
let buttons = document.querySelectorAll(".buttons");
let input = document.querySelectorAll("input");
let backspace = document.getElementById("backspace");
let shift = document.getElementById("shift");
let space = document.getElementById("space");
let result = document.getElementById("trueOrNot");
let missed_Count = document.querySelector(".missed_Count");
let correct_Count = document.getElementById("correct_Count");
let wpm = document.querySelector(".wpm");
let startTime;
let lastClickedButton;

// Initializing variables for tracking correct, missed, and words per minute (wpm)
let correct = 0;
correct_Count.innerHTML = correct;

let missed = 0;
missed_Count.innerHTML = missed;

let wpm_count = 0;
wpm.innerHTML = wpm_count;

let keyArray = []; // It is used for back and space keys
let keyWords = "qwertyuiopa1234567890sdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

// Setting initial random value for the first input
input[0].value = randomKey(5);

// Function to generate a random key of a given length
function randomKey(keyWords_length) {
  let random = "";
  for (let index = 0; index < keyWords_length; index++) {
    random += keyWords.charAt(Math.floor(Math.random() * keyWords.length));
  }
  return random;
}

// Event listener for button click
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Checking if it's the first button click to start the timer
    if (!startTime) {
      startTime = new Date().getTime();
    }

    // Updating the input value and keyArray
    input[1].value += btn.innerText;
    keyArray = input[1].value.split("");

    console.log("char", input[1].value);

    // Checking if the entered word is correct
    if (input[1].value.length == 5 && input[1].value == input[0].value) {
      correct_Count.innerHTML = ++correct;

      // Calculating elapsed time and words per minute
      if (correct > 0) {
        let endTime = new Date().getTime();
        let elapsed_time = (endTime - startTime) / 1000;
        wpm_count = (input[1].value.length / elapsed_time) * 60;
        wpm.innerHTML = wpm_count.toFixed(2);
      }

      // Resetting input values and displaying correct message
      if (input[1].value.length < 5) {
        input[1].style.display = "block";
      } else {
        input[1].value = null;
        input[0].value = randomKey(5);
        result.innerHTML = "Correct!";
        result.style.color = "teal";
      }
    } else if (input[1].value.length == 5 && input[1].value != input[0].value) {
      // Displaying wrong message and updating missed count
      result.innerHTML = "Wrong!";
      result.style.color = "red";
      missed_Count.innerHTML = ++missed;

      if (input[1].value.length < 5) {
        input[1].style.display = "block";
      } else {
        input[1].value = null;
      }
    }

    // Styling the clicked button
    btn.style.backgroundColor = "green";
    input[1].style.color = "green";

    // Handling button color change on consecutive clicks
    if (lastClickedButton !== btn) {
      btn.style.backgroundColor = "green";

      if (lastClickedButton) {
        lastClickedButton.style.backgroundColor = "gray";
      }

      lastClickedButton = btn;
    }
  });
});

// Event listener for Space key click
space.addEventListener("click", () => {
  keyArray.push(" ");
  input[1].value = keyArray.join("");
});

// Event listener for Shift key click
shift.addEventListener("click", () => {
  buttons.forEach((btn) => {
    btn.classList.toggle("upper");
  });
});

// Event listener for Backspace key click
backspace.addEventListener("click", () => {
  keyArray.pop();
  input[1].value = keyArray.join("");
});

// Event listener for any keydown event
document.addEventListener("keydown", function (event) {
  const pressedKey = event.key.toLowerCase();

  // Handling Backspace key
  if (pressedKey === "backspace") {
    event.preventDefault();
    keyArray.pop();
    input[1].value = keyArray.join("");
  }

  // Handling Shift key
  if (pressedKey === "shift") {
    event.preventDefault();
    buttons.forEach((btn) => {
      btn.classList.toggle("upper");
    });
  }

  // Handling Space key
  if (pressedKey === " ") {
    event.preventDefault();
    keyArray.push(" ");
    input[1].value = keyArray.join("");
  }

  // Handling specific button click for the pressed key
  const correspondingButton = Array.from(buttons).find(
    (btn) => btn.innerText.toLowerCase() === pressedKey
  );

  if (correspondingButton) {
    event.preventDefault();
    // Calling the common function for handling both click and keydown events
    handleButtonClick(correspondingButton);
  }
});

// Common function to handle both button click and keydown events
function handleButtonClick(btn) {
  // Your existing button click logic here
  if (!startTime) {
    startTime = new Date().getTime();
  }

  input[1].value += btn.innerText;
  keyArray = input[1].value.split("");

  console.log("char", input[1].value);

  if (input[1].value.length == 5 && input[1].value == input[0].value) {
    correct_Count.innerHTML = ++correct;

    if (correct > 0) {
      let endTime = new Date().getTime();
      let elapsed_time = (endTime - startTime) / 1000;
      wpm_count = (input[1].value.length / elapsed_time) * 60;
      wpm.innerHTML = wpm_count.toFixed(2);
    }

    if (input[1].value.length < 5) {
      input[1].style.display = "block";
    } else {
      input[1].value = null;
      input[0].value = randomKey(5);
      result.innerHTML = "Correct!";
      result.style.color = "teal";
    }
  } else if (input[1].value.length == 5 && input[1].value != input[0].value) {
    result.innerHTML = "Wrong!";
    result.style.color = "red";
    missed_Count.innerHTML = ++missed;

    if (input[1].value.length < 5) {
      input[1].style.display = "block";
    } else {
      input[1].value = null;
    }
  }

  btn.style.backgroundColor = "green";
  input[1].style.color = "green";

  if (lastClickedButton !== btn) {
    btn.style.backgroundColor = "green";

    if (lastClickedButton) {
      lastClickedButton.style.backgroundColor = "gray";
    }

    lastClickedButton = btn;
  }
}
