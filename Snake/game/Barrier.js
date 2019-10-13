var barrier = [];

function drawBarrier(){
	ctx.beginPath();
	ctx.fillStyle = "black";
	for(let i = 0; i<barrier.length; i++){
		ctx.fillRect(barrier[i][0],barrier[i][1],block,block)
	}
}

function level_1(){
	barrier = [];
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	Part_Snake = [ 
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
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	level = 1;
}

function level_2(){
	Part_Snake = [
	{
		x:570,
		y:370
	},
	{
		x:570,
		y:380
	},
	{
		x:570,
		y:390
	}
	];
	Direction = 0; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 2;
	barrierPush();
}
function level_3(){
	Part_Snake = [
	{
		x:570,
		y:370
	},
	{
		x:570,
		y:380
	},
	{
		x:570,
		y:390
	}
	];
	Direction = 0; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 3;
	barrierPush();
}
function level_4(){
	Part_Snake = [
	{
		x:570,
		y:370
	},
	{
		x:570,
		y:380
	},
	{
		x:570,
		y:390
	}
	];
	Direction = 0; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 4;
	barrierPush();
}

function level_5(){
	Part_Snake = [
	{
		x:200,
		y:200
	},
	{
		x:190,
		y:200
	},
	{
		x:180,
		y:200
	}
	];
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 5;
	barrierPush();
}

function level_6(){
	Part_Snake = [
	{
		x:200,
		y:200
	},
	{
		x:190,
		y:200
	},
	{
		x:180,
		y:200
	}
	];
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 6;
	barrierPush();
}
// 150 || 240
// 170 || 210
function level_7(){
	Part_Snake = [
	{
		x:50,
		y:50
	},
	{
		x:50,
		y:40
	},
	{
		x:50,
		y:30
	}
	];
	Direction = 2; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 7;
	barrierPush();
}
function level_8(){
	Part_Snake = [
	{
		x:330,
		y:380
	},
	{
		x:320,
		y:380
	},
	{
		x:310,
		y:380
	}
	];
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 8;
	barrierPush();
}
// 170, 210
function level_9(){
	Part_Snake = [
	{
		x:330,
		y:380
	},
	{
		x:320,
		y:380
	},
	{
		x:310,
		y:380
	}
	];
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 9;
	barrierPush();
}
function level_10(){
	Part_Snake = [
	{
		x:330,
		y:380
	},
	{
		x:320,
		y:380
	},
	{
		x:310,
		y:380
	}
	];
	Direction = 1; // 0 = Top, 1 = Right,  2 = Bottom, 3 = Left;
	$('#Start').toggle(0);
	$('.available,.inaccessible').toggle(0);
	level = 10;
	barrierPush();
}

function barrierPush(){
	if(level >= 2){
		barrier = [];
		for(let b = 0; b<=590; b+=590){
			for(let a = 0; a<Height; a+=block){
				barrier.push([b,a]);
			}
		}
		if(level >= 3){
			barrier = [];
			for(let b = 90; b<=290; b+=200){
				for(let a = 100; a<=490; a+=block){
					barrier.push([a,b]);
				}
			}
			if(level >= 4){
				for(let b = 0; b<=590; b+=590){
					for(let a = 0; a<Height; a+=block){
						barrier.push([b,a]);
					}
				}
				if(level >= 5){
					for(let b = 20; b<=570; b+=550){
						for(let a = 20; a<=370; a+=block){
							barrier.push([b,a]);
						}
					}
					if(level >= 6){
						for(let b = 0; b<=390; b+=390){
							for(let a = 0; a<Width; a+=block){
								barrier.push([a,b]);
							}
						}						
						if(level >= 7){
							for(let c = 150; c<=440; c+=290){
								for(let b = 90; b<=170; b+=block){
									barrier.push([c,b]);
								}
								for(let a = 210; a<=290; a+=block){
									barrier.push([c,a]);
								}
							}
							if(level >= 8){
								for(let c = 290; c<=300; c+=block){
									for(let b = 0; b<=90; b+=block){
										barrier.push([c,b]);
									}
									for(let a = 290; a<Height; a+=block){
										barrier.push([c,a]);
									}
								}
								if(level >= 9){
									for(let c = 170; c<=210; c+=40){
										for(let b = 100; b<=150; b+=block){
											barrier.push([b,c]);
										}
										for(let a = 440; a<=490; a+=block){
											barrier.push([a,c]);
										}
									}
									if(level >= 10){
										for(let b = 100; b<Width/2; b+=block){
											barrier.push([b,40]);
											barrier.push([b,50]);
											barrier.push([b,340]);
											barrier.push([b,350]);
										}
										for(let a = 300; a<=490; a+=block){
											barrier.push([a,40]);
											barrier.push([a,50]);
											barrier.push([a,340]);
											barrier.push([a,350]);
										}
									}
								}
							}
						}
					}
				}
			}		
		}
	}
}