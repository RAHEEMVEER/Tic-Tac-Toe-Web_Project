let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-game");
let messagePara = document.querySelector("#para");

let circleIcon = document.getElementById("zero");
let crossIcon = document.getElementById("cross");

let computerChoice = [...boxes];

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let playerSymbol = "";
let computerSymbol = "";

circleIcon.addEventListener("click", () => {
  playerSymbol = "O";
  computerSymbol = "X";
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        box.innerText = playerSymbol;
        computerChoice.splice(computerChoice.indexOf(box), 1);
        checkWin(playerSymbol); // Check win for player
        setTimeout(crossIconComputer, 500);
      }
    });
  });
});

crossIcon.addEventListener("click", () => {
  playerSymbol = "X";
  computerSymbol = "O";
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        box.innerText = playerSymbol;
        computerChoice.splice(computerChoice.indexOf(box), 1);
        checkWin(playerSymbol); // Check win for player
        setTimeout(circleComputer, 500);
      }
    });
  });
});

function circleComputer() {
  if (computerChoice.length > 0) {
    let randomIndex = Math.floor(Math.random() * computerChoice.length);
    let computerBox = computerChoice[randomIndex];
    if (computerBox.innerText === "") {
      computerBox.innerText = computerSymbol;
      computerChoice.splice(randomIndex, 1);
      checkWin(computerSymbol); // Check win for computer
    }
  }
}

function crossIconComputer() {
  if (computerChoice.length > 0) {
    let randomIndex = Math.floor(Math.random() * computerChoice.length);
    let computerBox = computerChoice[randomIndex];
    if (computerBox.innerText === "") {
      computerBox.innerText = computerSymbol;
      computerChoice.splice(randomIndex, 1);
      checkWin(computerSymbol); // Check win for computer
    }
  }
}

function checkWin(currentPlayer) {
  let isWin = false;

  for (let pattern of winPattern) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText === currentPlayer &&
      boxes[b].innerText === currentPlayer &&
      boxes[c].innerText === currentPlayer
    ) {
      if (currentPlayer === playerSymbol) {
        messagePara.textContent = "";
        messagePara.textContent = "Congratulations, You Win!";
        messagePara.classList.add("active1");
        disableValue();
      } else {
        messagePara.textContent = "";
        messagePara.textContent = "Computer Wins!";
        messagePara.classList.add("active2");
        disableValue();
      }

      isWin = true;
      return;
    }
  }

  // Check for draw if no one wins and all boxes are filled
  if (!isWin && [...boxes].every((box) => box.innerText !== "")) {
    messagePara.textContent = "Match Is Draw";
    messagePara.classList.add("active3");
    disableValue();
  }
}

function disableValue() {
  boxes.forEach((box) => {
    box.disabled = true; // Disable all buttons
  });
}

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false; // Enable all buttons
  });
  computerChoice = [...boxes];
  messagePara.textContent = ""; // Clear the message
});
