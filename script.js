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
const text = document.querySelector("#description");

//types of rooms (4 directions where each may be passable or not, order NSEW)
const roomTypes = ["0000", "1111", "1000", "0100", "0010", "0001", "1100", "0110", "0011", "1001", "0101", "1010", "1110", "0111", "1011", "1101"];

//the "maze". the index of the outer array is 7. the index of each inner array is x. mirrored up/down visually compared to maze as drawn to avoid using negatives in y axis. the content of the inner arrays is the room type, which refers to the index of the roomTypes array.
const rooms = [
    [0, 11, 8, 8, 12, 8, 8, 9],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [5, 1, 8, 8, 1, 8, 8, 15],
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

//starting coordinates
let x = 0;
let y = 3;

//show starting coordinates
text.innerHTML = `<p>Coordinates: ${x}, ${y}</p>`;

//movement upon directional button click
ButtonNorth.addEventListener("click", () => {
    y++;
    text.innerHTML = `<p>Coordinates: ${x}, ${y}</p>`;
})
ButtonSouth.addEventListener("click", () => {
    y--;
    text.innerHTML = `<p>Coordinates: ${x}, ${y}</p>`;
})
ButtonEast.addEventListener("click", () => {
    x++;
    text.innerHTML = `<p>Coordinates: ${x}, ${y}</p>`;
})
ButtonWest.addEventListener("click", () => {
    x--;
    text.innerHTML = `<p>Coordinates: ${x}, ${y}</p>`;
})




