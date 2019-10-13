var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
var cnv_1 = document.getElementById('auxiliaryCanvas');
var ctx_1 = cnv_1.getContext('2d');
var n = document.getElementById('k');
var name = 1;
var name_1 = null;
var name_2 = null;
var scorePlayer_1 = 0;
var scorePlayer_2 = 0;
var c_z = true;
var Width = cnv.width;
var croses_zeros = true;

var Place = [
	[0,0,0],
	[0,0,0],
	[0,0,0]
];

n.focus();
$('div').toggle(0);

ctx.beginPath();
ctx.moveTo(Width/3,0);
ctx.lineTo(Width/3,Width);
ctx.moveTo(Width/1.5,0);
ctx.lineTo(Width/1.5,Width);
ctx.moveTo(0,Width/3);
ctx.lineTo(Width,Width/3);
ctx.moveTo(0,Width/1.5);
ctx.lineTo(Width,Width/1.5);
ctx.stroke();

function element_a(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(10,10);
		ctx.lineTo(90,90);
		ctx.moveTo(90,10);
		ctx.lineTo(10,90);
		ctx.stroke();
		Place[0][0] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(50,50,40,Math.PI*2,false)
		ctx.stroke();
		Place[0][0] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#a').toggle(0);
}
function element_b(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(110,10);
		ctx.lineTo(190,90);
		ctx.moveTo(190,10);
		ctx.lineTo(110,90);
		ctx.stroke();
		Place[0][1] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(150,50,40,Math.PI*2,false)
		ctx.stroke();
		Place[0][1] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#b').toggle(0);

}
function element_c(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(210,10);
		ctx.lineTo(290,90);
		ctx.moveTo(290,10);
		ctx.lineTo(210,90);
		ctx.stroke();
		Place[0][2] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(250,50,40,Math.PI*2,false)
		ctx.stroke();
		Place[0][2] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#c').toggle(0);
}
function element_d(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(10,110);
		ctx.lineTo(90,190);
		ctx.moveTo(90,110);
		ctx.lineTo(10,190);
		ctx.stroke();
		Place[1][0] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(50,150,40,Math.PI*2,false)
		ctx.stroke();
		Place[1][0] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#d').toggle(0);
}
function element_e(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(110,110);
		ctx.lineTo(190,190);
		ctx.moveTo(190,110);
		ctx.lineTo(110,190);
		ctx.stroke();
		Place[1][1] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(150,150,40,Math.PI*2,false)
		ctx.stroke();
		Place[1][1] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#e').toggle(0);
}
function element_f(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(210,110);
		ctx.lineTo(290,190);
		ctx.moveTo(290,110);
		ctx.lineTo(210,190);
		ctx.stroke();
		Place[1][2] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(250,150,40,Math.PI*2,false)
		ctx.stroke();
		Place[1][2] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#f').toggle(0);
}
function element_g(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(10,210);
		ctx.lineTo(90,290);
		ctx.moveTo(90,210);
		ctx.lineTo(10,290);
		ctx.stroke();
		Place[2][0] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(50,250,40,Math.PI*2,false)
		ctx.stroke();
		Place[2][0] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#g').toggle(0);
}
function element_h(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(110,210);
		ctx.lineTo(190,290);
		ctx.moveTo(190,210);
		ctx.lineTo(110,290);
		ctx.stroke();
		Place[2][1] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(150,250,40,Math.PI*2,false)
		ctx.stroke();
		Place[2][1] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#h').toggle(0);
}
function element_i(){
	if(croses_zeros){
		ctx.beginPath();
		ctx.moveTo(210,210);
		ctx.lineTo(290,290);
		ctx.moveTo(290,210);
		ctx.lineTo(210,290);
		ctx.stroke();
		Place[2][2] = 1;
	}else{
		ctx.beginPath();
		ctx.arc(250,250,40,Math.PI*2,false)
		ctx.stroke();
		Place[2][2] = 2;
	}
	audit();
	croses_zeros = !croses_zeros;
	$('#i').toggle(0);
}
 
