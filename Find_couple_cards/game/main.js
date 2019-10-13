var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');

document.getElementById('start').style.display = 'none';

var animation = null;
var block = 100;
var fail = 0;
var enter = false;

var map = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
];

var map1 = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
];

var map2 = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
];

var apple = new Image();
var banana = new Image();
var cake = new Image();
var cherry = new Image();
var chicken_leg = new Image();
var ice_cream = new Image();
var pear = new Image();
var potato = new Image();
var strawberries = new Image();
var sushi = new Image();
var tomato = new Image();
var watermelon = new Image();
var plusOne = new Image();
apple.src = "image/apple.png",
banana.src = "image/banana.png",
cake.src = "image/cake.jpg",
cherry.src = "image/cherry.jpg",
chicken_leg.src = "image/chicken_leg.jpg",
ice_cream.src = "image/ice_cream.jpg",
pear.src = "image/pear.png",
potato.src = "image/potato.png",
strawberries.src = "image/strawberries.jpg",
sushi.src = "image/sushi.png",
tomato.src = "image/tomato.jpg",
watermelon.src = "image/watermelon.jpg",
plusOne.src = "image/+1.png"

var tick = 0;
function drawAnimation(){
	tick++;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	draw();
	if(tick == 300){
		map = [
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]
		];
		stape = [0,0];
	}
	if(stape[0] == 2){
		stape[1]++;
	}
	if(stape[1] == 100){
		map = [
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]
		];
		stape = [0,0];
		permission = true;
	}
	for(let i = 0; i<eCards.length; i++){
		eCards[i].t++;
		if(eCards[i].t == 100){
			map2[eCards[i].y][eCards[i].x] = -1;
			eCards.shift();
		}
	}
	if(fail>=10){
		gameOver_victory(0);
		return;
	}
	let vic = true;
	for(let r = 0; r<map2.length; r++){
		for(let c = 0; c<map2[r].length; c++){
			if(map2[r][c] == 0){
				vic = false;
			}
		}
	}
	if(vic){
		console.log(map2);
		gameOver_victory(1);
	}
}

var nCards = [1,0];
function randomPos(){
	while(nCards[0]<14){
		let n = 0;
		for(let r = 0; r<map1.length; r++){
			for(let c = 0; c<map1[r].length; c++){
				if(map1[r][c] == 0){
					n++;
				}
			}
		}
		let random = Math.floor(Math.random()*n);
		let number = -1;
		for(let r1 = 0; r1<map1.length; r1++){
			for(let c1 = 0; c1<map1[r1].length; c1++){
				if(map1[r1][c1] == 0){
					number++;
					if(random == number){
						map1[r1][c1] = nCards[0];
						if(nCards[1]==1){
							nCards[1] = 0;
							nCards[0]++;
						}else{
							nCards[1]++;
						}
						if(nCards[0] == 13 && nCards[1] == 1){
							nCards[0]++;
						}
					}
				}
			}
		}	
	}
}

function draw(){
	for(let r = 0; r<map.length; r++){
		for(let c = 0; c<map[r].length; c++){
			var cX = c*block;
			var cY = r*block;
			switch(map[r][c]){
				case 0:
					drawImages(0,cX,cY);
				break;
				case 1:
					drawImages(1,cX,cY);
				break;
				case 2:
					drawImages(2,cX,cY);
				break;
				case 3:
					drawImages(3,cX,cY);
				break;
				case 4:
					drawImages(4,cX,cY);
				break;
				case 5:
					drawImages(5,cX,cY);
				break;
				case 6:
					drawImages(6,cX,cY);
				break;
				case 7:
					drawImages(7,cX,cY);
				break;
				case 8:
					drawImages(8,cX,cY);
				break;
				case 9:
					drawImages(9,cX,cY);
				break;
				case 10:
					drawImages(10,cX,cY);
				break;
				case 11:
					drawImages(11,cX,cY);
				break;
				case 12:
					drawImages(12,cX,cY);
				break;
				case 13:
					drawImages(13,cX,cY);
				break;
			}
			if(map2[r][c] == -1){
				ctx.beginPath();
				ctx.fillStyle = "blue";
				ctx.fillRect(cX,cY,block,block);
			}
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = "5";
			ctx.strokeRect(cX,cY,block,block);
			ctx.stroke();
		}
	}
	if(tick>0){
		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.font = "40px Tahoma";
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.fillText(fail+"/10",cnv.width/2,0);
		ctx.fill();
	}
}

