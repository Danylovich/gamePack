var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');

var enter = 1;
var font = 80;
var block = 100;
var bgNumber = null;
var number = 0;
var vic = false;
var key = false;
var interval = null;
var bSh = false;

// var field = [
// 	[2,8,16,16],
// 	[16,4,128,1024],
// 	[8,2,256,64],
// 	[2,4,8,128]
// ]; 
var field = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
];

function randomPos(){
	let n = 0;
	for(let r = 0; r<field.length; r++){
		for(let c = 0; c<field[r].length; c++){
			if(field[r][c] == 0){
				n++;
			}
		}
	}
	let random = Math.floor(Math.random()*n);
	let number = -1;
	for(let r1 = 0; r1<field.length; r1++){
		for(let c1 = 0; c1<field[r1].length; c1++){
			if(field[r1][c1] == 0){
				number++;
				if(random == number){
					let rand = Math.floor(Math.random()*10);
					if(rand == 9){
						field[r1][c1] = 4;
					}else{
						field[r1][c1] = 2;
					}
				}
			}
		}
	}	
}

function draw(){
	ctx.clearRect(0,0,cnv.width,cnv.height);
	for(let r = 0; r<field.length; r++){
		for(let c = 0; c<field[r].length; c++){
			var cX = 5 + c * block;
			var cY = 5 + r * block;
			number = field[r][c];
			if(number < 10){
				font = 80;
			}else if(number < 100){
				font = 60;
			}else if(number < 1000){
				font = 50;
			}else if(number < 10000){
				font = 40;
			}else if(number < 100000){
				font = 30;
			}
			switch(field[r][c]){
				case 0: drawSpace(cX,cY); break;	
				case 2: bgNumber = "#E5C8C8"; break;
				case 4: bgNumber = "#F9E38A"; break;
				case 8: bgNumber = "#F5B365"; break;
				case 16: bgNumber = "#F18F1B"; break;
				case 32: bgNumber = "#FF3F3F"; break;
				case 64: bgNumber = "#FF0000"; break;
				//128 256 512 1024 2048
				case 128: bgNumber = "#FDE940"; break;
				case 256: bgNumber = "#F2E14A"; break;
				case 512: bgNumber = "#D9C519"; break;
				case 1024: bgNumber = "#D6C532"; break;
				case 2048: bgNumber = "#C1AD00"; break;
			}
			if(field[r][c]!=0 && field[r][c]>2048){
				bgNumber = "black";
			}
			if(field[r][c]>0){
				drawNumber(cX,cY);
			}
		}
	}
	if(vic == false){
		for(let r4 = 0; r4<field.length; r4++){
			for(let c4 = 0; c4 < field[r4].length; c4++){
				if(field[r4][c4] == 2048){
					victory();
					return;
				}
			}
		}
	}
	let zero = 0;
	for(let r3 = 0; r3 < field.length; r3++){
		for(let c3 = 0; c3 < field[r3].length; c3++){
			if(field[r3][c3] == 0){
				zero++;
			}
		}
	}
	if(zero == 0){
		let gO = true;
		for(let r1 = 0; r1 < field.length; r1++){
			for(let c1 = 0; c1 < field[r1].length-1; c1++){
				if(field[r1][c1] == field[r1][c1+1]){
					gO = false;
				}
			}
		}
		for(let r2 = 0; r2 < field.length-1; r2++){
			for(let c2 = 0; c2 < field[r2].length; c2++){
				if(field[r2][c2] == field[r2+1][c2]){
					gO = false;
				}
			}
		}
		if(gO){
			gameOver();
			return;
		}	
	}
}
function drawSpace(x,y){
	ctx.beginPath();
	ctx.lineWidth = "10";
	ctx.fillStyle = "#9A9696";
	ctx.strokeStyle = "#393232";
	ctx.fillRect(x,y,block,block);
	ctx.strokeRect(x,y,block,block);
	ctx.stroke();
}

