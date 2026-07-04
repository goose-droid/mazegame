///*** creating constants for document elements */

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//arrow keys toggle button
const ButtonToggleArrowKeys = document.querySelector("#toggle-arrow-keys");

//tiles in map graphic
const squares = document.querySelectorAll("div.tile");

//object img in map graphic
const objectImage = document.querySelector("#object-image-center");

//text
const roomstats = document.querySelector("#roomstats");
const text = document.querySelector("#text");
const keysText = document.querySelector("#arrow-keys-status");

// *** Map definition 
// this section may in the future be broken off in some way
// to allow for multiple mazes

// map layout. the index of the outer array is x
// the indices of the inner arrays are y
// the elements in the inner arrays are tiles
// 0 = wall, 1 = path, 2 = water, 3 = stairs (path for now),
// 4 = unused (wall for now), 5 = warp, 6 = unused (wall for now),
// 7 = mossy floor, 8 = unused (wall), 9 = grass
// evens (incl 0) are impassible, odds are passable
// kind of visually parsable. north is to the right
const tiles = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 3, 0],
    [0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 7, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 0, 7, 7, 7, 7, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 7, 7, 2, 2, 7, 7, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 7, 7, 2, 2, 2, 2, 7, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0, 1, 0, 7, 0, 0, 7, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 7, 2, 2, 2, 2, 7, 7, 0, 0, 1, 1, 1, 1, 1, 1, 0, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0, 0],
    [0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 0, 1, 0, 7, 7, 2, 7 ,2, 2, 2, 7, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 7, 0, 0, 1, 7, 0, 7, 7, 7, 7, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 7, 7, 2, 2, 7, 7, 0, 7, 7, 7, 0, 7, 0, 2, 2, 2, 7, 7, 7, 2, 7, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 7, 7, 7, 7, 0, 0, 1, 0, 7, 2, 7, 2, 2, 2, 7, 7, 2, 7, 2, 7, 0, 1, 2, 1, 2, 0],
    [0, 0, 1, 1, 0, 0, 7, 0, 1, 0, 1, 0, 7, 2, 7, 7, 7, 2, 2, 2, 2, 7, 2, 7, 7, 1, 2, 5, 2, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 1, 2, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// key locations. [x, y]
const keys = [
    [4, 24],
    [3, 1], 
    [12, 11],
    [25, 1],
    [27, 21]
];

// location of treasure box. format [x, y]
const treasureBox = [16, 25];

// starting location. format [x, y]
const startingPosition = [1, 28];

// *** end map definition
// variables/constants

let testing = false;
let arrowKeys = false;

const tileClassNames = ["wall", "path", "water", "path", "wall", "warp", "wall", "mossyfloor", "wall", "grass"];

//number of keys to open box
const boxKeys = keys.length;

//generate flags for picking up keys
const keyFlags = [];
keys.forEach((location) => {
    keyFlags.push(1);
})

//starting coordinates, tile type, key numbers
let x = startingPosition[0];
let y = startingPosition[1];
//currenTileType needs to be updated every time x or y is
let currentTileType = tiles[x][y]; 
let numberOfKeys = 0;

//define coordinates of squares. index matches squares index
//set in later function
let squaresCoords = [];


///*** Functions */

//function to set up squaresCoords
function applySquaresCoords() {
    squaresCoords = [
        [x-1, y+1],
        [x, y+1],
        [x+1, y+1],
        [x-1, y],
        [x, y],
        [x+1, y],
        [x-1, y-1],
        [x, y-1],
        [x+1, y-1]
    ]
}

//run function the first time to set up starting coords
applySquaresCoords();

//function to apply appropriate tile pics
function applyTileImages() {
    squares.forEach((square, i) => {
        tileClassNames.forEach((className) => {
            square.classList.remove(className);
        })
        if (i != 4) {
            squares[i].innerHTML = '';
        }
        if ( i == 4) {
            squares[i].innerHTML = '<img id="object-image-center" class="object-image" src="person.png">';
        }
        squares[i].classList.add(tileClassNames[tiles[squaresCoords[i][0]][squaresCoords[i][1]]]);
        if (checkKey(squaresCoords[i][0], squaresCoords[i][1])) {
            squares[i].innerHTML = '<img class="object-image" src="key.png">';
        }
        if (squaresCoords[i][0] == treasureBox[0] && squaresCoords[i][1] == treasureBox[1]) {
            squares[i].innerHTML =  '<img class="object-image" src="chest.png">';
        }
    })
}

//for testing
function displayRoomData() {
    if (testing) {
        roomstats.innerHTML = `<p>Coordinates: ${x}, ${y}<br>Tile type: ${tileClassNames[tiles[x][y]]}</p>`;     
    };
}

//turns buttons on or off depending on what tile types
//lie to the north/south/east/west
function manageButtons() {
    if (tiles[x][y+1] % 2) {
        ButtonNorth.removeAttribute("disabled");
    } else {
        ButtonNorth.setAttribute("disabled", "disabled");
    }
    if (tiles[x][y-1] % 2) {
        ButtonSouth.removeAttribute("disabled");
    } else {
        ButtonSouth.setAttribute("disabled", "disabled");
    }
    if (tiles[x+1][y] % 2) {
        ButtonEast.removeAttribute("disabled");
    } else {
        ButtonEast.setAttribute("disabled", "disabled");
    }
    if(tiles[x-1][y] % 2) {
        ButtonWest.removeAttribute("disabled");
    } else {
        ButtonWest.setAttribute("disabled", "disabled");
    }
}

function foundKey() {
    keys.forEach((location, i) => {
        if (x == location[0] && y == location[1]) {
            //flip key flag 
            if (keyFlags[i]) {
                keyFlags[i] = 0
            } 
        }
    } )
    objectImage.src = "key.png";
    text.innerHTML = "<p>You found a key!<p>";
    numberOfKeys++;
    text.innerHTML += `<p>You now have ${numberOfKeys} key(s).`;
}

function checkKey(x, y) {
    let keySeen = false;
    //its silly that this code is repeated from foundKey() but can't figure out how else to manage it
    keys.forEach((location, i) => {
        if (x == location[0] && y == location[1]) {
            //check if key was already picked up
            if (keyFlags[i]) {
                keySeen = true;
            } 
        }
    } )
    if (keySeen) {
        return true;
    } else {
        return false;
    }
}

function foundChest() {
    objectImage.src = "chest.png";
    text.innerHTML = "<p>You found the treasure chest!<p>";
    if (numberOfKeys < boxKeys) {
        text.innerHTML += `<p>Unfortunately, you have ${numberOfKeys} key(s), but need ${boxKeys} keys to open the box.</p>`;
    } else {
        disableButtons();
        text.innerHTML += `<p>Using your ${numberOfKeys} keys, you opened the box and found a great treasure! Congrats! You won the game! Refresh the page to start again.`;
    }
}

function disableButtons() {
    ButtonNorth.setAttribute("disabled", "disabled");
    ButtonSouth.setAttribute("disabled", "disabled");
    ButtonEast.setAttribute("disabled", "disabled");
    ButtonWest.setAttribute("disabled", "disabled");
}

//handles movement, updating the pictures, refreshing the
//object picture to default, managing buttons, clearing
//the text box, and checking for keys or box on new tile
//basically the main function of the puzzle
function updatePosition(direction) {
    switch(direction) {
        case "n":
            y++;
            break;
        case "s":
            y--;
            break;
        case "e":
            x++;
            break;
        case "w":
            x--;
            break;
    }
    currentTyleType = tiles[x][y];
    applySquaresCoords();
    manageButtons();
    applyTileImages();
    objectImage.src = "person.png";
    displayRoomData();
    //clear textbox
    text.innerHTML = "";
    //check for keys and box
    if (checkKey(x, y)) {
        foundKey();
    };
    if (x == treasureBox[0] && y == treasureBox[1]) {
        foundChest();
    }
}

// apply starting data
applyTileImages();
displayRoomData();
manageButtons();
keysText.innerHTML = "Arrow key input disabled";

//listen for button presses to trigger updatePosition
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

//listen for arrow keys toggle button
ButtonToggleArrowKeys.addEventListener("click", () => {
    if (arrowKeys) {
        arrowKeys = false;
        keysText.innerHTML = "Arrow key input disabled";
    } else {
        arrowKeys = true;
        keysText.innerHTML = "Arrow key input enabled";
    }
})

//listen for arrow keys if toggled

    document.addEventListener("keydown", function(event)  {
        if (arrowKeys) {
            switch (event.key) {
                case "ArrowLeft":
                    event.preventDefault();
                    ButtonWest.click();
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    ButtonNorth.click();
                    break;
                case "ArrowRight":
                    event.preventDefault();
                    ButtonEast.click();
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    ButtonSouth.click();
                    break;
            }
        }
    });