function drawImages(a,x,y){
	ctx.beginPath();
	if(a == 0){
		ctx.fillStyle = "grey";
		ctx.fillRect(x,y,block,block);
	}else if(a == 1){
		ctx.drawImage(apple,x,y);
	}else if(a == 2){
		ctx.drawImage(banana,x,y);
	}else if(a == 3){
		ctx.drawImage(cake,x,y);
	}else if(a == 4){
		ctx.drawImage(cherry,x,y);
	}else if(a == 5){
		ctx.drawImage(chicken_leg,x,y);
	}else if(a == 6){
		ctx.drawImage(ice_cream,x,y);
	}else if(a == 7){
		ctx.drawImage(pear,x,y);
	}else if(a == 8){
		ctx.drawImage(potato,x,y);
	}else if(a == 9){
		ctx.drawImage(strawberries,x,y);
	}else if(a == 10){
		ctx.drawImage(sushi,x,y);
	}else if(a == 11){
		ctx.drawImage(tomato,x,y);
	}else if(a == 12){
		ctx.drawImage(watermelon,x,y);
	}else{
		ctx.drawImage(plusOne,x,y);
	}
}

var permission = true;
var row = -1;
var col = -1;
var stape = [-1,-1];
var posCard = [-1,-1];
var old_posCard = [-1,-1];
var eCards = [];
cnv.onmousedown = function(event){
	if(eCards.length == 0 && permission){
		if(stape[0] != -1 || stape[1] != -1){
			var x = event.offsetX;
			var y = event.offsetY;
			if(x>0 && x<100){
				col = 0;
			}else if(x>100 && x<200){
				col = 1;
			}else if(x>200 && x<300){
				col = 2;
			}else if(x>300 && x<400){
				col = 3;
			}else if(x>400 && x<500){
				col = 4;
			}
			if(y>0 && y<100){
				row = 0;
			}else if(y>100 && y<200){
				row = 1;
			}else if(y>200 && y<300){
				row = 2;
			}else if(y>300 && y<400){
				row = 3;
			}else if(y>400 && y<500){
				row = 4;
			}
			if(row != -1 && col != -1){
				if(map2[row][col] != -1){
					if(map1[row][col] == 13){
						map[row][col] = map1[row][col];
						eCards.push({
							x:col,
							y:row,
							t:0
						});
						if(fail>0){
							fail-=1;
						}
						return;
					}
					if(posCard[0] != row || posCard[1] != col){
						if(stape[0]<2){
							stape[0]++;
							map[row][col] = map1[row][col];
						}
						if(stape[0]==1){
							posCard = [row,col]
						}
						if(stape[0]==2){
							old_posCard = posCard;
							posCard = [row,col];
							if(map1[posCard[0]][posCard[1]] == map1[old_posCard[0]][old_posCard[1]]){
								eCards.push({
									x:posCard[1],
									y:posCard[0],
									t:0
								});
								eCards.push({
									x:old_posCard[1],
									y:old_posCard[0],
									t:0
								});
							}else{
								fail++;
							}
							posCard = [-1,-1];
							old_posCard = [0,0];
							permission = false;
						}
					}
				}
			}
		}
	}
}

function keyDown(){
	switch(event.keyCode){
		case 13:
			if(enter){
				start();
			}
		break;
	}
}

function gameOver_victory(g){
	clearInterval(animation);
	ctx.clearRect(0,0,cnv.width,cnv.height);
	fail = 0;
	map = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
	];
	map1 = map;
	map2 = map1;
	tick = 0;
	nCards = [1,0];
	permission = true;
	row = -1;
	col = -1;
	stape = [-1,-1];
	posCard = [-1,-1];
	old_posCard = [-1,-1];
	eCards = [];
	draw();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "70px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	if(g == 0){
		ctx.fillText("Ви прогрли",cnv.width/2,cnv.height/2);
	}else{
		console.log(g);
		ctx.fillText("Ви перемогли",cnv.width/2,cnv.height/2);
	}
	ctx.fill();
	document.getElementById('start').style.top = '320px';
	document.getElementById('start').style.display = 'inline-block';
	enter = true;
}

function start(){
	document.getElementById('start').style.display = 'none';
	randomPos();
	animation = setInterval(drawAnimation,1);
	map = map1;
	map2 = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	];
	enter = false;
}

window.onload = function interval(){
	draw();
	document.getElementById('start').style.display = 'inline-block';
	enter = true;
}