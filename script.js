// *******************************************************
// ************* global variables/constants **************
// *******************************************************

//Map

// first array contains the width of the map (eg. number of arrays),
// the height of the map (eg. number of items in each array),
// the default tile (for borders), the map name, and the map ID.
// second array is the key for the tile types.
// once the layout is sliced, the index of the outer array is x
// the indices of the inner arrays are y
// the elements in the inner arrays are tiles
// evens (incl 0) are impassible, odds are passable
// kind of visually parsable. north is to the right
const groundfloor = [
    [13, 13, "wall", "Ground Floor", 0],
    ["wall", "path", "water", "downarrow", "wall", "warp", "wall", "mossyfloor", "wall", "uparrow", "wall"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 3, 0, 1, 1, 1, 0, 0, 3, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const basement = [
    [16, 9, "wall", "Basement", 1],
    ["wall", "path", "water", "downarrow", "wall", "warp", "wall", "mossyfloor", "wall", "uparrow", "wall"],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 9, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 1, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 9, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Maze objects

//table of objects in maze. index is map id
let objectcoords = [
    [ [6, 6], [9, 6], [9, 1], [2, 6], [6, 4], [6, 11], [9, 11], [11, 8] ],
    [ [4, 5], [1, 3], [13, 4], [5, 3], [9, 1], [9, 8], [12, 8], [14, 5] ]
]

//object type. main index is map id, inner indices same as in objects array
let objecttypes = [
    [ "key", "key", "key", "exit", "exit", "exit", "exit", "exit" ],
    [ "key", "key", "box", "exit", "exit", "exit", "exit", "exit" ]
]

//needed extra info for each object
let objectinfos = [
    [ null, null, null, [basement, 5, 3], [basement, 9, 1], [basement, 9, 8], [basement, 12, 8], [basement, 14, 5] ],
    [ null, null, null, [groundfloor, 2, 6], [groundfloor, 6, 4], [groundfloor, 6, 11], [groundfloor, 9, 11], [groundfloor, 11, 8] ]
]

let objectsprites = [
    [ "key", "key", "key", null, null, null, null, null],
    [ "key", "key", "box", null, null, null, null, null]
]

let keysneededtowin = 5;


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

//continue button
const ButtonContinue = document.querySelector("#continue");

//sprite sheet
const sheet = document.getElementById("source");

//temp person sprite
const character = document.getElementById("character");

//arrow sprites
const uparrow = document.getElementById("uparrow");
const downarrow = document.getElementById("downarrow");

//right images
const img_key = document.getElementById("key");
const img_chest00 = document.getElementById("chest00");
const img_chest01 = document.getElementById("chest01");
const img_chest02 = document.getElementById("chest02");
const img_chest03 = document.getElementById("chest03");
const img_chest04 = document.getElementById("chest04");
const img_chestopen = document.getElementById("chestopen");

//canvas 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rightcanvas = document.getElementById("right-canvas");
const rightctx = rightcanvas.getContext("2d");

//text
const locationdisplay = document.querySelector("#location");
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
let mapname = "default";
let mapwidth = 0;
let mapheight = 0;
let defaulttile = "wall";
let locked = false;
let mapid = -1;
let tileClassNames = [];


// *******************************************************
// ********************* functions  **********************
// *******************************************************

function loadMap(map, startx, starty) {
    //slice layout
    tiles = [];
    tiles = map.slice(-1 * (map[0][0]));
    console.log(tiles);

    //map width, height, name
    mapwidth = map[0][0];
    mapheight = map[0][1];
    mapname = map[0][3];
    mapid = map[0][4];
    defaulttile = map[0][2]
    console.log(mapwidth);
    console.log(mapheight);
    console.log(defaulttile);
    console.log(mapname);

    //set starting position
    x = startx;
    y = starty;

    //display location
    displayLocation();

    tileClassNames = [];
    tileClassNames = map[1];
    /*
    //slice object arrays
    objectcoords = map[1];
    objecttypes = map[2];
    objectinfos = map[3];
    objectsprites = map[4];
    console.log(objectcoords);
    console.log(objecttypes);
    console.log(objectinfos);
    console.log(objectsprites);*/
}

// removing pickup objects from objecttypes array
// so they can't be picked up more than once
function pickup(objectindex) {
    switch (objecttypes[mapid][objectindex]){
        case "key":
            //eventLock();
            drawRightImage(img_key);
            numberOfKeys++;
            text.innerHTML = "<p>You found a key!<p>";
            text.innerHTML += `<p>You now have ${numberOfKeys} key(s).`;
            break;
        default:
            alert("error: picked up item type without switch case in pickup()");
            break;
    }
    objecttypes[mapid].splice(objectindex, 1, null);
    objectcoords[mapid].splice(objectindex, 1, [100, 100]); //has to be coordinates or findIndex doesn't work later
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

//locks the directional keys and the torch button until click continue
function eventLock() {
    locked = true;
    disableButtons();
    ButtonContinue.removeAttribute("disabled");
    ButtonContinue.classList.remove("hidden");
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
      ctx.drawImage(character, canvasx, canvasy);
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
    case "uparrow":
        ctx.drawImage(uparrow, canvasx, canvasy);
        break;
    case "downarrow":
        ctx.drawImage(downarrow, canvasx, canvasy);
        break;
    default:
      ctx.drawImage(sheet, 0, 0, 20, 20, canvasx, canvasy, 30, 30);
      break;
   }
  }

//functions for drawing darkness
function drawFrame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 210, 30);
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
            //check if off border of map
            if (squaresCoords[j][0] > mapwidth - 1 || squaresCoords[j][0] < 0 || squaresCoords[j][1] > mapheight - 1 || squaresCoords[j][1] < 0) {
                //console.log(`off map i:${i} k:${k} squarescoords[j][0]: ${squaresCoords[j][0]} squarescoords[j][1]: ${squaresCoords[j][1]}`);
                drawTile(defaulttile, (30 * k) + xoffset, (30 * i) + yoffset);
            } else {

                //apply map tiles
                //console.log(tileClassNames[tiles[squaresCoords[j][0]][squaresCoords[j][1]]]);
                drawTile(tileClassNames[tiles[squaresCoords[j][0]][squaresCoords[j][1]]], (30 * k)  + xoffset, (30 * i)  + yoffset );
                
                //apply object sprites if applicable
                let objectindex = objectcoords[mapid].findIndex(target => target[0] === squaresCoords[j][0] && target[1] === squaresCoords[j][1]);
                if (objectindex != -1) {
                    if (objectsprites[mapid][objectindex]) {
                        drawTile(objectsprites[mapid][objectindex], (30 * k)  + xoffset, (30 * i)  + yoffset);
                    }
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
function displayLocation() {

    locationdisplay.innerHTML = `<p>Location: ${mapname}</p>`;     
   
}

function checkObjects() {
    //see if there is an object at x, y by trying to assign the index for it. 
    let objectindex = objectcoords[mapid].findIndex(target => target[0] === x && target[1] === y);
    //findIndex returns -1 if target not in array
    if (objectindex != -1){
        console.log(objecttypes[mapid][objectindex]);
        switch(objecttypes[mapid][objectindex]) {
            case "key":
                pickup(objectindex);
                break;
            case "box":
                foundChest(objectindex);
                break;
            case "warp":
                x = objectinfos[mapid][objectindex][0];
                y = objectinfos[mapid][objectindex][1];
                applySquaresCoords();
                drawBackground(0,0);
                break;
            case "exit":
                loadMap(objectinfos[mapid][objectindex][0], objectinfos[mapid][objectindex][1], objectinfos[mapid][objectindex][2]);
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
    ButtonContinue.setAttribute("disabled", "disabled");
    ButtonContinue.classList.add("hidden");
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
    switch(numberOfKeys) {
        case 0:
            drawRightImage(img_chest00);
            break;
        case 1:
            drawRightImage(img_chest01);
            break;
        case 2:
            drawRightImage(img_chest02);
            break;
        case 3:
            drawRightImage(img_chest03);
            break;
        case 4:
            drawRightImage(img_chest04);
            break;
        case 5:
            drawRightImage(img_chestopen);
            break;
        default:
            break;
    }
    if (numberOfKeys < keysneededtowin) {
        //eventLock();
        text.innerHTML += `<p>Unfortunately, you have ${numberOfKeys} key(s), but need ${keysneededtowin} keys to open the box.</p>`;
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
    torchText.innerHTML = `Refills left: ${torches}`;
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
    if (torchSteps > 80 && torchSteps < 130) {
        lessDark = true;
    }
    if (torchSteps > 129) {
        lessDark = false;
        dark = true;
        torchSteps = 0;
    }
    applySquaresCoords();
    const message = await scrollBackground(xoffset, yoffset);
    console.log(message);
    //clear textbox and right canvas
    clearRightCanvas();
    text.innerHTML = "";
   //check for objects
    checkObjects();
    drawChara();
    if (!gameover && !locked) {
        manageButtons();
    }
    console.log(mapid);
    console.log(x);
    console.log(y);
}

// *******************************************************
// ************* actual program execution ****************
// *******************************************************

//start up sequence

//load the first map
loadMap(groundfloor, 1, 8);

//run squarescoords function the first time to set up starting coords
applySquaresCoords();

keysText.innerHTML = "Keyboard input disabled";
torchText.innerHTML = `Refills left: ${torches}`;

//draw starting position after spritesheet loads
window.onload = (event) => {
    // apply starting data
    drawBackground(0, 0);
    drawChara();
    eventLock();
    text.innerHTML = "<p>The goal of this game is to find the treasure chest, plus all the keys needed to open it. Click the directional buttons to move. If you toggle on keyboard controls, use the arrow keys to move, the enter key to \"continue\", and L to refill your lamp.</p>";
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
        keysText.innerHTML = "Keyboard input disabled";
    } else {
        arrowKeys = true;
        keysText.innerHTML = "Keyboard input enabled";
    }
})

//listen for continue button
ButtonContinue.addEventListener("click", () => {
    locked = false;
    manageButtons();
    text.innerHTML = "";
})

//listen for keyboard keys if toggled

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
            case "Enter":
                event.preventDefault();
                ButtonContinue.click();
                break;
            case "l":
                event.preventDefault();
                ButtonUseTorch.click();
                break;
            case "L":
                event.preventDefault();
                ButtonUseTorch.click();
                break;
        }
    }
});