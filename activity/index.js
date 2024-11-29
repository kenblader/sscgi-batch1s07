const displayBoard = document.getElementById("displayBoard");
const gridLength = 16; // grid is 16 by 16
let counter = 0;

// Initialize Board
let gridBoard = [];

for (let row = 1; row <= gridLength; row++) {
  let currentRow = [];

  for (let column = 0; column < gridLength; column++) {
    let columnLetter = String.fromCharCode(97 + (column % 26)); // makes letter from a to z
    //let addedLetter = column >= 26 ? String.fromCharCode(97 + Math.floor(column / 26) - 1) : '';
    // console.log(addedLetter);
    currentRow.push(columnLetter + row);
  }
  gridBoard.push(currentRow);
}
// console.log(gridBoard);

//Initialize pacman's coords
let pacman = [1, 1, 100]; // [row, col, health]

//Initialize ghosts
let ghostNo = 4;
let ghost = [
  ["Blinky", ""], // [name][row][col]
  ["Pinky", ""], // [name][row][col]
  ["Inky", ""], // [name][row][col]
  ["Clyde", ""], // [name][row][col]
];
let usedCoord = [];

for (let i = 0; i < 4; i++) {
  let randRow;
  let randCol;
  let health;
  do {
    //Ensures that the generated row and column will be unique
    randRow = Math.floor(Math.random() * (gridLength - 2)) + 2;
    randCol = Math.floor(Math.random() * (gridLength - 2)) + 2;
  } while (
    usedCoord.some((coord) => coord[0] === randRow && coord[1] === randCol)
  );
  usedCoord.push([randRow, randCol]);

  health = Math.floor(Math.random() * 60) + 1;

  ghost[i][1] = `${randRow}`;
  ghost[i][2] = `${randCol}`;
  ghost[i][3] = `${health}`;
}
console.log(ghost);
console.log(ghost[0][1]);

// Generate the board
for (let row = 1; row <= gridLength; row++) {
  for (let column = 1; column <= gridLength; column++) {
    const square = document.createElement("div");
    square.classList.add("square");

    pacmanInitiate(square, row, column); // Initialize Pacman's first appearance
    ghostCoords(square, row, column); // Initialize Ghosts' first appearance

    displayBoard.appendChild(square);
  }
}

// pacman move
document.addEventListener("keyup", (e) => {
  const square = document.getElementsByClassName("square");
  let squareIndex = computePacmanCoord();
  if (e.key === "ArrowLeft") {
    removePacman(square[squareIndex]);
    if ((pacman[1] - 1) % 16 == 0) {
      squareIndex += 15;
      pacman[1] += 15;
    } else {
      squareIndex -= 1; // subtract the index of square
      pacman[1] -= 1; // subtract column of pacman
    }
    addPacman(square[squareIndex]);
    fightPacman(square[squareIndex]);
  }
  if (e.key === "ArrowRight") {
    removePacman(square[squareIndex]);
    if (pacman[1] % 16 == 0) {
      pacman[1] -= 15; // add column
      squareIndex -= 15; // add the index of square
    } else {
      squareIndex += 1; // subtract the index of square
      pacman[1] += 1; // subtract column of pacman
    }
    addPacman(square[squareIndex]);
    fightPacman(square[squareIndex]);
  }
  if (e.key === "ArrowUp") {
    removePacman(square[squareIndex]);
    if (pacman[0] - 1 == 0) {
      pacman[0] += 15; // add column
      squareIndex = 15 * 16 + (pacman[1] - 1); // add the index of square
    } else {
      pacman[0] -= 1; // add row
      squareIndex -= 16; // add the index of square
    }
    addPacman(square[squareIndex]);
    fightPacman(square[squareIndex]);
  }
  if (e.key === "ArrowDown") {
    removePacman(square[squareIndex]);
    if (pacman[0] + 1 > 16) {
      pacman[0] -= 15; // add column
      squareIndex = pacman[1] - 1; // add the index of square
    } else {
      pacman[0] += 1; // add row
      squareIndex += 16; // add the index of square
    }
    addPacman(square[squareIndex]);
    fightPacman(square[squareIndex]);
  }
  console.log("Pacman: ", pacman[2]);
});

function pacmanInitiate(square, row, column) {
  if (row == pacman[0] && column == pacman[1]) {
    square.classList.add("pacman");
  }
}

function removePacman(square) {
  square.classList.remove("pacman");
}

function addPacman(square) {
  square.classList.add("pacman");
}

function computePacmanCoord() {
  let total = 0;

  for (let i = 0; i < pacman[0] - 1; i++) {
    total += 16;
  }
  total += pacman[1]; //add how many the column

  total -= 1; // for making it an index of an array
  return total;
}

function ghostCoords(square, row, column) {
  //Blinky
  if (row == ghost[0][1] && column == ghost[0][2]) {
    square.classList.add("Blinky");
  }
  //Pinky
  if (row == ghost[1][1] && column == ghost[1][2]) {
    square.classList.add("Pinky");
  }
  //Inky
  if (row == ghost[2][1] && column == ghost[2][2]) {
    square.classList.add("Inky");
  }
  //Clyde
  if (row == ghost[3][1] && column == ghost[3][2]) {
    square.classList.add("Clyde");
  }
}

// All about health
let healthPacman = document.getElementById("healthPacman");
let healthBlinky = document.getElementById("healthBlinky");
let healthPinky = document.getElementById("healthPinky");
let healthInky = document.getElementById("healthInky");
let healthClyde = document.getElementById("healthClyde");

healthPacman.value = pacman[2];
healthBlinky.value = ghost[0][3];
healthPinky.value = ghost[1][3];
healthInky.value = ghost[2][3];
healthClyde.value = ghost[3][3];

function fightPacman(square) {
  // check if there's a ghost
  for (let i = 0; i < ghost.length; i++) {
    if (square.classList.contains(ghost[i][0])) {
      console.log(ghost[i][0]);

      console.log("Pacman: ", pacman[2]);
      console.log(
        `Before - Pacman Power: ${pacman[2]}, Ghost Power: ${ghost[i][3]}`
      );
      pacman[2] -= ghost[i][3];
      console.log(`After - Pacman Power: ${pacman[2]}`);

      if (pacman[2] <= 0) {
        alert("You Lose. Try again");
        location.reload();
      }
      square.classList.remove(ghost[i][0]);

      setHealth(ghost[i][0]);

      counter++;
      if (counter == 4) {
        alert("You Win. Play Again?");
        location.reload();
      }
    }
  }
}

function setHealth(ghost) {
  healthPacman.value = pacman[2];
  switch (ghost) {
    case "Blinky":
      healthBlinky.value = 0;
      break;
    case "Pinky":
      healthPinky.value = 0;
      break;
    case "Inky":
      healthInky.value = 0;
      break;
    case "Clyde":
      healthClyde.value = 0;
      break;
  }
}
