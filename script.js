//room class
class Room {

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

//function for assigning next rooms