// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #fff";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

// GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 120;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 9;
let LIFE = 3; // PLAYER HAS 3 LIVES
let SCORE = 0;
const SCORE_UNIT = 10;
let LEVEL = 1;
const MAX_LEVEL = 5;
let GAME_OVER = false;
let PAUSED =false;
let leftArrow = false;
let rightArrow = false;
let cSpeed=5;

var seconds = 0;
var minutes = 0;
var timer = 0;
var currentBestTime=localStorage.getItem("currentBestTime");
localStorage.setItem("currentBestTime", currentBestTime);

/*var currentBestTime;
localStorage.setItem("currentBestTime", 3500);*/
var timerID = undefined;


function Time(){
  seconds ++;
  if(seconds > 59){
    seconds = 0;
    minutes ++;
  }


  console.log("seconds = " + seconds + "   minutes = " + minutes);
}





timerID = setInterval(Time, 1000);

// CREATE THE PADDLE
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :10
}

// DRAW PADDLE
function drawPaddle(){
    ctx.fillStyle = "#055164";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = "#fff";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});

// MOVE PADDLE
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width+PADDLE_WIDTH-20){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x+PADDLE_WIDTH-20 > 0){
        paddle.x -= paddle.dx;
    }
}

// CREATE THE BALL
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : cSpeed,
    dx : cSpeed * (Math.random() * 2 - 1),
    dy : -cSpeed
}

// DRAW THE BALL
function drawBall(){
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#7a4d99";
    ctx.fill();

    ctx.strokeStyle = "#f00";
    ctx.stroke();

    ctx.closePath();
}
function makeEquation (r,c){
    if (LEVEL ===1){
        if (bricksLevel1[r][c]===0)return false;
        return true;
    }
    if(LEVEL ===2){
        if (bricksLevel2[r][c]===0)return false;
        return true;
    }
    if(LEVEL ===3){
        if (bricksLevel3[r][c]===0)return false;
        return true;
    }
    if(LEVEL ===4){
        if (bricksLevel4[r][c]===0)return false;
        return true;
    }
    if(LEVEL ===5){
        if (bricksLevel5[r][c]===0)return false;
        return true;
    }

}

// MOVE THE BALL
function moveBall(){

    ball.x += ball.dx;
    ball.y += ball.dy;

}
// BALL AND WALL COLLISION DETECTION
function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        WALL_HIT.play();
    }

    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }

    if(ball.y + ball.radius > cvs.height -PADDLE_MARGIN_BOTTOM){
        LIFE--; // LOSE LIFE
        LIFE_LOST.play();
        resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.speed=cSpeed;
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = cSpeed * (Math.random() * 2 - 1);
    ball.dy = -cSpeed;

    console.log(cSpeed);
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
      // PLAY SOUND
            PADDLE_HIT.play();

        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width/2);

        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI/3;


        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

// CREATE THE BRICKS
const brick = {
    row : 6,
    column :13,
    width : 60,
    height : 20,
    offSetLeft : 30,
    offSetTop : 20,
    marginTop :55,
    fillColor : "#c23725",
    strokeColor : "#fcba03"
}

let bricks = [];

function createBricks(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : makeEquation(r,c)
            }
        }
    }
}
// draw the bricks
function drawBricks(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);

                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}



createBricks();
// DRAW FUNCTION


// ball brick collision
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){

                    BRICK_HIT.play();
                    ball.dy = - ball.dy;
                    b.status = false; // the brick is broken
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}
// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY,width=35,height=35){
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    // draw image
    ctx.drawImage(img, imgX, imgY, width, height );
}
function timeState(minutes,seconds){
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  let txt="Time "+ minutes + " : "+ seconds;
  ctx.fillText(txt, x=750, y=35);
    let txt2="Best Time "+ Math.floor(currentBestTime/60) + " : "+ currentBestTime%60;
    ctx.fillText(txt2, x=550, y=35);

}

