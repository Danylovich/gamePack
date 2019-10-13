//Dom елементи, підключення до канви через змінні
var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');

// Список зоображень в масиві, того що падає 
var foodList = [
	"image/horseshoe.png",
	"image/sneakers.png",
	"image/banana.png",
	"image/apple.png",
	"image/cake.png",
	"image/sushi.png",
	"image/strawberries.png",
	"image/chicken_leg.png"
]; 

// Кількість впіманої їди
var score = 0;
// Всі рахунки зіграних ігор
var allScores = [];

var bestScore = 0;

//масив для створення рандомних падаючих страв
var imgdraw = [];

var n = 0;
// Ліва X(ікс) позиція тарілки
var xPlate = 165;
//Кількість падаючиї їди на землю, а не в тарілку 
var fell = 0;
// Зоображення фону(Хмари земля тарілка)
var grass = new Image();
var plate = new Image();
var cloud = new Image();

var difficultyTimer = 5;
var timeAnimation = 0;

var Animation = null;
var clickKey = false;

// підключення(src) зоображень фону
cloud.src = "image/cloud.jpg";
plate.src = "image/plate.png";
grass.src = "image/grass.png";

$('#start').toggle(0);

// Функція створення нових падающих страв
function newFood(){
	let random = Math.floor(Math.random() * foodList.length);
	let imag = new Image();
	imag.src = foodList[random];
	if(random>1){
		imag.onload = () =>{
			imgdraw.push(
				{	x:Math.floor(Math.random()*(cnv.width-imag.width)),
					x1:imag.width,
					y:-10,
					imgs:imag,
					edible:"edible"
				}
			);
		}
	}else{
		imag.onload = () =>{
			imgdraw.push(
				{	x:Math.floor(Math.random()*(cnv.width-imag.width)),
					x1:imag.width,
					y:-10,
					imgs:imag,
					edible:"notEdible"
				}
			);
		}
	}
}

// Функція малювання всієї анімації
var timerFell = 0;

function draw(){
	timerFell++;
	if(timerFell % 5000 == 0 && difficultyTimer>2){
		difficultyTimer--;
	}
	n++;
	if(n % 150 == 0){
		newFood();
	}
	for(let i = 0; i < imgdraw.length; i++){
		if(imgdraw[i].y > cloud.height-imgdraw[i].imgs.height){
			let x1Plate = xPlate + plate.width;
			if((imgdraw[i].x > xPlate && imgdraw[i].x < x1Plate) || (imgdraw[i].x+imgdraw[i].x1 > xPlate && imgdraw[i].x+imgdraw[i].x1 < x1Plate)){
				if(imgdraw[i].edible == "edible"){
					score++;
				}else{console.log("GameOver");gameOver();return;}
			}
			else{
				if(imgdraw[i].edible != "notEdible"){
					fell++;
				}
			}
			imgdraw.splice(i,1);	
		}
		if(fell == 8){
			console.log("GameOver");
			gameOver();
			return;
		}
		imgdraw[i].y++;
	}
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx.beginPath();
	ctx.drawImage(cloud,0,0);
	ctx.drawImage(grass,0,cloud.height);
	ctx.drawImage(plate,xPlate,cloud.height-plate.height);
	for(let s = 0; s< imgdraw.length; s++){	
		ctx.drawImage(imgdraw[s].imgs,imgdraw[s].x,imgdraw[s].y);
	}
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(score,0,0);
	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText(fell+"/8",cnv.width,0);
	ctx.fill();
}

function drawAnimation(){
	timeAnimation++;
	if(timeAnimation % difficultyTimer == 0){
		draw();
	}
}

// Інтервал анімації(кадри і швидкість прокручування кадрів)
window.onload = ()=>{
	$('#start').toggle(0);
	ctx.beginPath();
	ctx.drawImage(cloud,0,0);
	ctx.drawImage(grass,0,cloud.height);
} 

function start(){
	clickKey = true;
	Animation = setInterval(drawAnimation,1);
	$('#start').toggle(0);
}

// Функція onkeydown. Підключення кліку на клавішу з Функціями	
function keyHandler(e){
	if(clickKey){
		switch(e.keyCode){
			case 65: if(xPlate>10){xPlate-=10;}if(xPlate-10<=0 && xPlate>0){xPlate-=5;} break;
			case 68: if(xPlate<320){xPlate+=10;}if(xPlate+10>=330 && xPlate<330){xPlate+=5} break;
		}
	}else{
		switch(e.keyCode){
			case 13: start(); break;
		}
	}
}

function gameOver(){
	clearInterval(Animation);
	clickKey = false;
	allScores.push(score);
	let record = 0;
	for(let i = 0; i<allScores.length; i++){
		if(record < allScores[i]){record = allScores[i]}
	}
	bestScore = record;
	imgdraw = [];
	n = 0;
	xPlate = 165;
	fell = 0;
	difficultyTimer = 5;
	timeAnimation = 0;
	timerFell = 0;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx.beginPath();
	ctx.drawImage(cloud,0,0);
	ctx.drawImage(grass,0,cloud.height);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "70px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width/2,cnv.height/2-40);
	ctx.fill();
	$('#start').toggle(0);
	$('#start').text("Зіграти ще");
	$('#start').css("top", "305px");
	$('#start').css("width", "90px");
	$('#start').css("margin-left", "-245px");
	ctx.beginPath();
	ctx.fillStyle = "rgba(131,131,131,0.5)";
	ctx.fillRect(35,340,330,135);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "30px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Рахунок",cnv.width/2,345);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(score,cnv.width/2,380);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "30px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Найкращий рахунок",cnv.width/2,405);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(bestScore,cnv.width/2,440);
	ctx.fill();
	score = 0;
}