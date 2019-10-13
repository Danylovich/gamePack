var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
var cnv1 = document.getElementById('canvasTwo');
var ctx1 = cnv1.getContext('2d');

var kill = 0;
var feil = 0;
var animation = null;
var posGreenTank = true;
var tick = 0;
var posX = 0;
var wDownload = false;
var moveLR_Airplane = [false,null];
var tank_airplane = "tank";
var tankBullets = 10;
var airplaneBullets = 20;
var posBullet_LR = "left"; 
var replace = false; 
var replaceStape = 1;
var n = 700;
var tankXp = 500;
var airplaneXp = 300;

var tapeBulletsforTank = new Image();
var tapeBulletsforAirplane = new Image();
var bulletTank = new Image();
var enemy_bulletTank = new Image();
var bulletAirplane = new Image();
var burst_T = new Image();
var burst_A = new Image();
var green_airplane = new Image();
var green_airplane_left = new Image();
var green_airplane_right = new Image();
var red_airplane = new Image();
var red_airplane_left = new Image();
var red_airplane_right = new Image();
var path = new Image();
var grass = new Image();
var greenTank = new Image();
var greenTank_left = new Image();
var greenTank_right = new Image();
var redTank = new Image();
var redTank_left = new Image();
var redTank_right = new Image();
tapeBulletsforTank.src = "image/tapeBulletsforTank.png";
tapeBulletsforAirplane.src = "image/tapeBulletsforAirplane.png";
bulletTank.src = "image/bulletTank.png";
enemy_bulletTank.src = "image/enemy_bulletTank.png";
bulletAirplane.src = "image/bulletAirplane.png";
greenTank.src = "image/green_tank.png";
greenTank_left.src = "image/green_tank_left.png";
greenTank_right.src = "image/green_tank_right.png";
redTank.src = "image/red_tank.png";
redTank_left.src = "image/red_tank_left.png";
redTank_right.src = "image/red_tank_right.png";
burst_T.src = "image/burst_T.png";
burst_A.src = "image/burst_A.png";
green_airplane.src = "image/green_airplane.png";
green_airplane_left.src = "image/green_airplane_left.png";
green_airplane_right.src = "image/green_airplane_right.png";
red_airplane.src = "image/red_airplane.png";
red_airplane_left.src = "image/red_airplane_left.png";
red_airplane_right.src = "image/red_airplane_right.png";
path.src = "image/path.png";
grass.src = "image/grass.jpg";

var grassArray = [0,50,100,150,200,250,300,350];
var pathArray = [0,32,64,96,128,160,192,224,256,288,320,352,384];
var bulletArray = [];
var enemy_bulletArray = [];
var enemyTroopsArray = [];
var burstArray = [];
var sP_Y = [];

