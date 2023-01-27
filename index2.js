let player = JSON.parse(localStorage.getItem("selectedPlayer.pop()"));

const board = document.getElementById("board");
const turn = document.querySelector(".turn-view");

// Create a new x svg element
// Create the SVG element
var xSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
xSvg.setAttributeNS(null, "width", "64");
xSvg.setAttributeNS(null, "height", "64");
xSvg.setAttributeNS(null, "viewBox", "0 0 64 64");

// Create the path element
var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttributeNS(null, "d", "M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z");
path.setAttributeNS(null, "fill", "#31C3BD");
path.setAttributeNS(null, "fill-rule", "evenodd");

// Add the path to the SVG
xSvg.appendChild(path);

xSvg.classList.add("hide", "center", "hover", "x");

// Create a new o svg element
// Create the SVG element
var oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
oSvg.setAttributeNS(null, "width", "64");
oSvg.setAttributeNS(null, "height", "64");
oSvg.setAttributeNS(null, "viewBox", "0 0 64 64");

// Create the path element
var oPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
oPath.setAttributeNS(null, "d", "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z");
oPath.setAttributeNS(null, "fill", "#F2B137");

// Add the path to the SVG
oSvg.appendChild(oPath);

oSvg.classList.add("hide", "center", "hover", "o");

for (let i = 0; i < 9; i++) {
// Create a new tile element
const tile = document.createElement("div");
tile.classList.add("tile");

tile.appendChild(xSvg.cloneNode(true));
tile.appendChild(oSvg.cloneNode(true));
board.appendChild(tile);
}



let winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

let  randomSvgIndex = Math.floor(Math.random() * (9 - 2 + 1) + 2);
const xsvgs = document.querySelectorAll(".x");
const osvgs = document.querySelectorAll(".o");
const tiles = document.querySelectorAll(".tile");
let playerMove;
let secondCpuMove;
let playerFirstMove;

function firstCPUMove(){
  setTimeout(() => {
    xsvgs[randomSvgIndex].style.display = "block";
  }, 500); 
}

function secondCPUMove(playerMove) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // filter out the combinations that have the player's move
      let availableCombinations = winningCombinations.filter(combination => !combination.includes(playerMove));

      // filter out the combinations that have the random move
      availableCombinations = availableCombinations.filter(combination => combination.includes(randomSvgIndex));

      // select a random combination that has the random move and doesn't have the player's move
      let nextMoveCombination = availableCombinations[Math.floor(Math.random() * availableCombinations.length)];

      // select the next move (tile) that is not the random move and not the player's move
      let nextMoveTile = nextMoveCombination.find(tile => tile !== randomSvgIndex && tile !== playerMove);

      // mark the next move (tile)
      xsvgs[nextMoveTile].style.display = "block";

      resolve({playerMove, nextMoveTile}); // resolve the promise with the next move tile
    }, 1000);
  });
}

function thirdMove(secondPlayerMove, secondCpuMove, playerMove) {
  setTimeout(() => {
  let thirdCpuMove;

  // check if CPU can complete a winning combination
  winningCombinations.forEach(combination => {
    if (combination.includes(randomSvgIndex) && combination.includes(secondCpuMove)) {
      let missingTile = combination.find(tile => ![randomSvgIndex, secondCpuMove, playerMove].includes(tile));
      if (missingTile && !xsvgs[missingTile].style.display && !osvgs[missingTile].style.display) {
        thirdCpuMove = missingTile;
      }
    }
  });

  if (!thirdCpuMove) {
    // check if player is about to complete a winning combination
    winningCombinations.forEach(combination => {
      if (combination.includes(playerMove) && combination.includes(secondPlayerMove)) {
        let missingTile = combination.find(tile => ![randomSvgIndex, secondPlayerMove, playerMove].includes(tile));
        if (missingTile && !xsvgs[missingTile].style.display && !osvgs[missingTile].style.display) {
          thirdCpuMove = missingTile;
        }
      }
    });
  }

  if (!thirdCpuMove) {
    // randomly select an available tile for the third move
    let availableTiles = [];
    tiles.forEach((tile, index) => {
      if (!xsvgs[index].style.display && !osvgs[index].style.display) {
        availableTiles.push(index);
      }
    });
    thirdCpuMove = availableTiles[Math.floor(Math.random() * availableTiles.length)];
  }

  // mark the third move
  xsvgs[thirdCpuMove].style.display = "block";
}, 1000);
}




if (player == 0) {
  firstCPUMove();

  function getPlayerMove() {
    return new Promise((resolve, reject) => {
      tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
          resolve(index);
        });
      });
    });
  }

  getPlayerMove()
    .then(playerMove => {
      return secondCPUMove(playerMove);
    })
    .then(({playerMove, nextMoveTile}) => {
      secondCpuMove = nextMoveTile; // assign the next move tile to the variable
      playerFirstMove = playerMove;
      return new Promise((resolve, reject) => {
        tiles.forEach((tile, index) => {
          tile.addEventListener('click', () => {
            resolve(index);
          });
        });
      });
    })
    .then((secondPlayerMove) => {
      thirdMove(secondPlayerMove, secondCpuMove, playerFirstMove);
    })
    .catch(error => {
      console.log(error);
    });

        if 
}


tiles.forEach((tile, index) => {
  
  if (index !== randomSvgIndex){

    tile.addEventListener('click', () => {
        if (player == 0){
            const svgs = tile.querySelectorAll(".o");
            svgs.forEach(svg => {
                svg.style.display = "block";  
            });
         } else{
            const svgs = tile.querySelectorAll(".x");
            svgs.forEach(svg => {
                svg.style.display = "block";  
            });
         }
    });
  }
});





var playerXWins = 0;
var playerOWins = 0;
var ties = 0;

// // Function to check if a player has won
// function checkWin() {
//     // Check if player X has won
//     if (/*condition for player X winning*/) {
//       playerXWins++;
//       alert("Player X wins!");
//     }

//     IF (){}
//     // Check if player O has won
//     else if (/*condition for player O winning*/) {
//       playerOWins++;
//       alert("Player O wins!");
//     }
//   }
  
  // Function to display the number of wins
  function displayWins() {
    const playerXWinsElement = document.querySelector(".score");
    playerXWinsElement.textContent = playerXWins;
  
    const playerOWinsElement = document.querySelector(".cpu-score");
    playerOWinsElement.textContent = playerOWins;

    const numberOfTies = document.querySelector(".number-of-ties");
    numberOfTies.textContent = ties;
  }

  window.addEventListener("load", function() {
    displayWins();
});

 