function audit(){
		let x = 0;
		let o = 0;
//
		for(let a = 0; a<Place[0].length; a++){
			if(Place[0][a] == 1){
				x++;
			}else if(Place[0][a] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let b = 0; b<Place[1].length; b++){
			if(Place[1][b] == 1){
				x++;
			}else if(Place[1][b] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let c = 0; c<Place[2].length; c++){
			if(Place[2][c] == 1){
				x++;
			}else if(Place[2][c] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let d = 0; d<Place.length; d++){
			if(Place[d][0] == 1){
				x++;
			}else if(Place[d][0] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let e = 0; e<Place.length; e++){
			if(Place[e][1] == 1){
				x++;
			}else if(Place[e][1] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let f = 0; f<Place.length; f++){
			if(Place[f][2] == 1){
				x++;
			}else if(Place[f][2] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		for(let g = 0; g<Place.length; g++){
			if(Place[g][g] == 1){
				x++;
			}
			if(Place[g][g] == 2){
				o++;
			}
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		if(Place[0][2] == 1){
			x++;
		}
		if(Place[1][1] == 1){
			x++;
		}
		if(Place[2][0] == 1){
			x++;
		}
		if(Place[0][2] == 2){
			o++;
		}
		if(Place[1][1] == 2){
			o++;
		}
		if(Place[2][0] == 2){
			o++;
		}
		if(o == 3){
			O();
			return;
		}else{
			o = 0;
		}
		if(x == 3){
			X();
			return;
		}else{
			x = 0;
		}
//
		let noOne = 0;
		for(let r1 = 0; r1<Place.length; r1++){
			for(let c1 = 0; c1<Place[r1].length; c1++){
				if(Place[r1][c1] != 0){
					noOne++;
				}
			}
		}
		if(noOne == 9){
			ctx.clearRect(0,0,Width,Width);
			ctx.beginPath();
			ctx.moveTo(Width/3,0);
			ctx.lineTo(Width/3,Width);
			ctx.moveTo(Width/1.5,0);
			ctx.lineTo(Width/1.5,Width);
			ctx.moveTo(0,Width/3);
			ctx.lineTo(Width,Width/3);
			ctx.moveTo(0,Width/1.5);
			ctx.lineTo(Width,Width/1.5);
			ctx.stroke();
			Place = [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			];
			setTimeout(()=>{
				$('div').fadeIn(0);
				if(c_z){
					croses_zeros = false;
					c_z = !c_z;
				}else{
					croses_zeros = true;
					c_z = !c_z;
				}
			},100);
		}
}

var nm = 0;
function name_button(){
	let Name = n.value;
	if(Name == 0 || Name > 8){
		alert('Введіть менше 9 символів і більше 0 символів');
		return;
	}
	if(name == 2){
		name_2 = Name;
		n.value = null;
		$('#j').toggle(0);
		$('#k').toggle(0);
		$('#l').toggle(0);
		$('div').toggle(0);
		ctx_1.clearRect(0,0,cnv_1.width,cnv_1.height);
		ctx_1.beginPath();
		ctx_1.fillStyle = "black";
		ctx_1.font = "20px solid Tahoma";
		ctx_1.textAlign = "left";
		ctx_1.textBaseline = "top";
		ctx_1.fillText(name_2 + ": " + scorePlayer_2,10,85);
		ctx_1.fillText(name_1 + ": " + scorePlayer_1,10,35);
		ctx_1.fill();
	}
	if(name == 1){
		$('#j').text("Як вас звати гравець 2");
		name_1 = Name;
		n.value = null;
		name++;
	}
	nm++;
	n.focus();
}

function X(){
	ctx_1.clearRect(0,0,cnv_1.width,cnv_1.height);
	ctx.clearRect(0,0,Width,Width);
	ctx.beginPath();
	ctx.moveTo(Width/3,0);
	ctx.lineTo(Width/3,Width);
	ctx.moveTo(Width/1.5,0);
	ctx.lineTo(Width/1.5,Width);
	ctx.moveTo(0,Width/3);
	ctx.lineTo(Width,Width/3);
	ctx.moveTo(0,Width/1.5);
	ctx.lineTo(Width,Width/1.5);
	ctx.stroke();
	scorePlayer_1++;
	ctx_1.beginPath();
	ctx_1.fillStyle = "black";
	ctx_1.font = "20px solid black";
	ctx_1.textAlign = "left";
	ctx_1.textBaseline = "top";
	ctx_1.fillText(name_1 + ": " + scorePlayer_1,10,35);
	ctx_1.fillText(name_2 + ": " + scorePlayer_2,10,85);
	ctx_1.fill();
	Place = [
		[0,0,0],
		[0,0,0],
		[0,0,0]
	];
	setTimeout(()=>{
		$('div').fadeIn(0);
		croses_zeros = true;
	},100);
}

function O(){
	ctx_1.clearRect(0,0,cnv_1.width,cnv_1.height);
	ctx.clearRect(0,0,Width,Width);
	ctx.beginPath();
	ctx.moveTo(Width/3,0);
	ctx.lineTo(Width/3,Width);
	ctx.moveTo(Width/1.5,0);
	ctx.lineTo(Width/1.5,Width);
	ctx.moveTo(0,Width/3);
	ctx.lineTo(Width,Width/3);
	ctx.moveTo(0,Width/1.5);
	ctx.lineTo(Width,Width/1.5);
	ctx.stroke();
	scorePlayer_2++;
	ctx_1.beginPath();
	ctx_1.fillStyle = "black";
	ctx_1.font = "20px solid black";
	ctx_1.textAlign = "left";
	ctx_1.textBaseline = "top";
	ctx_1.fillText(name_1 + ": " + scorePlayer_1,10,35);
	ctx_1.fillText(name_2 + ": " + scorePlayer_2,10,85);
	ctx_1.fill();
	Place = [
		[0,0,0],
		[0,0,0],
		[0,0,0]
	];
	setTimeout(()=>{
		$('div').fadeIn(0);
		croses_zeros = false;
	},100)
}

function keyHandler(e){
	switch(e.keyCode){
		case 13:
			if(nm<2){
				name_button();
			}
		break;
	}
}