function draw(){ 
	tick++;
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx1.clearRect(0,0,cnv.width,cnv.height);
	ctx1.beginPath();
	ctx1.fillStyle = "yellow";
	ctx1.fillRect(10,65,180,10);
	xP();
	ctx1.beginPath();
	ctx1.strokeRect(10,65,180,10);
	ctx1.stroke();
	if(grassArray[0]==0){
		grassArray.unshift(grassArray[0]-50);
	}
	if(grassArray[grassArray.length-1]==400){
		grassArray.pop();
	}
	if(pathArray[0]==0){
		pathArray.unshift(pathArray[0]-32);
	}
	if(pathArray[pathArray.length-1]==400){
		pathArray.pop();
	}
	for(let a = 0; a<grassArray.length; a++){
		ctx.drawImage(grass,0,grassArray[a]);
		ctx.drawImage(grass,50,grassArray[a]);
		ctx.drawImage(grass,100,grassArray[a]);
		ctx.drawImage(grass,150,grassArray[a]);
		grassArray[a]+=1;
	}
	for(let b = 0; b<pathArray.length; b++){
		ctx.drawImage(path,68,pathArray[b]);
		ctx.drawImage(path,100,pathArray[b]);
		pathArray[b]+=1;
	}
	ctx.beginPath();
	ctx.fillStyle = "gray";
	ctx.fillRect(65,0,3,cnv.height);
	ctx.fillRect(132,0,3,cnv.height);	
	for(let em = 0; em < burstArray.length; em++){
		burstArray[em].y++;
		if(burstArray[em].t == "tank"){
			if(burstArray[em].s == 1){
				ctx.drawImage(burst_T,0,0,32,32,burstArray[em].x,burstArray[em].y,32,32);
			}else if(burstArray[em].s == 2){
				ctx.drawImage(burst_T,32,0,32,32,burstArray[em].x,burstArray[em].y,32,32);
			}else if(burstArray[em].s == 3){
				ctx.drawImage(burst_T,64,0,32,32,burstArray[em].x,burstArray[em].y,32,32);
			}else{
				burstArray.splice(em,1);
			}
		}else{
			if(burstArray[em].s == 1){
				ctx.drawImage(burst_A,0,0,48,48,burstArray[em].x,burstArray[em].y,48,48);
			}else if(burstArray[em].s == 2){
				ctx.drawImage(burst_A,48,0,48,48,burstArray[em].x,burstArray[em].y,48,48);
			}else if(burstArray[em].s == 3){
				ctx.drawImage(burst_A,96,0,48,48,burstArray[em].x,burstArray[em].y,48,48);
			}else{
				burstArray.splice(em,1);
			}
		}
	}
	if(resurrection){
		if(tank_airplane == "airplane"){
			animationResurrection(0);
		}else{
			animationResurrection(1);
		}
	}
	if(tick % 5 == 0){
		for(let bu = 0; bu < burstArray.length; bu++){
			if(burstArray[bu].s < 4){
				burstArray[bu].s++;
			}
		}
	}	
	if(!replace){
		if(tank_airplane == "tank"){
			ctx1.drawImage(tapeBulletsforTank,24,20);
			quantityS_P(0);
			ctx1.beginPath();
			ctx1.fillStyle = "black";
			ctx1.font = "10px Tahoma";
			ctx1.textAlign = "center";
			ctx1.textBaseline = "middle";
			ctx1.fillText(tankXp+"xp",100,70);
			ctx1.fill();
			quantityBullets(0);
			if(tick % 300 == 0){
				if(tankBullets<10){
					tankBullets++;
				}
			}
			if(moveLR == false){
				if(direction == "left"){
					posX = 68;
				}else{
					posX = 100;
				}
				if(posGreenTank){
					ctx.drawImage(greenTank,0,0,32,32,posX,cnv.height-greenTank.height/2,32,32);
				}else{
					ctx.drawImage(greenTank,0,32,32,32,posX,cnv.height-greenTank.height/2,32,32);
				}
			}else{
				if(direction == "right"){
					if(posX != 100){
						if(posGreenTank){
							ctx.drawImage(greenTank_right,0,0,32,32,posX,cnv.height-greenTank.height/2,32,32);
						}else{
							ctx.drawImage(greenTank_right,0,32,32,32,posX,cnv.height-greenTank.height/2,32,32);
						}
						posX++;
					}else{
						moveLR = false;
					}
				}else if(direction == "left"){
					if(posX != 68){
						if(posGreenTank){
							ctx.drawImage(greenTank_left,0,0,32,32,posX,cnv.height-greenTank.height/2,32,32);
						}else{
							ctx.drawImage(greenTank_left,0,32,32,32,posX,cnv.height-greenTank.height/2,32,32);
						}
						posX--;
					}else{
						moveLR = false;
					}
				}
			}
		}
	}
	enemyBullet();
	for(let c = 0; c<bulletArray.length; c++){
		if(bulletArray[c].t == "tank"){	
			bulletArray[c].y--;
			ctx.drawImage(bulletTank,bulletArray[c].x,bulletArray[c].y);
		}else{
			bulletArray[c].y-=2;
			ctx.drawImage(bulletAirplane,bulletArray[c].x,bulletArray[c].y);
		}
		if(bulletArray[0].y < -5){
			bulletArray.shift();
		}	
	}
	createEnemyTroops();
	if(!replace){
		if(tank_airplane == "airplane"){
			ctx1.drawImage(tapeBulletsforAirplane,23,10);
			quantityS_P(1);
			ctx1.beginPath();
			ctx1.fillStyle = "black";
			ctx1.font = "10px Tahoma";
			ctx1.textAlign = "center";
			ctx1.textBaseline = "middle";
			ctx1.fillText(airplaneXp+"xp",100,70);
			ctx1.fill();
			if(tick % 180 == 0){
				if(airplaneBullets<20){
					airplaneBullets++;
				}
			}
			quantityBullets(1);
			if(moveLR_Airplane[1] == null){
				ctx.drawImage(green_airplane,posX_Airplane,cnv.height-green_airplane.height);
			}else if(moveLR_Airplane[1] == "left"){
				ctx.drawImage(green_airplane_left,posX_Airplane,cnv.height-green_airplane_left.height);
			}else if(moveLR_Airplane[1] == "right"){
				ctx.drawImage(green_airplane_right,posX_Airplane,cnv.height-green_airplane_right.height);
			}
		}
	}
	if(replace){
		animationReplace();
	}
	accident();
	boom();
	twoBullets();
	death();
	for(let fc = 0; fc<sP_Y.length; fc++){
		sP_Y[fc]--;
		ctx.beginPath();
		ctx.fillStyle = "#BA26C3";
		ctx.fillRect(0,sP_Y[fc]-2,cnv.width,2);
		if(sP_Y[0] < -5){
			sP_Y.shift();
		}
	}
	if(tick % 15 == 0){	
		posGreenTank = !posGreenTank;	
	}
	if(replace){
		sP_U = false;
		sP_M = [-1,-1];
	}
	if(tick % 10 == 0){	
		if(sP_U){
			if(tank_airplane == "tank"){
				if(sP[0]>0){
					sP[0]--;
				}else{
					sP_U = false;
					sP_M = [-1,-1];
				}
			}else{
				if(sP[1]>0){
					sP[1]--;
				}else{
					sP_U = false;
					sP_M = [-1,-1];
				}
			}
		}
		if(tankXp<500){
			if(sP_M[0]>=0){
				tankXp++;
			}
		}
		if(airplaneXp<300){
			if(sP_M[1]>=0){
				airplaneXp++;
			}
		}
	}
	if(sP_U){ 
		ctx.beginPath();
		ctx.fillStyle = "rgba(186,38,195,0.3)";
		ctx.fillRect(0,0,cnv.width,cnv.height);
	}
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(kill,0,0);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText(feil + "/" + "10",cnv.width,0);
	ctx.fill();
	if(feil == 10){
		gameOver();
	}
};

var posX_Airplane = random(153);
var direction = null;
var lr = random(2);
if(lr == 0){
	direction = "left";
}else{
	direction = "right";
}

