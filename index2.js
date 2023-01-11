const board = document.getElementById("board");

for (let i = 0; i < 9; i++) {
    // Create a new tile element
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.addEventListener("click", toggleTile); // add event listener here

    // Create a new x svg element
    const xSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    xSvg.classList.add("hide");
    xSvg.innerHTML = `...`; // The inner HTML of your SVG
    tile.appendChild(xSvg);

    // Create a new o svg element
    const oSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    oSvg.classList.add("hide");
    oSvg.innerHTML = `...`; // The inner HTML of your SVG
    tile.appendChild(oSvg);

    // Append the tile element to the board
    board.appendChild(tile);
}

function toggleTile(){
    // your logic to toggle svg and manage game logic
}
