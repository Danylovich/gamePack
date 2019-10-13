var rand = Math.floor(Math.random()*4); 
var Turn = 0;
function T(){
	// rand = Math.floor(Math.random()*4);
	Turn = 1;
	switch(rand){
		case 0:figure = [
			[0,1,0],
			[1,1,1],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,1,0],
			[0,1,1],
			[0,1,0]
		];break;
		case 2:figure = [
			[0,0,0],
			[1,1,1],
			[0,1,0]
		];break;
		case 3:figure = [
			[0,1,0],
			[1,1,0],
			[0,1,0]
		];break; 
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
			Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newT(){
	newFigure = [
		[0,1,0],
		[1,1,1],
		[0,0,0]
	];
}

function two1(){
	// rand = Math.floor(Math.random()*4);
	Turn = 2;
	switch(rand){
		case 0:figure = [
			[1,1,0],
			[0,1,1],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,0,1],
			[0,1,1],
			[0,1,0]
		];break;
		case 2:figure = [
			[0,0,0],
			[1,1,0],
			[0,1,1]
		];break;
		case 3:figure = [
			[0,1,0],
			[1,1,0],
			[1,0,0]
		];break;
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newtwo1(){
	newFigure = [
		[1,1,0],
		[0,1,1],
		[0,0,0]
	];
}

function two2(){
	// rand = Math.floor(Math.random()*4);
	Turn = 3;
	switch(rand){
		case 0:figure = [
			[0,1,1],
			[1,1,0],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,1,0],
			[0,1,1],
			[0,0,1]
		];break;
		case 2:figure = [
			[0,0,0],
			[0,1,1],
			[1,1,0]
		];break;
		case 3:figure = [
			[1,0,0],
			[1,1,0],
			[0,1,0]
		];break;
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newtwo2(){
	newFigure = [
		[0,1,1],
		[1,1,0],
		[0,0,0]
	];
}

function square(){
	// rand = Math.floor(Math.random()*4);
	Turn = 4;
	switch(rand){
		case 0:figure = [
			[1,1,0],
			[1,1,0],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,1,1],
			[0,1,1],
			[0,0,0]
		];break;
		case 2:figure = [
			[0,0,0],
			[0,1,1],
			[0,1,1]
		];break;
		case 3:figure = [
			[0,0,0],
			[1,1,0],
			[1,1,0]
		];break;
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newsquare(){
	newFigure = [
		[1,1,0],
		[1,1,0],
		[0,0,0]
	];
}

function stick(){
	// rand = Math.floor(Math.random()*4);	
	Turn = 5;
	switch(rand){
		case 0:figure = [
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		];break;
		case 1:figure = [
			[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0],
			[0,0,1,0]
		];break;
		case 2:figure = [
			[0,0,0,0],
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0]
		];break;
		case 3:figure = [
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0],
			[0,1,0,0]
		];break;
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newstick(){
	newFigure = [
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0]
	];
}

function L1(){
	// rand = Math.floor(Math.random()*4);
	Turn = 6;
	switch(rand){
		case 0:figure = [
			[0,0,1],
			[1,1,1],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,1,0],
			[0,1,0],
			[0,1,1]
		];break;
		case 2:figure = [
			[0,0,0],
			[1,1,1],
			[1,0,0]
		];break;
		case 3:figure = [
			[1,1,0],
			[0,1,0],
			[0,1,0]
		];break;
	}
	if(fors){	
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newL1(){
	newFigure = [
		[0,1,0],
		[0,1,0],
		[0,1,1]
	];
}

function L2(){
	// rand = Math.floor(Math.random()*4);
	Turn = 7;
	switch(rand){
		case 0:figure = [
			[1,0,0],
			[1,1,1],
			[0,0,0]
		];break;
		case 1:figure = [
			[0,1,1],
			[0,1,0],
			[0,1,0]
		];break;
		case 2:figure = [
			[0,0,0],
			[1,1,1],
			[0,0,1]
		];break;
		case 3:figure = [
			[0,1,0],
			[0,1,0],
			[1,1,0]
		];break;
	}
	if(fors){
		for(let r = 0; r<figure.length; r++ ){
			for(let c = 0; c<figure[r].length; c++){		
				Space[moveTB+r][moveRC+c] = figure[r][c];
			}	
		}
	}
}

function newL2(){
	newFigure = [
		[0,1,0],
		[0,1,0],
		[1,1,0]
	];
}