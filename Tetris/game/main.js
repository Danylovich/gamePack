var cnv = document.getElementById('Canvas');
var ctx = cnv.getContext('2d');

var enter = true;
var score = 0;
var Timer = 300;
var block = 20;
var fors = false;
var moveRC = Math.floor(Math.random() * 7);
var moveTB = 0; 
var a = {
	TB: moveTB,
	RC: moveRC
};
var move = 0;
var newFigure = [];
var newrandom = 0;
var newrand = 0;
var random = 0;
var movefigure = [];
var n = true;
var clear = false;
var Permission_move = true;
var turnSpace = [];
var Handler = false;
$('.keys').toggle(0);

// var Top_Space = [
// 	[0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0],
// 	[0,0,0,0,0,0,0,0,0,0]
// ];

var Space = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

var figure = [];

function keyHandler( e ) {
	if(Handler){
  		switch ( e.keyCode ) {
  			case 87:
  			fors = false;
  			let turn_Left = false;
  			if(a.RC < 0){
				a.RC = 0;
				turn_Left = true;
			}

			let turn_Right = false;
			if(a.RC > 10-figure[0].length){
				a.RC = 10-figure[0].length;
				turn_Right = true; 
			}

			if(rand < 4){
				rand++;
			}else if(rand == 4){
				rand = 0;
			}
			switch(Turn){
				case 1: T(); break;
				case 2: two1(); break;
				case 3: two2(); break;
				case 4: square(); break;
				case 5: stick(); break;
				case 6: L1(); break;
				case 7: L2(); break;
			}
			let blockTurn = 0;
			for(let r = 0; r<figure.length; r++){
				turnSpace.push([]);
				for(let c = 0; c<figure[r].length; c++){
					turnSpace[r].push(Space[a.TB+r][a.RC+c]);
				}
			}
			for(let r1 = 0; r1<figure.length; r1++){
				for(let c1 = 0; c1<figure[r1].length; c1++){
					if(figure[r1][c1] == 1 && turnSpace[r1][c1] == 2){
						blockTurn++;
					}
				}
			}
			for(let r2 = 0; r2<figure.length; r2++){
				for(let c2 = 0; c2<figure.length; c2++){
					if(figure[r2][c2] == 0 && turnSpace[r2][c2] == 2){
						figure[r2][c2] = 2; 
					}
				}
			}
			if(blockTurn == 0){
				turnSpace = [];
				for(let r2 = 0; r2<figure.length; r2++){
					for(let c2 = 0; c2<figure[r2].length; c2++){
		  				Space[a.TB+r2][a.RC+c2] = figure[r2][c2];
					}
				}
			}else{
				if(rand == 0){
					rand = 4;
				}else{
					rand--;
				}
				switch(Turn){
					case 1: T(); break;
					case 2: two1(); break;
					case 3: two2(); break;
					case 4: square(); break;
					case 5: stick(); break;
					case 6: L1(); break;
					case 7: L2(); break;
  				}
  			}

  			if(turn_Right){
  				a.RC++;
  			}

  			if(turn_Left){
  				a.RC--;
  			}
  			turnSpace = [];
	  		fors = true;
	  		break;
  			case 83:
  				Timer = 50;
  			break;
  			case 65:
  			if(Permission_move){  			
  				let blockLeft = 0;
  				for(let r = 0; r<Space.length; r++){
  					if(Space[r][0] == 1){
  						blockLeft++;
  					}
  				}
  				for(let r1 = 0; r1 < Space.length; r1++) {
					for(let c1 = 0; c1 < Space[r1].length; c1++){
						if(Space[r1][c1] == 1 && Space[r1][c1-1] == 2){
							blockLeft++;
						}
					}
				}
				if(blockLeft == 0){	
					a.RC--;		
	 	 			moveLeft();
				}
  			}
			break;
  			case 68:
  			if(Permission_move){	
  				let blockRight = 0;
  				for(let r = 0; r<Space.length; r++){
  					if(Space[r][Space[0].length-1] == 1){
						blockRight++;
  					}
  				}
  				for(let r1 = 0; r1 < Space.length; r1++) {
					for(let c1 = 0; c1 < Space[r1].length; c1++){
						if(Space[r1][c1] == 2 && Space[r1][c1-1] == 1){
							blockRight++;
						}
					}
				}
				if(blockRight == 0){
					a.RC++;			
  					moveRight();
				}
  			}
  			break;
  			// case 83:
  			// 	Timer = 10;
  			// break;
  		}
  	}
  	if(e.keyCode == 13){
			if(enter){
				Start();
			}
  	}
}

