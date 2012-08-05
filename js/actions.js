$(function(){

mouseY = 70;
cpuY = 180;
ballX = 400;
ballY = 295;
ballXSpeed = -4;
ballYSpeed = 0;
cpuScore = 0;
playerScore = 0;
controlling = 0;
baseSpeed = 4;
totalHits = 0;
speedUpper = 0;
highestScore = localStorage.getItem("highestScore");
playerBatOpacity = 0.2;
cpuBatOpacity = 0.2;
bgOpacity = 0.85;

if(highestScore != ''){
	highestScoreText = "Your highest score: " + highestScore;
}


var canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');


$('canvas#gameCanvas').mousemove(function(e){
	
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		mouseX = e.pageX;
		mouseY = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		mouseX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		mouseY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}	
	
	cpuX = mouseX;
	cpuY = mouseY;
	
});

$(window).keydown(function(e){
	if(e.which == 83){
	if(controlling == 0){
		controlling = 1;
		return false;	
	}
	if(controlling == 1){
		controlling = 0;
		return false;	
	}
	}
});


soundManager.url = "swf/"; 
soundManager.debugMode = false;
soundManager.onready(function(){

  // SM2 has loaded - now you can create and play sounds!

  soundHit1 = soundManager.createSound({
    id: 'soundHit1',
    url: 'sounds/hit1.mp3'
    // onload: myOnloadHandler,
    // other options here..
  });
  soundHit2 = soundManager.createSound({
    id: 'soundHit2',
    url: 'sounds/hit2.mp3'
    // onload: myOnloadHandler,
    // other options here..
  });
  soundHit3 = soundManager.createSound({
    id: 'soundHit3',
    url: 'sounds/hit3.mp3'
    // onload: myOnloadHandler,
    // other options here..
  });
  soundSweep = soundManager.createSound({
    id: 'soundSweep',
    url: 'sounds/sweep.mp3'
    // onload: myOnloadHandler,
    // other options here..
  });



});




	
var count = 0;
setInterval(function(){
	speedUpper++;
	if(speedUpper == 60){
	speedUpper = 0;
	baseSpeed = baseSpeed + 0.5;	
	}
	
	ballX = ballX + ballXSpeed;
	ballY = ballY + ballYSpeed;	
	
	if(ballX > 757){
		if((cpuY - 60) < ballY && (cpuY + 60) > ballY){
			ballXSpeed = -baseSpeed;
			hitPlace = (cpuY - ballY) + 60;
			hitPlaceP = 100 - (Math.round((hitPlace / 120 * 100)));
			ballYSpeed = ((8 * (hitPlaceP / 100)) - 4)+0.5;
			cpuBatOpacityFade();
			bgBatHit();
			controlling = 0;
			totalHits++;
			soundHit1.play();
		}
		else{
			losePoint('cpu');
		}
	}
	if(ballX < 0){
		if((mouseY - 60) < ballY && (mouseY + 60) > ballY){
			ballXSpeed = baseSpeed;
			hitPlace = (mouseY - ballY) + 60;
			hitPlaceP = 100 - (Math.round((hitPlace / 120 * 100)));
			ballYSpeed = ((8 * (hitPlaceP / 100)) - 4)+0.5;
			bgBatHit();
			playerBatOpacityFade();
			controlling = 1;
			totalHits++;
			soundHit3.play();
		}
		else{
			losePoint('player');
		}
		
	}
	
	if(ballY>594){
		ballYSpeed = ballYSpeed * -1;
		soundHit2.play();
	}
	if(ballY<1){
		ballYSpeed = ballYSpeed * -1;
		soundHit2.play();
	}
	
	
	drawBackground();
	drawMiddleLine();
	drawPlayerBat();
	drawComputerBat();
	drawBall();
	drawScore();
	
},(1000/60));

});

function drawScore(){
	ctx.font = "26px cinnamoncake, Verdana";
	ctx.fillText("Score:   " + totalHits, 340, 30);
	ctx.font = "16px cinnamoncake, Verdana";
	ctx.fillText(highestScoreText,325,50);
}

function drawBall(){
	ctx.fillStyle = "#eee";
	ctx.fillRect((18+ballX),ballY,8,8);
}

function drawPlayerBat(){
	ctx.fillStyle = "rgba(255, 255, 255, "+playerBatOpacity+")";
	ctx.fillRect(10,(mouseY - 60),8,120);
}
function drawComputerBat(){
	ctx.fillStyle = "rgba(255, 255, 255, "+cpuBatOpacity+")";
	ctx.fillRect(780, (cpuY - 60),8,120);
}
function drawMiddleLine(){
	ctx.lineWidth = 3;
	ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
	ctx.beginPath();
	ctx.dashedLine( 400.4, 60, 400.5, 600);
	ctx.closePath();
	ctx.stroke();
}



function drawBackground(){
	ctx.clearRect(0,0,800,600);
	ctx.fillStyle = "rgba(0, 0, 0, "+bgOpacity+")";
	ctx.fillRect(0,0,800,600);	
}
function losePoint(person){
	if(person == 'cpu'){
		playerScore++;
	}
	if(person == 'player'){
		cpuScore++;
	}
	if(totalHits > highestScore){

	highestScore = totalHits;
	highestScoreText = "Your highest score: " + highestScore;
	localStorage.setItem("highestScore", totalHits);
	}
	ballX = 400;
	ballY = 295;
	ballXSpeed = -4;
	ballYSpeed = 0;
	totalHits = 0;
	baseSpeed = 4;
	controlling = 0;
	bgPointLost();
	soundSweep.play();
}
function cpuBatOpacityFade(){
	cpuBatOpacity = 0.5;
	setTimeout(function(){ cpuBatOpacity = 0.4; },50);
	setTimeout(function(){ cpuBatOpacity = 0.3; },100);
	setTimeout(function(){ cpuBatOpacity = 0.2; },150);
}
function playerBatOpacityFade(){
	playerBatOpacity = 0.5;
	setTimeout(function(){ playerBatOpacity = 0.4; },50);
	setTimeout(function(){ playerBatOpacity = 0.3; },100);
	setTimeout(function(){ playerBatOpacity = 0.2; },150);
}
function bgBatHit(){
	bgOpacity = 0.84;
	setTimeout(function(){ bgOpacity = 0.83; },25);
	setTimeout(function(){ bgOpacity = 0.82; },50);
	setTimeout(function(){ bgOpacity = 0.81; },75);
	setTimeout(function(){ bgOpacity = 0.82; },100);
	setTimeout(function(){ bgOpacity = 0.83; },125);
	setTimeout(function(){ bgOpacity = 0.84; },150);
	setTimeout(function(){ bgOpacity = 0.85; },175);
}

function bgPointLost(){
	bgOpacity = 0.80;
	setTimeout(function(){ bgOpacity = 0.75; },25);
	setTimeout(function(){ bgOpacity = 0.70; },50);
	setTimeout(function(){ bgOpacity = 0.65; },75);
	setTimeout(function(){ bgOpacity = 0.60; },100);
	setTimeout(function(){ bgOpacity = 0.55; },125);
	setTimeout(function(){ bgOpacity = 0.60; },150);
	setTimeout(function(){ bgOpacity = 0.65; },175);
	setTimeout(function(){ bgOpacity = 0.70; },200);
	setTimeout(function(){ bgOpacity = 0.75; },225);
	setTimeout(function(){ bgOpacity = 0.80; },250);
	setTimeout(function(){ bgOpacity = 0.85; },275);
}