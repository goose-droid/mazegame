// *******************************************************
// ************* map data ****************
// *******************************************************

// first array contains the width of the map (eg. number of arrays)
// and the name of the map.
// then there are a series of arrays connected by index, covering
// object info. the first array is object coordinates,
// the second array is object type, the third array is
// necessary data for the object, if applicable.
// the fourth array defines the object's sprite
// the first object is always the start coordinates
// (for boxes, the number of keys needed to open, and
// for warps, the warp destination)
// once the layout is sliced, the index of the outer array is x
// the indices of the inner arrays are y
// the elements in the inner arrays are tiles
// 0 = wall, 1 = path, 2 = water, 3 = stairs (path for now),
// 4 = unused (wall for now), 5 = warp, 6 = unused (wall for now),
// 7 = mossy floor, 8 = unused (wall), 9 = grass
// evens (incl 0) are impassible, odds are passable
// kind of visually parsable. north is to the right
const originalmaze = [
    [38, "Original Maze"],
    [ [5, 32], [20, 29], [8, 28],[7, 5], [16, 15], [29, 5], [31, 25], [7, 15], [31, 31]],
    [ "start", "box", "key", "key", "key", "key", "key", "warp", "warp"],
    [ null, 5, null, null, null, null, null, [31, 31], [7, 15]],
    [ null, "box", "key", "key", "key", "key", "key", null, null],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 7, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 7, 7, 7, 7, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 7, 7, 2, 2, 7, 7, 7, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0, 1, 0, 7, 0, 0, 7, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 2, 2, 2, 2, 7, 7, 0, 0, 1, 1, 1, 1, 1, 1, 0, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 0, 1, 0, 0, 1, 0, 7, 7, 2, 7 ,2, 2, 2, 7, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 7, 7, 2, 2, 2, 2, 7, 7, 7, 0, 0, 1, 7, 0, 7, 7, 7, 7, 2, 2, 7, 7, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 7, 7, 2, 2, 7, 7, 0, 7, 7, 7, 0, 7, 0, 2, 2, 2, 7, 7, 7, 2, 7, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 7, 7, 7, 7, 0, 0, 1, 0, 7, 2, 7, 2, 2, 2, 7, 7, 2, 7, 2, 7, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 7, 0, 1, 0, 1, 0, 7, 2, 7, 7, 7, 2, 2, 2, 2, 7, 2, 7, 7, 1, 2, 5, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


// *** end map definition

// *******************************************************
// ************* global variables/constants **************
// *******************************************************

//creating constants for document elements

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

//right images
const img_key = document.getElementById("key");
const img_chest = document.getElementById("chest");

//canvas 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rightcanvas = document.getElementById("right-canvas");
const rightctx = rightcanvas.getContext("2d");

//text
const roomstats = document.querySelector("#roomstats");
const text = document.querySelector("#text");
const keysText = document.querySelector("#arrow-keys-status");
const torchText = document.querySelector("#torch-count");

let testing = false;
let arrowKeys = false;
let dark = true;
let lessDark = false;
let torches = 5;
let torchSteps = 0;
let gameover = false;
let y = 0;
let x = 0;
let numberOfKeys = 0;
let boxKeys = 0;
let keyFlags = [];
let squaresCoords = [];
let tiles = [];
let objectcoords = [];
let objecttypes = [];
let objectinfos = [];
let mapname = "default";

const tileClassNames = ["wall", "path", "water", "path", "wall", "warp", "wall", "mossyfloor", "wall", "grass"];


// *******************************************************
// ********************* functions  **********************
// *******************************************************

function loadMap(map) {
    //slice layout
    tiles = map.slice(-1 * (map[0][0]));
    console.log(tiles);

    mapname = map[0][1];
    console.log(mapname);

    //slice object arrays
    objectcoords = map[1];
    objecttypes = map[2];
    objectinfos = map[3];
    objectsprites = map[4];
    console.log(objectcoords);
    console.log(objecttypes);
    console.log(objectinfos);
    console.log(objectsprites);
}

// removing pickup objects from objecttypes array
// so they can't be picked up more than once
function pickup(objectindex) {
    switch (objecttypes[objectindex]){
        case "key":
            drawRightImage(img_key);
            numberOfKeys++;
            text.innerHTML = "<p>You found a key!<p>";
            text.innerHTML += `<p>You now have ${numberOfKeys} key(s).`;
            break;
        default:
            alert("error: picked up item type without switch case in pickup()");
            break;
    }
    objecttypes.splice(objectindex, 1, null);
    objectcoords.splice(objectindex, 1, [100, 100]); //has to be coordinates or findIndex doesn't work later
}

//function to set up squaresCoords
function applySquaresCoords() {
    squaresCoords = [];
    for (j = 3; j > -4; j--) {
        for (k = -3; k < 4; k++) {
            squaresCoords.push([x+k, y+j]);
        }
    }
}

//function for clearing right canvas
function clearRightCanvas() {
    rightctx.clearRect(0, 0, 210, 210);
}

//function for drawing image to right canvas
function drawRightImage(imageName) {
    clearRightCanvas();
    rightctx.drawImage(imageName, 0, 0, 210, 210);
}

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
    case "box":
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

//functions for drawing darkness
function drawFrame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 210, 60);
    ctx.fillRect(0, 0, 30, 210);
    ctx.fillRect(180, 0, 30, 210);
    ctx.fillRect(0, 180, 210, 30);
}

