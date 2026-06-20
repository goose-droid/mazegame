///*** creating constants for document elements */

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//tiles in map graphic
const squares = document.querySelectorAll("div.tile");

//object img in map graphic
const objectImage = document.querySelector("#object-image");

//text
const roomstats = document.querySelector("#roomstats");
const text = document.querySelector("#text");

// *** Map definition 

// map layout. the index of the outer array is x
// the indices of the inner arrays are y
// the elements in the inner arrays are tiles
// 0 = wall, 1 = path, 2 = water, 3 = stairs
// evens (incl 0) are impassible, odds are passable
// kind of visually parsable. north is to the right
const tiles = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 2, 2, 1, 0],
    [0, 1, 0, 0, 1, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// key locations. [x, y]
const keys = [
    [4, 1],
    [6, 7]
];

// location of treasure box. format [x, y]
const treasureBox = [8, 4];

// starting location. format [x, y]
const startingPosition = [1, 4];

// *** end map definition

const tileClassNames = ["wall", "path", "water", "path"];

//number of keys to open box
const boxKeys = keys.length;

//starting coordinates, tile type, key numbers
//needs to be redone when game restarted
let x = startingPosition[0];
let y = startingPosition[1];
//currenTileType needs to be updated every time x or y is
let currentTileType = tiles[x][y]; 
let numberOfKeys = 0;

//function to apply appropriate tiles graphics
function applyTileImages() {
    squares[0].classList.add(tileClassNames[tiles[x-1][y+1]]);
    squares[1].classList.add(tileClassNames[tiles[x][y+1]]);
    squares[2].classList.add(tileClassNames[tiles[x+1][y+1]]);
    squares[3].classList.add(tileClassNames[tiles[x-1][y]]);
    squares[4].classList.add(tileClassNames[tiles[x][y]]);
    squares[5].classList.add(tileClassNames[tiles[x+1][y+1]]);
    squares[6].classList.add(tileClassNames[tiles[x-1][y-1]]);
    squares[7].classList.add(tileClassNames[tiles[x][y-1]]);
    squares[8].classList.add(tileClassNames[tiles[x+1][y-1]]);
}

//function updatePosition

//function manageButtons

// apply starting images
applyTileImages();

ButtonNorth.addEventListener("click", () => {
    updatePosition("n");
})
ButtonSouth.addEventListener("click", () => {
    updatePosition("s");
})
ButtonEast.addEventListener("click", () => {
    updatePosition("e");
})
ButtonWest.addEventListener("click", () => {
    updatePosition("w");
})
