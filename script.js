
var canvas = document.getElementById("myCanvas");
var canvasContext = canvas.getContext("2d");

var PointGoal1Text = document.getElementById("goal1Points")
var PointGoal2Text = document.getElementById("goal2Points")

var goal1Y = 200;
var goalSpeed = 30;
var goalAISpeed = 10;

var goal2Y = 200;

const GOAL_HEIGHT = 100;

var ballX = 0;
var ballSpeedX = 2;
var ballY = 0;
var ballSpeedY = 2;

var goal1Points = 0;
var goal2Points = 0;

var moveBall = true;

canvas.addEventListener("click", handleMouse);

window.onload = function(){
  window.addEventListener("keypress", move)
  
  var framesPerSecond = 30

  this.setInterval(function(){

  moveEverthing();

  drawEverthing();
    

  }, framesPerSecond/1000)
}

function handleMouse(){
  goal1Points = 0;
  goal2Points = 0;

  PointGoal1Text.innerHTML = `Pontos: ${goal1Points}`;
  PointGoal2Text.innerHTML = `Pontos: ${goal2Points}`;

  moveBall = true;
}

function stopBall(pharse){
  moveBall = false;

  window.alert(pharse)

}

function ballReset(goal1Point, goal2Point){
  ballSpeedY = 3;
  
  if (goal1Point){
    goal1Points++;
    PointGoal1Text.innerHTML = `Pontos: ${goal1Points}`;
    
    if (goal1Points >= 5){
      stopBall("Player 1 ganhou");
    }
  }

  if(goal2Point){
    goal2Points++;
    PointGoal2Text.innerHTML = `Pontos: ${goal2Points}`;
    if (goal2Points >= 5){
      stopBall('Player 2 ganhou');
    }
  }
  
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function computerMovement(){
  var paddle2yCenter = goal2Y + GOAL_HEIGHT / 2;
  
  if (ballX >= canvas.width / 2){
    if (paddle2yCenter < ballY){
      goal2Y += goalAISpeed;
    }
    else if (paddle2yCenter > ballY){
      goal2Y -= goalAISpeed;
    }
  }

  
}

function moveEverthing(){
  if (!moveBall){
    return;
  }
  
  computerMovement()

  ballX += ballSpeedX;
  ballY += ballSpeedY


  if (ballX >= canvas.width){
    
    if (ballY >= goal2Y && ballY <= goal2Y + GOAL_HEIGHT){
      ballSpeedX = -ballSpeedX; 

      var deltaY = ballY - (goal2Y + GOAL_HEIGHT / 2);

      ballSpeedY = deltaY * 0.25;

    }else{
      ballReset(true, false);
    } 
  }

  if (ballX < 0){
    
    if (ballY > goal1Y && ballY < goal1Y + GOAL_HEIGHT){
      ballSpeedX = -ballSpeedX; 

      var deltaY = ballY - (goal1Y + GOAL_HEIGHT / 2);

      ballSpeedY = deltaY * 0.25;

    }else{
      ballReset(false, true);
    } 
  }

  if (ballY >= canvas.height - 20){
    ballSpeedY = -ballSpeedY;
  }
  
  if(ballY <= 0){
    ballSpeedY = -ballSpeedY;
  }
}

function drawNet(){
  for(var i = 0; i < canvas.height; i+=40){
    drawCanvas("gray", canvas.width/2 - 1, i, 2, 20);
  }
}

function drawEverthing(){

  drawCanvas("black", 0, 0, canvas.width, canvas.height);

  if (!moveBall){
    canvasContext.fillStyle = "white";
    canvasContext.fillText("click to restart", canvas.width/2 - 30, canvas.height/2);
    return;
  }

  drawNet();

  drawCanvas("white", 0, goal1Y, 10, GOAL_HEIGHT);

  drawCanvas("white", canvas.width -10, goal2Y, 10, GOAL_HEIGHT);

  shapeCircleCanvas("white", ballX, ballY, 10)
}

function drawCanvas(drawColor, leftX, topY, width, height){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function shapeCircleCanvas(drawColor, centerX, centerY, size){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, size, 0, Math.PI*2, true);
  canvasContext.fill();
}




function move(e){
  switch(e.keyCode){
    case 119:
      if (goal1Y >= 10){
        goal1Y = goal1Y - goalSpeed;
      }
      break;

    case 115:
      if (goal1Y < canvas.height - 100){
        goal1Y = goal1Y + goalSpeed;
      }
      break;
  }
}
