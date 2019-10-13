var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
$(".inaccessible").attr("disabled", true);
$(".available").attr("disabled", false);
$('#back').toggle(0);

var block = 10;
var Height = cnv.height;
var Width = cnv.width;
var Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
var apple = true;
var randomX = 0;
var randomY = 0;
var animation = null; 
var color = null; 
var color_Head = null;
var score = 3;
var r = null;
var n = 0;
var turn = true;
var level = 1;
// $('button').toggle(0);
$('#Start,.Color').toggle(0);
// $('form').toggle(0);

var Part_Snake = [
	{
		x:30,
		y:10
	},
	{
		x:20,
		y:10
	},
	{
		x:10,
		y:10
	}
];

function start(){
	ctx.clearRect(0,0,Width,Height);
	score = 3;
	apple = true;
	randomX = 0;
	randomY = 0;
	$('.Color').toggle(0);
	$('#Start').toggle(0);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "20px solid black";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Колір змійки",Width/2,Height/4+50);
	ctx.fill();
}

function random_Place_Apple(){
	randomX = Math.floor(Math.random() * (Width/10));
	randomY = Math.floor(Math.random() * (Height/10));
}

function drawPart_body(x,y,body){
	if(body == 0){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,block,block);
	}else if(body == 1){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,block,block);
		ctx.beginPath();
		ctx.fillStyle = color_Head;
		ctx.fillRect(x,y,block,block);
	}else{
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,block,block);
		ctx.beginPath();
		ctx.fillStyle = "grey";
		ctx.fillRect(x,y,block,block);
	}
}

function draw_apple(x,y){
	let X =  x*block;
	let Y =  y*block; 
	ctx.beginPath();
	ctx.fillStyle = r;
	ctx.arc(X+block/2,Y+block/2,block/2,Math.PI*2,false);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = 'brown'; 
	ctx.arc(X+block/2,Y+block/2,1,Math.PI * 2,false);
	ctx.fill();
}

function draw(){	
	drawBarrier();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px solid red";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.fillText(level + " рівень",Width/2,Height);
	ctx.fill();
	for(let i = 1; i<Part_Snake.length-1; i++){
		drawPart_body(Part_Snake[i].x,Part_Snake[i].y,0);
	}
	drawPart_body(Part_Snake[0].x,Part_Snake[0].y,1);
	drawPart_body(Part_Snake[Part_Snake.length-1].x,Part_Snake[Part_Snake.length-1].y,2);
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px solid red";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Рахунок: " + score,0,0);
	ctx.fill();
	if(apple){
		n = Math.floor(Math.random() * 2);
		if(n == 0){
			r = "green";
		}else if(n == 1){
			r = "red";
		}
		let wrong_place = false;
		apple = false;
		random_Place_Apple();
		for(let s = 0; s<Part_Snake.length; s++){
			if(Part_Snake[s].x == randomX*10 && Part_Snake[s].y == randomY*10){
				wrong_place = true;
			}
		}
		while(wrong_place == true){
			if(wrong_place){
				random_Place_Apple();
			}
			wrong_place = false;
			for(let c = 0; c<Part_Snake.length; c++){
				if(Part_Snake[c].x == randomX*10 && Part_Snake[c].y == randomY*10){
					wrong_place = true;
				}
			}
		}
	}
	draw_apple(randomX,randomY);
}

