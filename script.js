
var canvas = document.getElementById("myCanvas");
var canvasContext = canvas.getContext("2d");

var PointGoal1Text = document.getElementById("goal1Points")
var PointGoal2Text = document.getElementById("goal2Points")

var goal1Y = 200;
var goalSpeed = 10;

var goal2Y = 200;

const GOAL_HEIGHT = 100;

var ballX = 0;
var ballSpeedX = 5;
var ballY = 0;
var ballSpeedY = 5;

var goal1Points = 0;
var goal2Points = 0;

var moveBall = true;

window.onload = function(){
  window.addEventListener("keypress", move)
  
  var framesPerSecond = 30

  this.setInterval(function(){

    drawEverthing();
    
    if (moveBall === true){
      moveEverthing();
    }

  }, framesPerSecond/1000)
}

function stopBall(pharse){
  moveBall = false;
  window.alert(pharse)
}

function ballReset(goal1Point, goal2Point){
  if (goal1Point){
    goal1Points++;
    PointGoal1Text.innerHTML = `Pontos: ${goal1Points}`;
    if (goal1Points >= 5){
      stopBall("Gol 1 ganhou");
    }
  }

  if(goal2Point){
    goal2Points++;
    PointGoal2Text.innerHTML = `Pontos: ${goal2Points}`;
    if (goal2Points >= 5){
      stopBall('Gol 2 ganhou');
    }
  }
  
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function moveEverthing(){
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY


  if (ballX >= canvas.width){
    
    if (ballY >= goal2Y && ballY <= goal2Y + GOAL_HEIGHT){
      ballSpeedX = -ballSpeedX; 
    }else{
      ballReset(true, false);
    } 
  }

  if (ballX < 0){
    
    if (ballY > goal1Y && ballY < goal1Y + GOAL_HEIGHT){
      ballSpeedX = -ballSpeedX; 
    }else{
      ballReset(false, true);
    } 
  }

  if (ballY >= canvas.height){
    ballSpeedY = -ballSpeedY;
  }
  
  if(ballY == 0){
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverthing(){

  drawCanvas("black", 0, 0, canvas.width, canvas.height);

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

    case 111:
      if (goal2Y >= 10){
        goal2Y = goal2Y - goalSpeed;
      }
      break;
      
    case 108:
      if (goal2Y < canvas.height - 100){
        goal2Y = goal2Y + goalSpeed;
      }
      break;
  }

}