function keyHandlerUp(e){
	if(Handler){
		switch ( e.keyCode ) {
			case 83:
				Timer = 300;
			break;
		}
	}
}

function drawblock(x,y){
	ctx.strokeStyle = 'black';
	ctx.fillStyle = 'blue';
	ctx.fillRect(x,y,block,block);
	ctx.strokeRect(x,y,block,block);
	ctx.stroke();
}

function drawSpace(x,y){
	ctx.strokeStyle = 'black';
	ctx.strokeRect(x,y,block,block);
	ctx.stroke();
}

function randomfunction(){
	newrandom = Math.floor(Math.random() * 7);
}

function newfigure(){
	let newsrandom = Math.floor(Math.random() * 7);
	newrandom = newsrandom;
	switch(newsrandom){
		case 0: newT(); break;
		case 1: newtwo1(); break;
		case 2: newtwo2(); break;
		case 3: newsquare(); break;
		case 4: newstick(); break;
		case 5: newL1(); break;
		case 6: newL2(); break;
	}
	if(newFigure[0].length < 4){
		s = 0;
	}else{
		s = 10;
	}
	Score();
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "20px solid grey";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Наступна фігура",cnv.width/2+cnv.width/4,165+(newFigure[0].length+1)*block);
	ctx.fill();
	for(let r = 0; r<newFigure.length; r++){
		for(let c = 0; c<newFigure[r].length; c++){
			newrand = rand;
			var cx = 285+c*block-s;
			var cy = 185+r*block-s;
			drawSpace(cx,cy);
			switch(newFigure[r][c]){
				case 1: drawblock(cx,cy); break;
			}
		}
	}
}


function moveLeft(){
	ctx.clearRect(0,0,220,cnv.height);
	for(let c = 0; c<Space[0].length; c++){
		for(let r = 0; r<Space.length; r++){
			if(Space[r][c] == 1){
				Space[r][c] = 4;
			}
		}
	}
	for(let c1 = 0; c1<Space[0].length; c1++){
		for(let r1 = 0; r1<Space.length; r1++){
			if(Space[r1][c1] == 4){
				Space[r1][c1] = 0;
				Space[r1][c1-1] = 1;
			}
		}
	}
	draw();
}

function moveRight(){
	ctx.clearRect(0,0,220,cnv.height);
	for(let c = 0; c<Space[0].length; c++){
		for(let r = 0; r<Space.length; r++){
			if(Space[r][c] == 1){
				Space[r][c] = 4;
			}
		}
	}
	for(let c1 = Space[0].length-1; c1>=0; c1--){
		for(let r1 = Space.length-1; r1>=0; r1--){
			if(Space[r1][c1] == 4){
				Space[r1][c1] = 0;
				Space[r1][c1+1] = 1;
			}
		}
	}
	draw();
}

function movebottom(){	
	move++;
	let blockBottom = 0;
	for(let c = 0; c<Space[Space.length-1].length; c++){
		if(Space[Space.length-1][c] == 1){			
			blockBottom++;
		}
	}
	for (let r2 = 0; r2 < Space.length; r2++) {
		for(let c2 = 0; c2 < Space[r2].length; c2++){
			if(Space[r2][c2] == 2 && Space[r2-1][c2] == 1){
				blockBottom++;
			}
		}
	}
	if(blockBottom == 0){
		a.TB++;
		for (let r = 0; r < Space.length; r++) {
			for(let c = 0; c < Space[r].length; c++){
				if(Space[r][c] == 1){
					Space[r][c] = 4;
				}
			}
		}
		for(let r1 = Space.length-1; r1 >=0; r1--){
			for(let c1 = Space[r1].length; c1 >=0;  c1--){
				if(Space[r1][c1] == 4){
					Space[r1][c1] = 0;
					Space[r1+1][c1] = 1;
				}
			}
		}
	}else if(blockBottom > 0){
	Permission_move = false;
		for(let r2 = 0; r2<Space.length; r2++){
			for(let c2 = 0; c2<Space[r2].length; c2++){
				if(Space[r2][c2] == 1){
					Space[r2][c2] = 2;
				}
				let Line = 0;
				for(let r3 = 1; r3<Space.length; r3++){
					for(let c3 = 0; c3<Space[r3].length; c3++){
						if(Space[r3][c3] == 2){
							Line++;
						}
					}
					if(Line == 10){
						Space.splice(Space.indexOf(Space[r3]),1);
						Space.unshift([0,0,0,0,0,0,0,0,0,0]);
						score+=10;
					}else{
						Line = 0;
					}
				}
				move = 0;
				n = true;
				fors = true;
				clear = true;
				rand = Math.floor(Math.random()*4); 
			}
		}
	}
}