function drawLessDark() {
    ctx.fillStyle  = "black";
    ctx.fillRect(0, 0, 210, 60);
    ctx.fillRect(0, 0, 60, 210);
    ctx.fillRect(150, 0, 60, 210);
    ctx.fillRect(0, 150, 210, 60);
}

function drawDark() {
    ctx.fillStyle  = "black";
    ctx.fillRect(0, 0, 210, 90);
    ctx.fillRect(0, 0, 90, 210);
    ctx.fillRect(120, 0, 90, 210);
    ctx.fillRect(0, 120, 210, 90);
}


//draw background
function drawBackground(xoffset, yoffset) {
    let j = 0;
    //let light = true;
    for (let i = 0; i < 7; i++) {
        for (let k = 0; k < 7; k++) {
            //apply map tiles
            drawTile(tileClassNames[tiles[squaresCoords[j][0]][squaresCoords[j][1]]], (30 * k)  + xoffset, (30 * i)  + yoffset );
            
            //apply object sprites if applicable
            let objectindex = objectcoords.findIndex(target => target[0] === squaresCoords[j][0] && target[1] === squaresCoords[j][1]);
            if (objectindex != -1) {
                if (objectsprites[objectindex]) {
                    drawTile(objectsprites[objectindex], (30 * k)  + xoffset, (30 * i)  + yoffset);
                }
            }

            //apply darkness
            if (dark && !lessDark) {
                drawDark();
            } else if (lessDark) {
                drawLessDark();
            } else {
                drawFrame();
            }
            j++;
        }
    }       
}
    
//draw character
function drawChara() {
    drawTile("person", 90, 90);
}

//for testing
function displayRoomData() {
    if (testing) {
        roomstats.innerHTML = `<p>Coordinates: ${x}, ${y}<br>Tile type: ${tileClassNames[tiles[x][y]]}</p>`;     
    };
}

function checkObjects() {
    //see if there is an object at x, y by trying to assign the index for it. 
    let objectindex = objectcoords.findIndex(target => target[0] === x && target[1] === y);
    //findIndex returns -1 if target not in array
    if (objectindex != -1){
        switch(objecttypes[objectindex]) {
            case "key":
                pickup(objectindex);
                break;
            case "box":
                foundChest(objectindex);
                break;
            case "warp":
                x = objectinfos[objectindex][0];
                y = objectinfos[objectindex][1];
                applySquaresCoords();
                drawBackground(0,0);
                break;
            default:
                console.log("error: no case for this type of object in checkObjects switch");
                break;
        }
    }
}

//turns buttons on or off depending on what tile types
//lie to the north/south/east/west
function manageButtons() {
    ButtonToggleArrowKeys.removeAttribute("disabled");
    if (torches > 0) {
        ButtonUseTorch.removeAttribute("disabled");
    }
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

function foundChest(objectindex) {
    text.innerHTML = "<p>You found the treasure chest!<p>";
    drawRightImage(img_chest);
    if (numberOfKeys < objectinfos[objectindex]) {
        text.innerHTML += `<p>Unfortunately, you have ${numberOfKeys} key(s), but need ${objectinfos[objectindex]} keys to open the box.</p>`;
    } else {
        gameover = true;
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
    drawBackground(0, 0);
    drawChara();
}

function scrollBackground (xoffset , yoffset) {

    return new Promise((resolve) => {
        
        function loop() {
            drawBackground(xoffset, yoffset);
            drawChara();

            if (xoffset > 0) {
                xoffset--;
            } else if (xoffset < 0) {
                xoffset++;
            }
            if (yoffset > 0) {
                yoffset--;
            } else if (yoffset < 0) {
                yoffset++;
            }

            if (xoffset != 0 || yoffset != 0) {
                setTimeout(() => {
                    requestAnimationFrame(loop);
                }, 1000/60); //1000/x where x is targeted fps
                
            } else {
                resolve("scrolling done");
            }
        }       
        requestAnimationFrame(loop);
    });
}

//handles movement, updating the pictures, refreshing the
//object picture to default, managing buttons, clearing
//the text box, and checking for keys or box on new tile
//basically the main function of the puzzle
async function updatePosition(direction) {
    disableButtons();
    clearRightCanvas();
    let yoffset = 0;
    let xoffset = 0;
    switch(direction) {
        case "n":
            y++;
            yoffset = -30;
            break;
        case "s":
            y--;
            yoffset = +30;
            break;
        case "e":
            x++;
            xoffset = +30;
            break;
        case "w":
            x--;
            xoffset = -30;
            break;
    }
    //currentTyleType = tiles[x][y];
     
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
    const message = await scrollBackground(xoffset, yoffset);
    console.log(message);
    //drawBackground(0, 0);
    //objectImage.src = "person.png";
    displayRoomData();
    //clear textbox
    text.innerHTML = "";
   //check for objects
    checkObjects();
    drawChara();
    if (!gameover) {
        manageButtons();
    }
}

// *******************************************************
// ************* actual program execution ****************
// *******************************************************

//start up sequence

loadMap(originalmaze);

//set starting position
x = objectcoords[0][0];
y = objectcoords[0][1];

//run squarescoords function the first time to set up starting coords
applySquaresCoords();

displayRoomData();
manageButtons();

keysText.innerHTML = "Arrow key input disabled";
torchText.innerHTML = `Torches left: ${torches}`;

//draw starting position after spritesheet loads
window.onload = (event) => {
    // apply starting data
    drawBackground(0, 0);
    drawChara();
}

//button listeners

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