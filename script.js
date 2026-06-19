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

// **** the following section is what is changed in order to change the maze layout ******
// these things may be moved to a Maze class later

// the "maze". the index of the outer array is y. the index of each inner array is x. 
// mirrored up/down "visually" compared to maze as drawn to use first quadrant, which is 
// easier to visualize when assigning coordinates. 
// the content of the inner arrays is the room type, which refers to the index of the
// roomTypes array (below). it's a little awkward that the order for accessing this value is
// [y][x] and not [x][y], but inputing the values that way from the drawn
//  maze would be more error-prone, since it would be rotated 45 degrees and harder to
// keep track of in my head
const rooms = [
    [0, 11, 8, 8, 14, 8, 8, 9],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [4, 1, 8, 8, 1, 8, 8, 15],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 7, 8, 8, 13, 8, 8, 10]
];

//location of keys. the inner arrays are in format [x, y]
const keys = [
    [3, 0],
    [5, 6]
];

//location of treasure box. format [x,y]
const treasureBox = [7, 3];

//starting location
const startingx = 0;
const startingy = 3;

// ****** end of maze-defining section *****

//testing
let testing = true;

//types of rooms (4 directions where each may be passable or not, order NSEW)
//using 1s and 0s to make conditional statements easier later
const roomTypes = ["0000", "1111", "1000", "0100", "0010", "0001", "1100", "0110", "0011", "1001", "0101", "1010", "1110", "0111", "1011", "1101"];

//generate flags for finding keys
const keyFlags = [];
keys.forEach((location) => {
    keyFlags.push(1);
})

//number of keys to open box
const boxKeys = keys.length;

//starting coordinates & room type
//needs to be redone when game restarted
let x = startingx;
let y = startingy;
//currentroomtype needs to be updated every time x or y is
let currentRoomType = roomTypes[rooms[y][x]]; 
let numberOfKeys = 0;

//function for displaying coordinates and roomtype
//for testing
function displayRoomData() { 
    if (testing) {
         roomstats.innerHTML = `<p>Coordinates: ${x}, ${y}<br>Room type: ${currentRoomType}</p>`
    }
};

// function for disabling and enabling buttons
// and changing the map graphic according to room type
//conditions slice a specific character from the roomtype string and 
// convert it to a nubmer to make it truthy / falsey
function manageButtons() {
    if (Number(currentRoomType[0])) {
        ButtonNorth.removeAttribute("disabled");
        northTile.classList.remove("wall");
    } else {
        ButtonNorth.setAttribute("disabled", "disabled");
        northTile.classList.add("wall");
    }
    if (Number(currentRoomType[1])) {
        ButtonSouth.removeAttribute("disabled");
        southTile.classList.remove("wall");
    } else {
        ButtonSouth.setAttribute("disabled", "disabled");
        southTile.classList.add("wall");
    }
    if (Number(currentRoomType[2])) {
        ButtonEast.removeAttribute("disabled");
        eastTile.classList.remove("wall");
    } else {
        ButtonEast.setAttribute("disabled", "disabled");
        eastTile.classList.add("wall");
    }
    if(Number(currentRoomType[3])) {
        ButtonWest.removeAttribute("disabled");
        westTile.classList.remove("wall");
    } else {
        ButtonWest.setAttribute("disabled", "disabled");
        westTile.classList.add("wall");
    }
}

function disableButtons() {
    ButtonNorth.setAttribute("disabled", "disabled");
    ButtonSouth.setAttribute("disabled", "disabled");
    ButtonEast.setAttribute("disabled", "disabled");
    ButtonWest.setAttribute("disabled", "disabled");
}

//function that runs upon finding key
function foundKey() {
    objectImage.src = "key.png";
    objectImage.style.display = "block";
    text.innerHTML = "<p>You found a key!<p>";
    numberOfKeys++;
    text.innerHTML += `<p>You now have ${numberOfKeys} keys.`;
}

//function that runs upon finding chest
function foundChest() {
    objectImage.src = "chest.png";
    objectImage.style.display = "block";
    text.innerHTML = "<p>You found the treasure chest!<p>";
    if (numberOfKeys < boxKeys) {
        text.innerHTML += `<p>Unfortunately, you have ${numberOfKeys} key(s), but need ${boxKeys} keys to open the box.</p>`;
    } else {
        disableButtons();
        text.innerHTML += `<p>Using your ${numberOfKeys} keys, you opened the box and found a great treasure! Congrats! You won the game! Refresh the page to start again.`;
    }
}

//function to check for key
function checkKey() {
    keys.forEach((location, i) => {
        if (x == location[0] && y == location[1]) {
            //check if key was already picked up
            if (keyFlags[i]) {
                keyFlags[i] = 0
                foundKey();
                return;
            } 
        }
    } )     
}

//function for updating coordinates, current room type, keys/chest, and buttons on movement
//this is the main function where most stuff happens
function updatePosition(direction) {
    objectImage.style.display = "none";
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
    currentRoomType = roomTypes[rooms[y][x]];
    displayRoomData();
    //clear textbox
    text.innerHTML = "";
    //check for keys and box
    checkKey();
    manageButtons();
    if (x == treasureBox[0] && y == treasureBox[1]) {
        foundChest();
    }
}

//show starting coordinates and roomtype, then manage buttons
displayRoomData();
manageButtons();

//movement upon directional button click
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


