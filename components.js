/////// LOAD IMAGES ////////

// LOAD BG IMAGE
const BG_IMG = new Image();
BG_IMG.src = "img/bgwall.jpg";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "img/level__.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "img/life.ico";

const SCORE_IMG = new Image();
SCORE_IMG.src = "img/score.png";


/////// END LOAD IMAGES ////////

// ************************ //

/////// LOAD SOUNDS ////////

const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/wall.mp3";

const LIFE_LOST = new Audio();
LIFE_LOST.src = "sounds/life_lost.mp3";

const PADDLE_HIT = new Audio();
PADDLE_HIT.src = "sounds/paddle_hit.mp3";

const WIN = new Audio();
WIN.src = "sounds/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/brick_hit.mp3";


/////// END LOAD SOUNDS ////////
var bricksLevel1 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0,0,0,0]
];
var bricksLevel2 = [
    [0,0,0,0,1,1,1,1,1,0,0,0,0],
    [1,1,0,0,0,0,1.0,0,0,0,1,1],
    [1,1,1,0,0,0,1,0,0,0,1,1,1],
    [1,1,1,1,0,0,1,0,0,1,1,1,1],
    [1,1,1,1,1,0,1,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];
var bricksLevel3 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,1,0,0.1,0,0,0,1,1],
    [1,1,0,0,1,0,0,1,0,0,0,1,1],
    [1,1,0,0,1,0,0,1,0,0,0,1,1],
    [1,1,0,0,1,0,0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];
var bricksLevel4 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,1,0,0.1,0,1,0,1,1],
    [1,1,0,0,1,0,0,1,0,0,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,1,0,0,1,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];
var bricksLevel5 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1.1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
];





























/*


localStorage.setItem("lastname", "Smith");
// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");





var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 document.write(time);
*/