var sP_U = false;
var sP_M = [-1,-1];
var moveLR = false;  
var de = 0;
function keyHandler(){
	if(wDownload){
		if(replace == false){
			if(moveLR_Airplane[0] == false){
				if(moveLR == false){
					switch(event.keyCode){
						case 32:
							if(tank_airplane == "tank"){
								if(manyBullets == false){
									if(tankBullets>0){
										if(sP_M[0] < 1){
											bulletArray.push({
												t: "tank",
												x: posX+14,
												y: cnv.height-greenTank.height/2-3,
												u: false
											});
										}else{
											sP_Y.push(cnv.height-greenTank.height/2-5);
										}
									tankBullets--;
									}
								}
							}else{
								if(airplaneBullets>0){
									if(posBullet_LR == "left"){
										bulletArray.push({
											t: "airplane",
											x: posX_Airplane+18,
											y: cnv.height-green_airplane.height+10,
											w: bulletTank.width,
											h: bulletTank.height,
											u: false
										});
										posBullet_LR = "right";
									}else{
										bulletArray.push({
											t: "airplane",
											x: posX_Airplane+27,
											y: cnv.height-green_airplane.height+10,
											w: bulletAirplane.width,
											h: bulletAirplane.height,
											u: false
										});
										posBullet_LR = "left";
									}
									if(sP_M[1]<1){
										airplaneBullets--;
									}
								}
							}
						break;
						case 90:
							if(!resurrection){
								if(de==0){
									z();
								}
							}
						break;
					}
				}
			}
			switch(event.keyCode){
				case 68: //d
					if(tank_airplane == "tank"){
						if(direction == "left"){
							moveLR = true;
						} 
						direction = "right";
					}else if(tank_airplane == "airplane"){
						moveLR_Airplane[0] = true;
						moveLR_Airplane[1] = "right";
						if(posX_Airplane <=152){
							posX_Airplane+=5;
						}
					}
				break;
				case 65: //a
					if(tank_airplane == "tank"){
						if(direction == "right"){
							moveLR = true;
						}
						direction = "left";
					}else if(tank_airplane == "airplane"){
						moveLR_Airplane[0] = true;
						moveLR_Airplane[1] = "left";
						if(posX_Airplane >=0){
							posX_Airplane-=5;
						}
					}
				break;
				case 66:
					if(!sP_U){
						if(tank_airplane == "tank"){
							if(sP[0]>0){
								sP_U = true;
								if(sP[0] <50){
									sP_M[0] = 0;
								}else if(sP[0] < 100){
									sP_M[0] = 1;
								}else{
									sP_M[0] = 2;
									if(sP_M[0]==2){
										if(airplaneXp==0){
											airplaneXp+=20;
											ai = true;
											de--;
											resurrection = true;
											posX_Airplane = random(153);
										}
									}
								}
							}
						}else{
							if(sP[1]>0){
								sP_U = true;
								if(sP[1] <50){
									sP_M[1] = 0;
								}else if(sP[1] < 100){
									sP_M[1] = 1;
									airplaneBullets = 20;
								}else{
									sP_M[1] = 2;
									if(sP_M[1]==2){
										if(tankXp==0){
											tankXp+=50;
											ta = true;
											de--;
											resurrection = true;
											lr = random(2);
											if(lr == 0){
												direction = "left";
											}else{
												direction = "right";
											}
										}
									}
								}
							}
						}
					}
				break;
			}
		}
	}
	switch(event.keyCode){
		case 13:
		if(enter){
			start();
		}
		break;
	}
}

var manyBullets = false;
function keyPress(){
	if(wDownload){
		switch(event.keyCode){
			case 32:
				manyBullets = true;
			break;
		}
	}
}

function keyUp(){
	if(wDownload){
		switch(event.keyCode){
			case 32:
				manyBullets = false;
			break;
			case 68: //d
				if(tank_airplane == "airplane"){
					moveLR_Airplane[0] = false;
					moveLR_Airplane[1] = null;
				}
			break;
			case 65: //a
				if(tank_airplane == "airplane"){
					moveLR_Airplane[0] = false;
					moveLR_Airplane[1] = null;
				}
			break;
		}
	}
}