function draw(){
    drawPaddle();

    drawBall();
    drawBricks();
    // SHOW SCORE
showGameStats(SCORE, 55,35, SCORE_IMG, 5, 10);
// SHOW LIVES
showGameStats(LIFE, cvs.width-50 , 35, LIFE_IMG, cvs.width-100, 10);
// SHOW LEVEL
showGameStats(LEVEL,350, 35, LEVEL_IMG, 300, 10);

timeState(minutes,seconds);

}
// game over
function gameOver(){
    if(LIFE <= 0){
        showYouLose();
          clearInterval(timerID);
        GAME_OVER = true;
    }
}
function compareAndStoreBestTime(){
  var wholeTime=minutes*60+seconds;
  minutes = 0;
  seconds = 0;
  if(wholeTime<currentBestTime)
  {
    localStorage.setItem("currentBestTime",wholeTime);
    return true;
  }
  else {
    return false;
  }

}
// level up
function levelUp(){
    let isLevelDone = true;

    // check if all the bricks are broken
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }

    if(isLevelDone){
      WIN.play();

        if(LEVEL >= MAX_LEVEL){
            showYouWin();
            GAME_OVER = true;




            clearInterval(timerID);
            /* save values in local storage and compare*/






            return;
        }
    //    brick.row++;
        LEVEL++;
        LIFE++;

        createBricks();
        cSpeed+=1;
        ball.speed =cSpeed;
        resetBall();
        console.log("hi from levelUp")

    }
}


// UPDATE GAME FUNCTION
function update(){
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();
    ballBrickCollision();
    gameOver();

    levelUp();

}
  var reqId=null;
// GAME LOOP
function loop(){
    // CLEAR THE CANVAS
    ctx.drawImage(BG_IMG, 0, 0);

    draw();

    update();


  /*  if(! GAME_OVER){
         requestAnimationFrame(loop);
    }*/

    if(PAUSED) return;
    else  if(! GAME_OVER){
            window.requestAnimationFrame(loop);
      }
}

loop();



/* plau and pause functions */
const playPauseBautton = document.getElementById("play");
playPauseBautton.addEventListener("click", PlayPause);

function PlayPause(){
  PAUSED=!PAUSED;
  let imgSrc = playPauseBautton.getAttribute("src");
  let PLAY_IMG = imgSrc == "img/pause.png" ? "img/play.png" : "img/pause.png";
  playPauseBautton.setAttribute("src", PLAY_IMG);
if(!PAUSED){
  loop();
  timerID=setInterval(Time,1000);
}
else {
  clearInterval(timerID);
}

}




// SELECT SOUND ELEMENT
const soundElement  = document.getElementById("sound");

soundElement.addEventListener("click", audioManager);
function audioManager(){


    // CHANGE IMAGE SOUND_ON/OFF
    let imgSrc = soundElement.getAttribute("src");
    let SOUND_IMG = imgSrc == "img/SOUND_ON.png" ? "img/SOUND_OFF.png" : "img/SOUND_ON.png";

    soundElement.setAttribute("src", SOUND_IMG);

    // MUTE AND UNMUTE SOUNDS
    WALL_HIT.muted = WALL_HIT.muted ? false : true;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
    BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
    WIN.muted = WIN.muted ? false : true;
    LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */
const gameover = document.getElementById("gameover");
const youwin = document.getElementById("youwin");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");
const timebadge = document.getElementById("timebadge");
// CLICK ON PLAY AGAIN BUTTON
restart.addEventListener("click", function(){
    location.reload(); // reload the page
})

// SHOW YOU WIN
function showYouWin(){
    gameover.style.display = "block";
    youwon.style.display = "block";
    compareAndStoreBestTime()?   timebadge.style.display="block":   timebadge.style.display="none";

}


// SHOW YOU LOSE
function showYouLose(){
    gameover.style.display = "block";
    youlose.style.display = "block";
}
