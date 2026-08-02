///*** creating constants for document elements */

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//arrow keys toggle button
const ButtonToggleArrowKeys = document.querySelector("#toggle-arrow-keys");

//use torch button
const ButtonUseTorch = document.querySelector("#use-torch");

//sprite sheet
const sheet = document.getElementById("source");

//canvas 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//text
const roomstats = document.querySelector("#roomstats");
const text = document.querySelector("#text");
const keysText = document.querySelector("#arrow-keys-status");
const torchText = document.querySelector("#torch-count");

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 7, 7, 7, 7, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 7, 7, 2, 2, 7, 7, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0, 1, 0, 7, 0, 0, 7, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 7, 2, 2, 2, 2, 7, 7, 0, 0, 1, 1, 1, 1, 1, 1, 0, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 0, 1, 0, 7, 7, 2, 7 ,2, 2, 2, 7, 0, 0, 1, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 7, 0, 0, 1, 7, 0, 7, 7, 7, 7, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 7, 7, 2, 2, 7, 7, 0, 7, 7, 7, 0, 7, 0, 2, 2, 2, 7, 7, 7, 2, 7, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 7, 7, 7, 7, 0, 0, 1, 0, 7, 2, 7, 2, 2, 2, 7, 7, 2, 7, 2, 7, 0, 1, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 7, 0, 1, 0, 1, 0, 7, 2, 7, 7, 7, 2, 2, 2, 2, 7, 2, 7, 7, 1, 2, 5, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 1, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// key locations. [x, y]
const keys = [
    [6, 26],
    [5, 3], 
    [14, 13],
    [27, 3],
    [29, 23]
];

// location of treasure box. format [x, y]
const treasureBox = [18, 27];

// starting location. format [x, y]
const startingPosition = [3, 30];

//warp A format [x, y]
const warpA = [5, 13];

//warp B format [x, y]
const warpB = [29, 29];

// *** end map definition
// variables/constants

let testing = false;
let arrowKeys = false;
let dark = true;
let lessDark = false;
let torches = 5;
let torchSteps = 0;

const tileClassNames = ["wall", "path", "water", "path", "wall", "warp", "wall", "mossyfloor", "wall", "grass"];

//number of keys to open box
const boxKeys = keys.length;

//tiles that are dark when dark
const darkTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const lessDarkTiles = [0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24]

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
    squaresCoords = [];
    for (j = 2; j > -3; j--) {
        for (k = -2; k < 3; k++) {
            squaresCoords.push([x+k, y+j]);
        }
    }
}

//run function the first time to set up starting coords
applySquaresCoords();

//function for drawing sprites to canvas
function drawTile (type, canvasx, canvasy) {
   switch (type) {
    case "wall":
      ctx.drawImage(sheet, 0, 0, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "path":
      ctx.drawImage(sheet, 30, 0, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "mossyfloor":
      ctx.drawImage(sheet, 60, 0, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "water":
      ctx.drawImage(sheet, 90, 0, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "warp":
      ctx.drawImage(sheet, 0, 30, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "person":
      ctx.drawImage(sheet, 30, 30, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "key":
      ctx.drawImage(sheet, 60, 30, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "chest":
      ctx.drawImage(sheet, 90, 30, 30, 30, canvasx, canvasy, 30, 30);
      break;
    case "dark":
        ctx.fillRect(canvasx, canvasy, 30, 30);
        break;
    default:
      ctx.drawImage(sheet, 0, 0, 20, 20, canvasx, canvasy, 30, 30);
      break;
   }
  }


//draw background
function drawBackground() {
    let j = 0;
    for (let i = 0; i < 5; i++) {
      for (let k = 0; k < 5; k++) {
        if (lessDark && lessDarkTiles.includes(j)) {
            drawTile("dark", 30 * k, 30 * i);
        }
        else if (dark && darkTiles.includes(j)) {
            drawTile("dark", 30 * k, 30 * i);
        } else {
            drawTile(tileClassNames[tiles[squaresCoords[j][0]][squaresCoords[j][1]]], 30 * k, 30 * i )
            if (checkKey(squaresCoords[j][0], squaresCoords[j][1])) {
            drawTile("key", 30 * k, 30 * i);
            }
            if (squaresCoords[j][0] == treasureBox[0] && squaresCoords[j][1] == treasureBox[1]) {
            drawTile("chest", 30 * k, 30 * i);
            }
        }
        j++;
        }
    }       
}
    
    

//draw character
function drawChara() {
    drawTile("person", 60, 60);
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
    ButtonUseTorch.setAttribute("disabled", "disabled");
}

function useTorch(){
    torches--;
    torchSteps = 0;
    torchText.innerHTML = `Torches left: ${torches}`;
    if (torches < 1) {
        ButtonUseTorch.setAttribute("disabled", "disabled");
    };
    dark = false;
    lessDark = false;
    drawBackground();
    drawChara();
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
    if (currentTyleType == 5){
        if (x == warpA[0] && y == warpA[1]) {
            x = warpB[0];
            y = warpB[1];
        } else if (x == warpB[0] && y == warpB[1]) {
            x = warpA[0];
            y = warpA[1];
        }
    } 
    if (!dark) {
        torchSteps++;
    }
    if (torchSteps > 40 && torchSteps < 71) {
        lessDark = true;
    }
    if (torchSteps > 70) {
        lessDark = false;
        dark = true;
        torchSteps = 0;
    }
    applySquaresCoords();
    manageButtons();
    drawBackground();
    //objectImage.src = "person.png";
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
    drawChara();
}

// apply starting data
drawBackground();
drawChara();
displayRoomData();
manageButtons();
keysText.innerHTML = "Arrow key input disabled";
torchText.innerHTML = `Torches left: ${torches}`;

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

//listen for torch button
ButtonUseTorch.addEventListener("click", () => {
    useTorch();
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