function quantityBullets(d){
	ctx1.beginPath();
	if(d == 0){
		if(tankBullets <=9){
			ctx1.fillStyle = "white";
			ctx1.fillRect(164,20,12,10);
		}
		if(tankBullets <=8){
			ctx1.fillStyle = "white";
			ctx1.fillRect(148,20,16,10);
		}
		if(tankBullets <=7){
			ctx1.fillStyle = "white";
			ctx1.fillRect(132,20,16,10);
		}
		if(tankBullets <=6){
			ctx1.fillStyle = "white";
			ctx1.fillRect(116,20,16,10);
		}
		if(tankBullets <=5){
			ctx1.fillStyle = "white";
			ctx1.fillRect(100,20,16,10);
		}
		if(tankBullets <=4){
			ctx1.fillStyle = "white";
			ctx1.fillRect(84,20,16,10);
		}
		if(tankBullets <=3){
			ctx1.fillStyle = "white";
			ctx1.fillRect(68,20,16,10);
		}
		if(tankBullets <=2){
			ctx1.fillStyle = "white";
			ctx1.fillRect(52,20,16,10);
		}
		if(tankBullets <=1){
			ctx1.fillStyle = "white";
			ctx1.fillRect(36,20,12,10);
		}
		if(tankBullets == 0){
			ctx1.fillStyle = "white";
			ctx1.fillRect(24,20,12,10);
		}
	}else{
		if(airplaneBullets <=19){
			ctx1.fillStyle = "white";
			ctx1.fillRect(164,25,13,15);
		}
		if(airplaneBullets <=18){
			ctx1.fillStyle = "white";
			ctx1.fillRect(164,10,13,15);
		}
		if(airplaneBullets <=17){
			ctx1.fillStyle = "white";
			ctx1.fillRect(148,25,16,15);
		}
		if(airplaneBullets <=16){
			ctx1.fillStyle = "white";
			ctx1.fillRect(148,10,16,15);
		}
		if(airplaneBullets <=15){
			ctx1.fillStyle = "white";
			ctx1.fillRect(132,25,16,15);
		}
		if(airplaneBullets <=14){
			ctx1.fillStyle = "white";
			ctx1.fillRect(132,10,16,15);
		}
		if(airplaneBullets <=13){
			ctx1.fillStyle = "white";
			ctx1.fillRect(116,25,16,15);
		}
		if(airplaneBullets <=12){
			ctx1.fillStyle = "white";
			ctx1.fillRect(116,10,16,15);
		}
		if(airplaneBullets <=11){
			ctx1.fillStyle = "white";
			ctx1.fillRect(100,25,16,15);
		}
		if(airplaneBullets <= 10){
			ctx1.fillStyle = "white";
			ctx1.fillRect(100,10,16,15);
		}
		if(airplaneBullets <=9){
			ctx1.fillStyle = "white";
			ctx1.fillRect(84,25,16,15);
		}
		if(airplaneBullets <=8){
			ctx1.fillStyle = "white";
			ctx1.fillRect(84,10,16,15);
		}
		if(airplaneBullets <=7){
			ctx1.fillStyle = "white";
			ctx1.fillRect(68,25,16,15);
		}
		if(airplaneBullets <=6){
			ctx1.fillStyle = "white";
			ctx1.fillRect(68,10,16,15);
		}
		if(airplaneBullets <=5){
			ctx1.fillStyle = "white";
			ctx1.fillRect(52,25,16,15);
		}
		if(airplaneBullets <=4){
			ctx1.fillStyle = "white";
			ctx1.fillRect(52,10,16,15);
		}
		if(airplaneBullets <=3){
			ctx1.fillStyle = "white";
			ctx1.fillRect(36,25,16,15);
		}
		if(airplaneBullets <=2){
			ctx1.fillStyle = "white";
			ctx1.fillRect(36,10,16,15);
		}
		if(airplaneBullets <=1){
			ctx1.fillStyle = "white";
			ctx1.fillRect(23,25,16,15);
		}
		if(airplaneBullets == 0){
			ctx1.fillStyle = "white";
			ctx1.fillRect(23,10,16,15);
		}
	}
}

var sP = [0,0];
var colorSP = "#E277E9";
var nW = [1,1];
function quantityS_P(j){
	if(sP[0]>100){
		sP[0] = 100;
	}
	if(sP[1]>100){
		sP[1] = 100;
	}
	if(j == 0){
		if(sP[0]<50){
			colorSP = "#E277E9";
		}else{
			colorSP = "#BA26C3";
		}
		ctx1.beginPath();
		ctx1.fillStyle = colorSP;
		ctx1.fillRect(24,35,152/100*sP[0],8);
	}else{
		if(sP[1]<50){
			colorSP = "#E277E9";
		}else{
			colorSP = "#BA26C3";
		}
		ctx1.fillStyle = colorSP;
		ctx1.fillRect(24,45,152/100*sP[1],8);
	}
	if(tick % 5 == 0){
		if(nW[1] == 1){
			nW[0]++;
			if(nW[0] == 4){
				nW[1] = 2;
			}
		}else{
			nW[0]--;
			if(nW[0] == 1){
				nW[1] = 1;
			}
		}
	}
	if((tank_airplane == "tank" && sP[0] == 100)||(tank_airplane == "airplane" && sP[1] == 100)){
		ctx1.beginPath();
		ctx1.fillStyle = "rgba(255,255,255,0." + nW[0] + ")";
		if(j == 0){
			ctx1.fillRect(24,35,152,8);
		}else{
			ctx1.fillRect(24,45,152,8);
		}
	}
}

function xP(){
	ctx1.beginPath();
	let xXp = 0;
	let wXp = 0;
	if(tank_airplane == "tank"){
		xXp = 10+180-180/500*(500-tankXp);
		wXp = 180/500*(500-tankXp);
		ctx1.fillStyle = "white";
		ctx1.fillRect(xXp,65,wXp,10);
	}else{
		xXp = 10+180-180/300*(300-airplaneXp);
		wXp = 180/300*(300-airplaneXp);
		ctx1.fillStyle = "white";
		ctx1.fillRect(xXp,65,wXp,10);
	}
}

var posY_Tank = 0;
var posY_Airplane = 0;
var ta = true;
var ai = true;
function animationReplace(){
	if(tank_airplane == "tank"){
		if(replaceStape == 1){
			posY_Airplane+=1.5;
			if(ai){
				ctx.drawImage(green_airplane,posX_Airplane,posY_Airplane);
			}
			if(posY_Airplane >= cnv.height){
				replaceStape++;
			}
		}else{
			if(direction == "left"){
				posX = 68;
			}else{
				posX = 100;
			}
			posY_Tank-=1.5;
			if(posGreenTank){
				ctx.drawImage(greenTank,0,0,32,32,posX,posY_Tank,32,32);
			}else{
				ctx.drawImage(greenTank,0,32,32,32,posX,posY_Tank,32,32);
			}
			if(posY_Tank <= cnv.height-greenTank.height/2){
				replaceStape--;
				replace = false;
			}
		}
	}else{
		if(replaceStape == 1){
			posY_Tank+=1.5;
			if(ta){
				if(posGreenTank){
					ctx.drawImage(greenTank,0,0,32,32,posX,posY_Tank,32,32);
				}else{
					ctx.drawImage(greenTank,0,32,32,32,posX,posY_Tank,32,32);
				}
			}
			if(posY_Tank >= cnv.height){
				replaceStape++;
			}
		}else{
			posY_Airplane-=1.5;
			ctx.drawImage(green_airplane,posX_Airplane,posY_Airplane);
			if(posY_Airplane <= cnv.height-green_airplane.height){
				replaceStape--;
				replace = false;
			}
		}
	}
}

