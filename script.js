///*** creating constants for document elements */

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//directional tiles in map graphic
const northTile = document.querySelector("#north-tile");
const southTile = document.querySelector("#south-tile");
const eastTile = document.querySelector("#east-tile");
const westTile = document.querySelector("#west-tile");

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