function drawNumber(x,y){
	ctx.beginPath();
	ctx.lineWidth = "10";
	ctx.fillStyle = bgNumber;
	ctx.strokeStyle = "#393232";
	ctx.fillRect(x,y,block,block);
	ctx.strokeRect(x,y,block,block);
	ctx.stroke();
	ctx.beginPath();
	ctx.fillStyle = "blue";
	ctx.font = font + "px" + " Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(number,x+block/2,y+block/2);
	ctx.fill();

}
// w87 s83 a65 d68
function keyHandler(){
	if(key){
		switch(event.keyCode){
			case 65: 
				let a = false;
				function a1(){
					for(let r = 0; r<field.length; r++){
						for(let c = 1; c<field[r].length; c++){
							if(field[r][c] != 0 && field[r][c-1] == 0){
								a = true;
								field[r][c-1] = field[r][c];
								field[r][c] = 0;
								if(c-1 > 0){
									if(field[r][c-2] == 0){
										field[r][c-2] = field[r][c-1];
										field[r][c-1] = 0;
										if(c-2 > 0){
											if(field[r][c-3] == 0){
												field[r][c-3] = field[r][c-2];
												field[r][c-2] = 0;
											}
										}
									}
								}
							}
						}
					}
				}
				a1();
				for(let r1 = 0; r1 < field.length; r1++){
					for(let c1 = 0; c1<field[r1].length-1; c1++){
						if(field[r1][c1] == field[r1][c1+1]){
							field[r1][c1]*=2;
							field[r1][c1+1] = 0;
							a = true;
						}
					}
				}
				a1();
				if(a){
					randomPos();
				}		
			break;
			case 87: 
				let b = false;
				function b1(){
					for(let r = 1; r<field.length; r++){
						for(let c = 0; c<field[r].length; c++){
							if(field[r][c] != 0 && field[r-1][c] == 0){
								b = true;
								field[r-1][c] = field[r][c];
								field[r][c] = 0;
								if(r-1 > 0){
									if(field[r-2][c] == 0){
										field[r-2][c] = field[r-1][c];
										field[r-1][c] = 0;
										if(r-2 > 0){
											if(field[r-3][c] == 0){
												field[r-3][c] = field[r-2][c];
												field[r-2][c] = 0;
											}
										}
									}
								}
							}
						}
					}
				}
				b1();
				for(let r1 = 0; r1 < field.length-1; r1++){
					for(let c1 = 0; c1<field[r1].length; c1++){
						if(field[r1][c1] == field[r1+1][c1]){
							field[r1][c1]*=2;
							field[r1+1][c1] = 0;
							b = true;
						}
					}
				}
				b1();
				if(b){
					randomPos();
				}
			break;
			case 83: 
				let s = false;
				function s1(){
					for(let r = 2; r>=0; r--){
						for(let c = 0; c<field[r].length; c++){
							if(field[r][c] != 0 && field[r+1][c] == 0){
								s = true;
								field[r+1][c] = field[r][c];
								field[r][c] = 0;
								if(r+1 < 3){
									if(field[r+2][c] == 0){
										field[r+2][c] = field[r+1][c];
										field[r+1][c] = 0;
										if(r+2 < 3){
											if(field[r+3][c] == 0){
												field[r+3][c] = field[r+2][c];
												field[r+2][c] = 0;
											}
										}
									}
								}
							}
						}
					}
				}
				s1();
				for(let r1 = 3; r1 >=1; r1--){
					for(let c1 = 0; c1<field[r1].length; c1++){
						if(field[r1][c1] == field[r1-1][c1]){
							field[r1][c1]*=2;
							field[r1-1][c1] = 0;
							s = true;
						}
					}
				}
				s1();
				if(s){
					randomPos();
				}
			break;
			case 68:
				let d = false;
				function d1(){
					for(let r = 0; r<field.length; r++){
						for(let c = 2; c>=0; c--){
							if(field[r][c] != 0 && field[r][c+1] == 0){
								d = true;
								field[r][c+1] = field[r][c];
								field[r][c] = 0;
								if(c+1 < 3){
									if(field[r][c+2] == 0){
										field[r][c+2] = field[r][c+1];
										field[r][c+1] = 0;
										if(c+2 < 3){
											if(field[r][c+3] == 0){
												field[r][c+3] = field[r][c+2];
												field[r][c+2] = 0;
											}
										}
									}
								}
							}
						}
					}
				}
				d1();
				for(let r1 = 0; r1 < field.length; r1++){
					for(let c1 = 3; c1>=1; c1--){
						if(field[r1][c1] == field[r1][c1-1]){
							field[r1][c1]*=2;
							field[r1][c1-1] = 0;
							d = true;
						}
					}
				}
				d1();
				if(d){
					randomPos();
				}
			break;
		}
	}
	switch(event.keyCode){
		case 13:
			if(enter == 1){
				start();
			}else if(enter == 2){
				p();
			}else if(enter == 3){
				sh();
			}
		break;
	}
}

function gameOver(){
	enter = 3;
	clearInterval(interval);
	key = false;
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,0.3)";
	ctx.fillRect(0,0,cnv.width,cnv.height);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "60px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width / 2,cnv.height / 2);
	ctx.fill();
	if(bSh == false){
		$("body").append("<button id='sh' onclick='sh()'>Зіграти ще</button>");
	}else if(bSh){
		$("#sh").toggle();
	}
	bSh = true;
}

function victory(){
	enter = 2;
	clearInterval(interval);
	key = false;
	ctx.beginPath();
	ctx.fillStyle = "rgba(255,255,255,0.3)";
	ctx.fillRect(0,0,cnv.width,cnv.height);
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "60px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви перемогли",cnv.width / 2,100);
	ctx.fill();
	$("body").append("<button id='p' onclick='p()'>Продовжити гру</button>");
	vic = true;
}
function p(){
	enter = 0;
	key = true;
	interval = setInterval(draw,100);
	ctx.clearRect(0,0,cnv.width,cnv.height);
	$("#p").toggle();
}

function sh(){
	enter = 1;
	key = false;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	$("#sh").toggle();
	vic = false;
	field = [
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0]
	];
	$("#bStart").toggle();
	draw();
}

function start(){
	enter = 0;
	$("#bStart").toggle();
	interval = setInterval(draw,100);
	key = true
	randomPos();
	randomPos();
}

draw();