var resurrection = false;
var stapeResurrection = 1;
function animationResurrection(taAi){
	if(taAi == 0){
		if(stapeResurrection == 1){
			posY_Tank-=0.5;
			if(posGreenTank){
				ctx.drawImage(greenTank,0,0,32,32,posX,posY_Tank,32,32);
			}else{
				ctx.drawImage(greenTank,0,32,32,32,posX,posY_Tank,32,32);
			}
			if(posY_Tank <= cnv.height-greenTank.height/2){
				stapeResurrection++;
			}
		}else{
			posY_Tank+=0.5;
			if(posGreenTank){
				ctx.drawImage(greenTank,0,0,32,32,posX,posY_Tank,32,32);
			}else{
				ctx.drawImage(greenTank,0,32,32,32,posX,posY_Tank,32,32);
			}
			if(posY_Tank >= cnv.height){
				stapeResurrection--;
				resurrection = false;
			}
		}
	}else{
		if(stapeResurrection == 1){
			posY_Airplane-=0.5;
			ctx.drawImage(green_airplane,posX_Airplane,posY_Airplane);
			if(posY_Airplane <= cnv.height-green_airplane.height){
				stapeResurrection++;
			}
		}else{
			posY_Airplane+=0.5;
			ctx.drawImage(green_airplane,posX_Airplane,posY_Airplane);
			if(posY_Airplane >= cnv.height){
				stapeResurrection--;
				resurrection = false;
			}
		}
	}
}

function enemyBullet(){
	for(let g = 0; g < enemyTroopsArray.length; g++){
		let cleverBullet = 0;
		if(enemyTroopsArray[g].t == "tank"){
			if(tank_airplane == "tank"){
				if(enemyTroopsArray[g].x+16 >= posX && enemyTroopsArray[g].x+16 <= posX+greenTank.width){
					cleverBullet+=10;
				}
			}
		}else{
			if(tank_airplane == "tank"){
				if(enemyTroopsArray[g].posX_B == "left"){
					if(enemyTroopsArray[g].x+27 >= posX && enemyTroopsArray[g].x+27 <= posX+greenTank.width){
						cleverBullet+=10;		
					}
				}else{
					if(enemyTroopsArray[g].x+18 >= posX && enemyTroopsArray[g].x+18 <= posX+greenTank.width){
						cleverBullet+=10;
					}
				}
			}else{
				if(enemyTroopsArray[g].posX_B == "left"){
					if(enemyTroopsArray[g].x+27 >= posX_Airplane && enemyTroopsArray[g].x+27 <= posX_Airplane+green_airplane.width){
						cleverBullet+=10;
					}
				}else{
					if(enemyTroopsArray[g].x+18 >= posX_Airplane && enemyTroopsArray[g].x+18 <= posX_Airplane+green_airplane.width){
						cleverBullet+=10;
					}
				}
			}
		}
		let rand = random(1500);
		if(rand <= cleverBullet){
			if(enemyTroopsArray[g].t == "tank"){
				enemy_bulletArray.push({
					x:enemyTroopsArray[g].x+14,
					y:enemyTroopsArray[g].y+redTank.height/2-3,
					t:"tank",
					u:false
				});
			}else{
				if(enemyTroopsArray[g].posX_B == "left"){
					enemy_bulletArray.push({
						x:enemyTroopsArray[g].x+red_airplane.width-18,
						y:enemyTroopsArray[g].y+red_airplane.height-15,
						t:"airplane",
						u:false
					});
					enemyTroopsArray[g].posX_B = "right";
				}else{
					enemy_bulletArray.push({
						x:enemyTroopsArray[g].x+red_airplane.width-27,
						y:enemyTroopsArray[g].y+red_airplane.height-15,
						t:"airplane",
						u:false
					});
					enemyTroopsArray[g].posX_B = "left";
				}
			}
		}
	}
	for(let m = 0; m<enemy_bulletArray.length; m++){
		if(enemy_bulletArray[m].t == "tank"){
			ctx.drawImage(enemy_bulletTank,enemy_bulletArray[m].x,enemy_bulletArray[m].y);
		}else{
			ctx.drawImage(bulletAirplane,enemy_bulletArray[m].x,enemy_bulletArray[m].y);
		}
		enemy_bulletArray[m].y+=2.4;
	}
	for(let gs = 0; gs<enemy_bulletArray.length; gs++){
		if(enemy_bulletArray[gs].y >= cnv.height){
			enemy_bulletArray.splice(gs,1);
		}
	}
}