function draw(){
	for(var r = 0; r<Space.length; r++){
		for(var c = 0; c<Space[r].length; c++){
			var cx = 10+c*block;
			var cy = 10+r*block-60; 
			if(n){
				moveRC = Math.floor(Math.random() * 7);	
				a = {
					TB: moveTB,
					RC: moveRC
				};
				fors = true;
				random = newrandom;
				switch(random){
					case 0: T(); break;
					case 1: two1(); break;
					case 2: two2(); break;
					case 3: square(); break;
					case 4: stick(); break;
					case 5: L1(); break;
					case 6: L2(); break;
				}
				newfigure();
				n = false;
				Permission_move = true;
			}
			drawSpace(cx,cy);
			switch(Space[r][c]){
				case 1: drawblock(cx,cy); break;
				case 2: drawblock(cx,cy); break;
			}
			ctx.clearRect(0,0,220,9);
			for(let c1 = 0; c1<Space[0].length; c1++){
				if(Space[3][c1] == 2){
					gameOver();
				}
			}
		}
	}
}

function draws(){
	if(clear == false){
		ctx.clearRect(0,0,220,cnv.height);
	}else{
		ctx.clearRect(0,0,cnv.width,cnv.height);
		clear = false;
	}
	draw();
	movebottom();
}

var Tick = 0;

function drawAnimation(){
	Tick++;
	if(Tick % Timer == 0){	
		draws();
	}
}

function Score(){
	ctx.fillStyle = "black";
	ctx.font = "20px solid grey";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText("Рахунок: " + score,cnv.width/2+cnv.width/4,160-s);
	ctx.fill();
}

for(var r = 0; r<Space.length; r++){
	for(var c = 0; c<Space[r].length; c++){
		var cx = 10+c*block;
		var cy = 10+r*block-60;	
		drawSpace(cx,cy);
		ctx.clearRect(0,0,220,9);		
	}
}

var Interval = null;
var s = 0;

function Start(){
	ctx.clearRect(0,0,cnv.width,cnv.height);
	$('#start').toggle(0);
	$('.keys').toggle(0);
	enter = false;
	Handler = true;
	randomfunction();
	draws();
	Interval = setInterval(drawAnimation,1);
}

function gameOver(){
	clearInterval(Interval);
	moveRC = Math.floor(Math.random() * 7);
	Timer = 300;
	block = 20;
	fors = false;
	moveTB = 0; 
	a = {
		TB: moveTB,
		RC: moveRC
	};
	move = 0;
	newFigure = [];
	newrandom = 0;
	newrand = 0;
	random = 0;
	movefigure = [];
	clear = false;
	Permission_move = true;
	turnSpace = [];
	Handler = false;
	figure = [];
	Tick = 0;
	s = 0;
	Space = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
	];
	rand = Math.floor(Math.random()*4);
	Turn = 0;
	Interval = null;
	$('#start').text('Зіграти ще');
	enter = true;
	$('#start').toggle(0);
	$('#start').css('margin-top', '20px');
	$('#start').css('left', '70px');
	$('.keys').toggle(0);
	setTimeout(function(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		for(var r = 0; r<Space.length; r++){
			for(var c = 0; c<Space[r].length; c++){
				var cx = 10+c*block;
				var cy = 10+r*block-60;	
				drawSpace(cx,cy);
				ctx.clearRect(0,0,220,9);
				ctx.beginPath();
				ctx.fillStyle = "green";
				ctx.font = "20px Tahoma";
				ctx.textAlign = "center";
				ctx.textBaseline = "top";
				ctx.fillText("Ваш рахунок: " + score,320,175);
				ctx.fill();
				n = true;
			}	
		}
	},1);
}