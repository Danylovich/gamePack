function draw1(X,Y,W,H){
	// ctx.fillStyle = 'green';
	// ctx.fillRect(X,Y,W,H);
	if(Stage1==1){		
	ctx.moveTo(X,Y+H);
	ctx.lineTo(X,Y);
	ctx.stroke();
	}else if(Stage1==2){
	ctx.moveTo(X,Y);
	ctx.lineTo(X+W,Y);
	ctx.stroke();
	}else if(Stage1==3){
	ctx.moveTo(X+W/2,Y);
	ctx.lineTo(X+W/2,Y+H/3);
	ctx.stroke();
	}else if(Stage1==4){
	ctx.beginPath();
	ctx.arc(X+W/2,Y+H/300*113,W/10*1.2,Math.PI*2,false);
	ctx.stroke();
	}else if(Stage1==5){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.lineTo(X+W/2,Y+H/1.5);
	ctx.stroke();
	}else if(Stage1==6){
	ctx.moveTo(X+W/2,Y+H/1.5);
	ctx.lineTo(X+W/10*3,Y+H/1.2);
	ctx.stroke();
	}else if(Stage1==7){
	ctx.moveTo(X+W/2,Y+H/1.5);
	ctx.lineTo(X+W/10*7,Y+H/1.2);
	ctx.stroke();
	}else if(Stage1==8){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.quadraticCurveTo(X+W/10*6,Y+H/30*14,X+W/10*7,Y+H/1.5);
	ctx.stroke();
	}else if(Stage1==9){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.quadraticCurveTo(X+W/2.5,Y+H/30*14,X+W/10*3,Y+H/1.5);
	ctx.stroke();
	ctx.beginPath();
	ctx.font = "50px Courier";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width/2,365);
	ctx.fill();
	gameOver++;
	}
}

function draw2(X,Y,W,H){
	// ctx.fillStyle = 'green';
	// ctx.fillRect(X,Y,W,H);
	if(Stage2==1){		
	ctx.moveTo(X,Y+H);
	ctx.lineTo(X,Y);
	ctx.stroke();
	}else if(Stage2==2){
	ctx.moveTo(X,Y);
	ctx.lineTo(X+W,Y);
	ctx.stroke();
	}else if(Stage2==3){
	ctx.moveTo(X+W/2,Y);
	ctx.lineTo(X+W/2,Y+H/3);
	ctx.stroke();
	}else if(Stage2==4){
	ctx.beginPath();
	ctx.arc(X+W/2,Y+H/300*113,W/10*1.2,Math.PI*2,false);
	ctx.stroke();
	}else if(Stage2==5){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.lineTo(X+W/2,Y+H/1.5);
	ctx.stroke();
	}else if(Stage2==6){
	ctx.moveTo(X+W/2,Y+H/1.5);
	ctx.lineTo(X+W/10*3,Y+H/1.2);
	ctx.stroke();
	}else if(Stage2==7){
	ctx.moveTo(X+W/2,Y+H/1.5);
	ctx.lineTo(X+W/10*7,Y+H/1.2);
	ctx.stroke();
	}else if(Stage2==8){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.quadraticCurveTo(X+W/10*6,Y+H/30*14,X+W/10*7,Y+H/1.5);
	ctx.stroke();
	}else if(Stage2==9){
	ctx.moveTo(X+W/2,Y+H/2.4);
	ctx.quadraticCurveTo(X+W/2.5,Y+H/30*14,X+W/10*3,Y+H/1.5);
	ctx.stroke();
	ctx.beginPath();
	ctx.font = "50px Courier";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width/3*2+cnv.width/3/2,365);
	ctx.fill();
	gameOver++;
	}
}