var tick_eT = 0;
var manyET = 0;
var groupOfTroops = 0;
function createEnemyTroops(){
	let rand = random(n);
	if(tick % 100 == 0){
		if(n>500){
			n--;
		}
	}
	if(rand == 0){
		groupOfTroops = 30;
	}else if(rand > 0 && groupOfTroops > 0){
		groupOfTroops-=15;
	}
	if(tick_eT > 0){
		tick_eT-=1.4;
	}else if(tick_eT < 0){
		tick_eT = 0;
	}
	if(rand <= groupOfTroops){
		manyET++;
	}
	if(manyET > 0 && tick_eT == 0){
		manyET--;
		let randomTroops = random(4);
		if(randomTroops == 0){
			let posX_A = random(153);
			let posY_A = 0-red_airplane.height;
			enemyTroopsArray.push({
				x:posX_A,
				y:posY_A,
				xP:100,
				posX_B:"left",
				w:red_airplane.height,
				t:"airplane"
			});
			tick_eT = red_airplane.height;
		}else{
			let posX_T = random(2);
			if(posX_T == 0){
				posX_T = 68;
			}else{
				posX_T = 100;
			}
			let posY_T = 0-redTank.height/2;
			enemyTroopsArray.push({
				x:posX_T,
				y:posY_T,
				xP:150,
				w:redTank.height/2,
				t:"tank",
				movePos:true
			});
			tick_eT = redTank.height/2;
		}
	}
	for(let eT = 0; eT<enemyTroopsArray.length; eT++){
		enemyTroopsArray[eT].y+=1.4;
		if(enemyTroopsArray[eT].t == "tank"){
			if(tick % 15 == 0){	
				enemyTroopsArray[eT].movePos = !enemyTroopsArray[eT].movePos;
			}
			if(enemyTroopsArray[eT].movePos){
				ctx.drawImage(redTank,0,0,32,32,enemyTroopsArray[eT].x,enemyTroopsArray[eT].y,32,32);
			}else{
				ctx.drawImage(redTank,0,32,32,32,enemyTroopsArray[eT].x,enemyTroopsArray[eT].y,32,32);
			}
		}else if(enemyTroopsArray[eT].t == "airplane"){
			ctx.drawImage(red_airplane,enemyTroopsArray[eT].x,enemyTroopsArray[eT].y);
		}
		if(enemyTroopsArray[eT].y>=cnv.height){
			enemyTroopsArray.shift();
			feil++;
		}
	}
}

