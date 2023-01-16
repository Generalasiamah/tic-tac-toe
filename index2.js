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

const tiles = document.querySelectorAll(".tile");
tiles.forEach(tile => {
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

 