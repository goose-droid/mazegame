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

//directional buttons
const ButtonNorth = document.querySelector("#ButtonNorth");
const ButtonSouth = document.querySelector("#ButtonSouth");
const ButtonEast = document.querySelector("#ButtonEast");
const ButtonWest = document.querySelector("#ButtonWest");

//function for assigning next rooms*/

//types of rooms (4 directions where each may be passable or not)
const roomTypes = ["0000", "1111", "1000", "0100", "0010", "0001", "1100", "0110", "0011", "1001", "0101", "1010", "1110", "0111", "1011", "1101"]

//the "maze"
const rooms = [
    [0, 7, 8, 8, 13, 8, 8, 10],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [5, 1, 8, 8, 1, 8, 8, 15],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 6, 0, 0, 6, 0, 0, 6],
    [0, 11, 8, 8, 12, 8, 8, 9]
]