function boom(){
	for(let b = 0; b<bulletArray.length; b++){
		for(let e = 0; e<enemyTroopsArray.length; e++){
			if(!bulletArray[b].u){
				if(bulletArray[b].t == "tank"){
					if(enemyTroopsArray[e].t == "tank"){
						if(
						(bulletArray[b].x >= enemyTroopsArray[e].x && bulletArray[b].x <= enemyTroopsArray[e].x+enemyTroopsArray[e].w ||
						bulletArray[b].x+bulletArray[b].w >= enemyTroopsArray[e].x && bulletArray[b].x+bulletArray[b].w <= enemyTroopsArray[e].x+enemyTroopsArray[e].w) && 
						(bulletArray[b].y >= enemyTroopsArray[e].y && bulletArray[b].y <= enemyTroopsArray[e].y+enemyTroopsArray[e].w ||
						bulletArray[b].y+bulletArray[b].h >= enemyTroopsArray[e].y && bulletArray[b].y+bulletArray[b].h <= enemyTroopsArray[e].y+enemyTroopsArray[e].h)
						){
							enemyTroopsArray[e].xP-=150;
							if(enemyTroopsArray[e].xP <=0){
								burstArray.push({
									x:enemyTroopsArray[e].x,
									y:enemyTroopsArray[e].y,
									s:1,
									t:"tank"
								});
								enemyTroopsArray.splice(e,1);
								kill++;
								if(sP_M[0] == -1){
									if(sP[0]<100){
										sP[0]+=10;
									}
								}
							}
							bulletArray[b].u = true;
						}
					}
				}else{
					if(
					(bulletArray[b].x >= enemyTroopsArray[e].x && bulletArray[b].x <= enemyTroopsArray[e].x+enemyTroopsArray[e].w ||
					bulletArray[b].x+bulletArray[b].w >= enemyTroopsArray[e].x && bulletArray[b].x+bulletArray[b].w <= enemyTroopsArray[e].x+enemyTroopsArray[e].w) && 
					(bulletArray[b].y >= enemyTroopsArray[e].y && bulletArray[b].y <= enemyTroopsArray[e].y+enemyTroopsArray[e].w ||
					bulletArray[b].y+bulletArray[b].h >= enemyTroopsArray[e].y && bulletArray[b].y+bulletArray[b].h <= enemyTroopsArray[e].y+enemyTroopsArray[e].h)
					){
						enemyTroopsArray[e].xP-=50;
						if(enemyTroopsArray[e].xP <= 0){
							if(enemyTroopsArray[e].t == "tank"){
								burstArray.push({
									x:enemyTroopsArray[e].x,
									y:enemyTroopsArray[e].y,
									s:1,
									t:"tank"
								});
							}else{
								burstArray.push({
									x:enemyTroopsArray[e].x,
									y:enemyTroopsArray[e].y,
									s:1,
									t:"airplane"
								});
							}
							enemyTroopsArray.splice(e,1);
							kill++;
							if(sP_M[1] == -1){
								if(sP[1]<100){
									sP[1]+=10;
								}
							}
						}
						bulletArray[b].u = true;
					}
				}
			}
		}
	}
	for(let sP_B = 0; sP_B < sP_Y.length; sP_B++){
		for(sP_eB = 0; sP_eB < enemyTroopsArray.length; sP_eB++){
			if(sP_Y[sP_B]>=enemyTroopsArray[sP_eB].y && sP_Y[sP_B]<=enemyTroopsArray[sP_eB].y+enemyTroopsArray[sP_eB].w){
				if(enemyTroopsArray[sP_eB].t == "tank"){
					burstArray.push({
						x:enemyTroopsArray[sP_eB].x,
						y:enemyTroopsArray[sP_eB].y,
						s:1,
						t:"tank"
					});
				}else{
					burstArray.push({
						x:enemyTroopsArray[sP_eB].x,
						y:enemyTroopsArray[sP_eB].y,
						s:1,
						t:"airplane"
					});
				}
				enemyTroopsArray.splice(sP_eB,1);
				kill++;
			}
		}
		for(let lf = 0; lf < enemy_bulletArray.length; lf++){
			if(!enemy_bulletArray[lf].u){
				let adf = 0;
				if(enemy_bulletArray[lf].t == "tank"){
					adf = enemy_bulletTank.height;
				}else{
					adf = bulletAirplane.height;
				}
				if(sP_Y[sP_B] >= enemy_bulletArray[lf].y && sP_Y[sP_B] <= enemy_bulletArray[lf].y+adf){
					enemy_bulletArray[lf].u = true;
				}
			}
		}
	}
	for(let o = 0; o<bulletArray.length; o++){
		if(bulletArray[o].u){
			bulletArray.splice(o,1);
		}
	}
	for(let q = 0; q<enemy_bulletArray.length; q++){
		if(!enemy_bulletArray[q].u){
			if(enemy_bulletArray[q].t == "tank"){
				if(tank_airplane == "tank"){
					if(
					(enemy_bulletArray[q].x>=posX && enemy_bulletArray[q].x<=posX+greenTank.width ||
					enemy_bulletArray[q].x+enemy_bulletTank.width>=posX && enemy_bulletArray[q].x+enemy_bulletTank.width<=posX+greenTank.width) &&
					(enemy_bulletArray[q].y+enemy_bulletTank.height>=cnv.height-greenTank.height/2 &&
					enemy_bulletArray[q].y+enemy_bulletTank.height<=cnv.height)
					){
						tankXp-=50;
						enemy_bulletArray[q].u = true;
					}
				}
			}else{
				if(tank_airplane == "tank"){
					if(
					(enemy_bulletArray[q].x>=posX && enemy_bulletArray[q].x<=posX+greenTank.width ||
					enemy_bulletArray[q].x+bulletAirplane.width>=posX && enemy_bulletArray[q].x+bulletAirplane.width<=posX+greenTank.width) &&
					enemy_bulletArray[q].y+bulletAirplane.height>=cnv.height-greenTank.height/2 &&
					enemy_bulletArray[q].y+bulletAirplane.height<=cnv.height
					){
						tankXp-=20;
						enemy_bulletArray[q].u = true;
					}
				}else{
					if(
					(enemy_bulletArray[q].x>=posX_Airplane && enemy_bulletArray[q].x<=posX_Airplane+green_airplane.width ||
					enemy_bulletArray[q].x+bulletAirplane.width>=posX_Airplane && enemy_bulletArray[q].x+bulletAirplane.width<=posX_Airplane+green_airplane.width) &&
					enemy_bulletArray[q].y+bulletAirplane.height>=cnv.height-green_airplane.height &&
					enemy_bulletArray[q].y+bulletAirplane.height<=cnv.height
					){
						airplaneXp-=20;
						enemy_bulletArray[q].u = true;
					}
				}
			}
		}
	}
	for(let os = 0; os<enemy_bulletArray.length; os++){
		if(enemy_bulletArray[os].u){
			enemy_bulletArray.splice(os,1);
		}
	}
}

function accident(){
	for(let mz = 0; mz<enemyTroopsArray.length; mz++){
		if(enemyTroopsArray[mz].t == "tank"){
			if(tank_airplane == "tank"){
				if(
				(enemyTroopsArray[mz].x > posX && enemyTroopsArray[mz].x <posX+greenTank.width ||
				enemyTroopsArray[mz].x+enemyTroopsArray[mz].w > posX && enemyTroopsArray[mz].x+enemyTroopsArray[mz].w < posX+greenTank.width ||
				enemyTroopsArray[mz].x == posX && enemyTroopsArray[mz].x+enemyTroopsArray[mz].w == posX+greenTank.width) &&
				(enemyTroopsArray[mz].y >= cnv.height-greenTank.height/2 && enemyTroopsArray[mz].y <= cnv.height)
				){
					tankXp-=100;
					burstArray.push({
						x:enemyTroopsArray[mz].x,
						y:enemyTroopsArray[mz].y,
						s:1,
						t:"tank"
					});
					enemyTroopsArray.splice(mz,1);
					kill++;
					if(sP[0]<100){
						sP[0]+=5;
					}
				}
			}
		}else{
			if(tank_airplane == "airplane"){
				if(
				(enemyTroopsArray[mz].x > posX_Airplane && enemyTroopsArray[mz].x <posX_Airplane+green_airplane.width ||
				enemyTroopsArray[mz].x+enemyTroopsArray[mz].w > posX_Airplane && enemyTroopsArray[mz].x+enemyTroopsArray[mz].w < posX_Airplane+green_airplane.width) &&
				(enemyTroopsArray[mz].y >= cnv.height-green_airplane.height && enemyTroopsArray[mz].y <= cnv.height)
				){
					airplaneXp-=60;
					burstArray.push({
						x:enemyTroopsArray[mz].x,
						y:enemyTroopsArray[mz].y,
						s:1,
						t:"airplane"
					});
					enemyTroopsArray.splice(mz,1);
					kill++;
					if(sP[1]<100){
						sP[1]+=5;
					}
				}
			}
		}
	}
}

