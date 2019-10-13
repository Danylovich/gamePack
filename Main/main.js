var cnv = document.getElementById('canvasSmile');
var ctx = cnv.getContext('2d');

var interval = null;
var x = cnv.width/2;
var y = 250;

var smile = new Image();
smile.src = "smile.png";

window.onload = () =>{
 	interval = setInterval(draw,1);
}

var xEye = 9;
var yEye = 9;

function draw(){
	ctx.clearRect(0,0,cnv.width,cnv.height);
	let drawBall = true;
	if((x>cnv.width/2-smile.width/2+52 && x<cnv.width-(cnv.width/2-smile.width/2+51)) && (y>cnv.height/2-smile.height/2+63 && y<cnv.height/2-smile.height/2+104)){
		drawBall = false;
	}
	if(drawBall){
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.fillStyle = "black";
		ctx.lineWidth = 2;
		ctx.arc(x,y,10,Math.PI*2,false);	
		ctx.fill();
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.arc(cnv.width/2-smile.width/2+64-0.25+xEye,cnv.height/2-smile.height/2+75-0.25+yEye,5,Math.PI*2,false);
	ctx.arc(cnv.width-(cnv.width/2-smile.width/2+64-0.25+17-xEye),cnv.height/2-smile.height/2+75-0.25+yEye,5,Math.PI*2,false);
	ctx.fill();
	ctx.drawImage(smile,cnv.width/2-100,cnv.height/2-100);
	let posYball = false;
	let n = 1;
	while(!posYball){
		if(y+10<cnv.height/7*n){
			posYball = true;
			yEye = 5+n;
		}else{
			n++;
		}
	}
	let posXball = false;
	let n2 = 1;
	while(!posXball){
		if(x+10<cnv.width/7*n2){
			posXball = true;
			xEye = 5+n2;
		}else{
			n2++;
		}
	}
}

cnv.onmousedown = function(event){
	if(event.offsetX+10<cnv.width && event.offsetX-10 > 0){
		x = event.offsetX;
	}
	if(event.offsetY+10<cnv.height && event.offsetY-10 > 0){
		y = event.offsetY;
	}
	cnv.onmousemove = function(event){
		if(event.offsetX+10<cnv.width && event.offsetX-10 > 0){
			x = event.offsetX;
		}
		if(event.offsetY+10<cnv.height && event.offsetY-10 > 0){
			y = event.offsetY;
		}
	}
	cnv.onmouseup = function(){
		cnv.onmousemove = null;
	}
}