//room class
/*class Room {

    //fields
    roomId;
    north;
    south;
    east;
    west;

    //contsructor
    constructor(roomId, north, south, east, west) {
        this.roomId = roomId;
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
    }

}

//initializing the rooms


//variables
let currentRoom;
let targetRoom;
let northRoom;
let southRoom;
let eastRoom;
let westRoom;
*/

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//text
const roomstats = document.querySelector("#roomstats");
const text = document.querySelector("#text");

//types of rooms (4 directions where each may be passable or not, order NSEW)
const roomTypes = ["0000", "1111", "1000", "0100", "0010", "0001", "1100", "0110", "0011", "1001", "0101", "1010", "1110", "0111", "1011", "1101"];

//the "maze". the index of the outer array is y. the index of each inner array is x. mirrored up/down "visually" compared to maze as drawn to avoid using negatives in y axis. the content of the inner arrays is the room type, which refers to the index of the roomTypes array. it's a little awkward that the order for accessing this value is [y][x] and not [x][y], but inputing the values the other way around from the drawn maze would be more error-prone, since it would be rotated 45 degrees.
const rooms = [
    [0, 11, 8, 8, 14, 8, 8, 9],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [4, 1, 8, 8, 1, 8, 8, 15],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 7, 8, 8, 13, 8, 8, 10]
];

//location of keys. the inner arrays are in format [x, y] for location on grid
const keys = [
    [3, 0],
    [5, 6]
];

//location of treasure box. format [x,y]
const treasureBox = [7, 3];
//number of keys to open box
const boxKeys = 2;

//starting coordinates & room type
let x = 0;
let y = 3;
let currentRoomType = roomTypes[rooms[y][x]]; //needs to be updated every time x or y is.
let numberOfKeys = 0;

//function for determining room type from coordinates
/*function findRoomType() {
    let roomTypeIndex = rooms[y][x];
    return roomTypes[rooms[y][x]];
}*/

//function for displaying coordinates and roomtype
function displayRoomData() { 
    roomstats.innerHTML = `<p>Coordinates: ${x}, ${y}<br>Room type: ${currentRoomType}</p>` 
};

//function for disabling and enabling buttons according to room type
function manageButtons() {
    if (Number(currentRoomType[0])) {
        ButtonNorth.removeAttribute("disabled");
    } else {
        ButtonNorth.setAttribute("disabled", "disabled");
    }
    if (Number(currentRoomType[1])) {
        ButtonSouth.removeAttribute("disabled");
    } else {
        ButtonSouth.setAttribute("disabled", "disabled");
    }
    if (Number(currentRoomType[2])) {
        ButtonEast.removeAttribute("disabled");
    } else {
        ButtonEast.setAttribute("disabled", "disabled");
    }
    if(Number(currentRoomType[3])) {
        ButtonWest.removeAttribute("disabled");
    } else {
        ButtonWest.setAttribute("disabled", "disabled");
    }
}

//function that runs upon finding key
function foundKey() {
    text.innerHTML = "<p>You found a key!<p>";
    numberOfKeys++;
    text.innerHTML += `<p>You now have ${numberOfKeys} keys.`;
}

//function that runs upon finding chest
function foundChest() {
    text.innerHTML = "<p>You found the treasure chest!<p>";
    if (numberOfKeys < boxKeys) {
        text.innerHTML += `<p>Unfortunately, you have ${numberOfKeys} key(s), but need ${boxKeys} keys to open the box.</p>`;
    } else {
        text.innerHTML += `<p>Using your ${numberOfKeys} keys, you opened the box and found a great treasure! Congrats!`;
    }
}

//function to check for key
function checkKey() {
    keys.forEach((location) => {
        if (x == location[0] && y == location[1]) {
            foundKey();
        }
    } )     
}

//function for updating coordinates, current room type, and buttons on movement
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
    currentRoomType = roomTypes[rooms[y][x]];
    displayRoomData();
    text.innerHTML = "";
    //check for keys and box
    checkKey();
    if (x == treasureBox[0] && y == treasureBox[1]) {
        foundChest();
    }
    manageButtons();
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