function z(){
	replace = true;
	if(tank_airplane == "tank"){
		tank_airplane = "airplane";
		posX_Airplane = random(153);
	}else{
		tank_airplane = "tank";
		lr = random(2);
		if(lr == 0){
			direction = "left";
		}else{
			direction = "right";
		}
	}
}

function death(){
	if(tank_airplane == "tank"){
		if(tankXp <= 0){
			ta = false;
			burstArray.push({
				x:posX,
				y:cnv.height-greenTank.height/2,
				s:1,
				t:"tank"
			});
			z();
			de++;
		}
	}else{
		if(airplaneXp <= 0){
			ai = false;
			burstArray.push({
				x:posX_Airplane,
				y:cnv.height-green_airplane.height,
				s:1,
				t:"airplane"
			});
			z();
			de++;
		}
	}
	if(de == 2){
		gameOver();
	}
}

function twoBullets(){
	for(let mB = 0; mB<bulletArray.length; mB++){
		if(!bulletArray[mB].u){
			for(let eB = 0; eB<enemy_bulletArray.length; eB++){
				if(!enemy_bulletArray[eB].u){
					if(bulletArray[mB].t == "tank" && enemy_bulletArray[eB].t == "tank"){
						if(
						bulletArray[mB].x == enemy_bulletArray[eB].x && 
						bulletArray[mB].y >= enemy_bulletArray[eB].y && bulletArray[mB].y <= enemy_bulletArray[eB].y+enemy_bulletTank.height
						){
							bulletArray[mB].u = true;
							enemy_bulletArray[eB].u = true;
						}
					}
				}
			}
		}
	}
	for(let tmB = 0; tmB<bulletArray.length; tmB++){
		if(bulletArray[tmB].u){
			bulletArray.splice(tmB,1);
		}
	}
	for(let teB = 0; teB<enemy_bulletArray.length; teB++){
		if(enemy_bulletArray[teB].u){
			enemy_bulletArray.splice(teB,1);
		}
	}
}

function random(a){
	let randomNumber = Math.floor(Math.random() * a);
	return randomNumber;
}

function gameOver(){
	clearInterval(animation);
	ctx.clearRect(0,0,cnv.width,cnv.height);
	ctx1.clearRect(0,0,cnv1.width,cnv1.height);
	kill = 0;
	feil = 0;
	posGreenTank = true;
	tick = 0;
	posX = 0;
	moveLR_Airplane = [false,null];
	tank_airplane = "tank";
	tankBullets = 10;
	airplaneBullets = 20;
	posBullet_LR = "left"; 
	replace = false; 
	replaceStape = 1;
	n = 800;
	tankXp = 500;
	airplaneXp = 300;
	grassArray = [0,50,100,150,200,250,300,350];
	pathArray = [0,32,64,96,128,160,192,224,256,288,320,352,384];
	bulletArray = [];
	enemy_bulletArray = [];
	enemyTroopsArray = [];
	burstArray = [];
	sP_Y = [];
	posX_Airplane = random(153);
	direction = null;
	lr = random(2);
	if(lr == 0){
		direction = "left";
	}else{
		direction = "right";
	}
	sP_U = false;
	sP_M = [-1,-1];
	moveLR = false;  
	de = 0;		
	manyBullets = false;
	sP = [0,0];
	nW = [1,1];
	posY_Tank = 0;
	posY_Airplane = 0;
	ta = true;
	ai = true;
	tick_eT = 0;
	manyET = 0;
	groupOfTroops = 0;
	resurrection = false;
	stapeResurrection = 1;
	for(let a = 0; a<grassArray.length; a++){
		ctx.drawImage(grass,0,grassArray[a]);
		ctx.drawImage(grass,50,grassArray[a]);
		ctx.drawImage(grass,100,grassArray[a]);
		ctx.drawImage(grass,150,grassArray[a]);
	}
	for(let b = 0; b<pathArray.length; b++){
		ctx.drawImage(path,68,pathArray[b]);
		ctx.drawImage(path,100,pathArray[b]);
	}
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "30px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width/2,cnv.height/2);
	ctx.fill();
	document.getElementById('start').style.display = 'inline-block';
	document.getElementById('start').style.top = '250px';
	enter = true;
}

function start(){
	document.getElementById('start').style.display = 'none';
	wDownload = true;
	posY_Airplane = cnv.height;
	posY_Tank = cnv.height-greenTank.height/2;
	animation = setInterval(draw,12);
	enter = false;
}

var enter = false;
document.getElementById('start').style.display = 'none';
window.onload = function interval(){
	document.getElementById('start').style.display = 'inline-block';
	enter = true;
	for(let a = 0; a<grassArray.length; a++){
		ctx.drawImage(grass,0,grassArray[a]);
		ctx.drawImage(grass,50,grassArray[a]);
		ctx.drawImage(grass,100,grassArray[a]);
		ctx.drawImage(grass,150,grassArray[a]);
	}
	for(let b = 0; b<pathArray.length; b++){
		ctx.drawImage(path,68,pathArray[b]);
		ctx.drawImage(path,100,pathArray[b]);
	}
	ctx.beginPath();
	ctx.fillStyle = "gray";
	ctx.fillRect(65,0,3,cnv.height);
	ctx.fillRect(132,0,3,cnv.height);
}