function move(){
	for(let i = Part_Snake.length-1; i>=1; i--){
		Part_Snake[i].x = Part_Snake[i-1].x;
		Part_Snake[i].y = Part_Snake[i-1].y;
	}
	if(Direction == 0){Part_Snake[0].y-=block; turn = true;} // moveTop
	if(Direction == 1){Part_Snake[0].x+=block; turn = true;} // moveRight
	if(Direction == 2){Part_Snake[0].y+=block; turn = true;} // moveBottom
	if(Direction == 3){Part_Snake[0].x-=block; turn = true;} // moveLeft
	for(let f = 0; f<Part_Snake.length; f++){
		if(Part_Snake[f].x < 0){Part_Snake[0].x+=Width;}
		if(Part_Snake[f].y < 0){Part_Snake[0].y+=Height;}
		if(Part_Snake[f].x >= Width){Part_Snake[0].x-=Width;}
		if(Part_Snake[f].y >= Height){Part_Snake[0].y-=Height;}
	}
	if(Part_Snake[0].y == randomY*10 && Part_Snake[0].x == randomX*10){
		apple = true;
		let a = 0;
		let b = 0;
		if(Direction == 0){
			b = -block;
		}else if(Direction == 1){
			a = block;
		}else if(Direction == 2){
			b = block;
		}else if(Direction == 3){
			a = -block;
		}
		Part_Snake.push({x:Part_Snake[Part_Snake.length-1].x+a,y:Part_Snake[Part_Snake.length-1].y+b});
		score++;
	}
	if(score >= 16){
		victory();
		return;
	}
	for(let q = 1; q<Part_Snake.length; q++){
		if(Part_Snake[0].x == Part_Snake[q].x && Part_Snake[0].y == Part_Snake[q].y){
			gameOver();
			return;
		}
	}
	for(let m = 0; m<barrier.length; m++){
		if(Part_Snake[0].x == barrier[m][0] && Part_Snake[0].y == barrier[m][1]){
			gameOver();
			return;	
		}
	}
	for(let r = 0; r<barrier.length; r++){
		if(randomX*10 == barrier[r][0] && randomY*10 == barrier[r][1]){
			apple = true;
		}
	}
	ctx.clearRect(0,0,Width,Height);
	draw();
} 		

function keyHandler( e ){
	if(turn){
		switch(e.keyCode){
			case 87:
				if(Direction !==0 && Direction !==2){
					Direction = 0;
					turn = false;
				}
			break;  // moveTop
			case 83: 
				if(Direction !==0 && Direction !==2){
					Direction = 2;
					turn = false;
				}
			break;  // moveBottom
			case 65: 
				if(Direction !==1 && Direction !==3){
					Direction = 3;
					turn = false;
				}
			break;	 // moveLeft
			case 68:
				if(Direction !==1 && Direction !==3){ 
					Direction = 1;
					turn = false;
				}
			break;  // moveRight
		}
	}
}

function starting(){
	draw();
	animation = setInterval(move,100);	
}

function red(){
	color = "red";
	color_Head = "#" + "910723";
	starting();
	$('.Color').toggle(0);
}
function green(){
	color = "green";
	color_Head = "#" + "145A04";
	starting();
	$('.Color').toggle(0);
}
function blue(){
	color = "blue";
	color_Head = "#" + "032070";
	starting();
	$('.Color').toggle(0);
}

function gameOver(){
	clearInterval(animation);
	ctx.beginPath();
	ctx.clearRect(0,0,Width,Height);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "110px solid black";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",0,Height/2);
	ctx.fill();
	$('#back').toggle(0);
}

function victory(){
	clearInterval(animation);
		ctx.clearRect(0,0,Width,Height);
		Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
		apple = true;
		randomX = 0;
		randomY = 0;
		color = null;
		color_Head = null;
		score = 3;
		r = null;
		n = 0;
		turn = true;
		// if(level != 10){
			// level++;
		// }
		level++;
		if(level == 2){
			$('#b').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 3){
			$('#c').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 4){
			$('#d').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 5){
			$('#e').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 6){
			$('#f').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 7){
			$('#g').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 8){
			$('#h').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 9){
			$('#i').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else if(level == 10){
			$('#j').removeClass('inaccessible').addClass('available');
			$('.inaccessible,.available').toggle(0);
		}else{
			ctx.beginPath();
			ctx.fillStyle = "black";
			ctx.font = "110px solid black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Перемога",Width/2,Height/2);
			ctx.fill();
		}
		setTimeout(()=>{
			$(".inaccessible").attr("disabled", true);
			$(".available").attr("disabled", false);
		},1);
}

function Back(){
	ctx.clearRect(0,0,Width,Height);
	$('.available,.inaccessible,#back').toggle();
}