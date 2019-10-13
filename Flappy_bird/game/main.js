setTimeout(()=>{$('#sOff').toggle(0);},1)
var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
var flyAudio = new Audio();
var scoreAudio = new Audio();
var bird = new Image();
var pU = new Image();
var pB = new Image();
var bg = new Image();
var fg = new Image();


flyAudio.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";
bird.src = "image/bird.png";
pU.src = "image/pipeUp.png";
pB.src = "image/pipeBottom.png";
fg.src = "image/fg.png";
bg.src = "image/bg.png";

var pipe = [{
	random:Math.floor(Math.random()*243),
	x:200
}];
var newPipe = false;
var yPosBird = 150; 
var f = false;
var yTop = 0;
var yBottom = 0;
var Timer = null;
var score = 0;
var z = false;
var s = true;
var sound = true;

function draw(){
	f = false;
	z = false;
	let endGame = false;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx.drawImage(bg,0,0);
	if(pipe[pipe.length-1].x<100){
		newPipe = true;
	}
	if(newPipe){
		pipe.push({
			random:Math.floor(Math.random()*243),
			x:300
		});
		newPipe = false;
	}
	for(let i = 0; i<pipe.length; i++){
		if(pipe[i].random>242-63){
			pipe[i].random-=63;
		}
		ctx.drawImage(pU,pipe[i].x,0-pipe[i].random);
		ctx.drawImage(pB,pipe[i].x,pU.height-pipe[i].random+90);
		if(pipe[i].x<=38 && pipe[i].x>=0){
			f = true; 
			yTop = 242-pipe[i].random;
			yBottom = yTop+90;
		}else if(pipe[i].x == -1){
			z = true;
		}
		pipe[i].x--;
	}
	if(f){
		if(yPosBird<yTop || yPosBird+26>yBottom){
			endGame = true;
		}
	}
	if(z){
		score++;
		if(sound){
			scoreAudio.play();
		}
	}
	yPosBird++;
	if(yPosBird+26>394){
		endGame = true;
	}
	ctx.drawImage(fg,0,bg.height-fg.height);
	ctx.drawImage(bird,0,yPosBird);
	if(endGame){
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = "50px solid black";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Ви програли",cnv.width/2,(cnv.height-118)/2);
		ctx.fill();
		clearInterval(Timer);
		s = true;
	}
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.font = "40px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(score,cnv.width/2,50);
	ctx.strokeText(score,cnv.width/2,50);
	ctx.fill();
	ctx.stroke();
}

bg.onload = draw;

function start(){
	pipe = [{
		random:Math.floor(Math.random()*243),
		x:200
	}];
	score = 0;
	newPipe = false;
	yPosBird = 150; 
	f = false;
	yTop = 0;
	yBottom = 0;
	Timer = null;
	Timer = setInterval(draw,10);
	$('button').fadeOut(0);
	s = false;
} 

function keyHandler(e){
	switch(e.keyCode){
		case 13:
		if(s){
			start();
		}
		break;
		case 32:
		if(s){
			start();
		}else{
			if(yPosBird>=40){
				yPosBird-=40;
			}
			if(sound){
				flyAudio.play();
			}
		}
		break;
		case 90:
		if(sound){
			off();
		}else{
			on();
		}
		break;
	}
}

function on(){
	$('#sOn').toggle(0);
	$('#sOff').toggle(0);
	sound = true;
}

function off(){
	$('#sOff').toggle(0);
	$('#sOn').toggle(0);
	sound = false; 
}