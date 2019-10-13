// Функції jquery для зникання спочатку непотрібних елементів HTML
$('p').fadeOut(0);
// $('#Message').fadeIn(0);
$('input').fadeOut(0);
$('div').fadeOut(0);
$('#button_2').fadeOut(0);
$('#button_hint').fadeOut(0);
$('#button_3').fadeOut(0);
$('#button_4').fadeOut(0);
$('#button_5').fadeOut(0);
$('#button_z').fadeOut(0);
$('#button_word').fadeOut(0);
$('#p1').fadeIn(0);
$('#a1').fadeIn(0);
$('#Cansel').fadeOut(0);
// 

function Cancel(){
	$('#Cansel').fadeIn(0);
	$('#MyCanvas').fadeOut(0);
	$('p').fadeOut(0);
	$('input').fadeOut(0);
	$('button').fadeOut(0);
}

function Pause(){
	$('#block_Pause').fadeIn(0);
	$('#Pause').fadeOut(0);
	$('#div_a').fadeIn(0);
	clearInterval(T);
}

function divb(){
	$('#div_a').fadeOut(0);
	$('#Pause').fadeIn(0);
	$('#block_Pause').fadeOut(0);
	T = setInterval(Timer,1000);		
}

function ab(){
	divb();
}

// DOM елементи
var n1 = document.getElementById('a1');
var n2 = document.getElementById('a2');
var n3 = document.getElementById('a3');
var w = document.getElementById('a4');
var na1 = document.getElementById('a5');
var na2 = document.getElementById('a6');
var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
//

function Timer(){
	// console.log(Tick_min + '|' + Tick_Sec);
	Tick_Sec++;
	if(Tick_Sec%60==0){
		Tick_Sec = 0;
		Tick_min++;
	}
}

	var enter = 0;
	var prom_1 = null;
	var error = null;
	var Description = null;
	var T = null;
	var Tick_min = 0;
	var Tick_Sec = 0;
	var Height = cnv.height;
	var Width = cnv.width
	var Stage1 = 0;
	var Stage2 = 0;
	var prom = null;
	var word = null;
	var Letters = [];
	var answerArray = [];
	var a = [];
	var remainingLetters = 0;
	var guess = null;
	var word_input = null;
	var b = null;
	var gameOver = 0;

	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.moveTo(Width/3,0);
	ctx.lineTo(Width/3,Height);
	ctx.moveTo(Width/3*2,0);
	ctx.lineTo(Width/3*2,Height);
	ctx.stroke();

	T = setInterval(Timer,1000);

	// Функції onclick для "кнопки першого гравця"
	n1.focus();
function b1(){
	var name1 = n1.value;
	var name2 = n2.value;
	var name3 = n3.value;
	if(name1.length<1 || name1.length>8){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Будь ласка введіть своє ім'я в якого менше ніж 8 символів та більше ніж 1 символ!");	
		},1);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		n1.value = null;
		return;
	};
	ctx.font = "25px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(name1,Width/3/2,0);
	ctx.fill();
	$('#p1').fadeOut(0);
	$('#a1').fadeOut(0);
	$('#button_1').fadeOut(0);
	$('#p2').fadeIn(0);
	$('#a2').fadeIn(0);
	$('#button_2').fadeIn(0);
	enter++;
	n2.focus();
}
// 

// Функції onclick для "кнопки другого гравця"
function b2(){
	var name2 = n2.value;
	var name1 = n1.value;
	var name3 = n3.value;
	if(name2.length<1 || name2.length>8){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Будь ласка введіть своє ім'я в якого менше ніж 8 символів та більше ніж 1 символ!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		n2.value = null;
		return;
	};
	if(name2 == name1){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Уже було введенно таке ім'я. Будь ласка введіть інше ім'я!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		n2.value = null;
		return;
	};
	ctx.font = "25px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(name2,Width/2,0);
	ctx.fill();
	$('#p2').fadeOut(0);
	$('#a2').fadeOut(0);
	$('#button_2').fadeOut(0);
	$('#p3').fadeIn(0);
	$('#a3').fadeIn(0);
	$('#button_3').fadeIn(0);
	n3.focus();
	enter++;		
}
// 

// Функції onclick для "кнопки третього гравця"
function b3(){
	var name3 = n3.value;
	var name1 = n1.value;
	var name2 = n2.value;
	if(name3.length<1 || name3.length>8){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Уже було введенно таке ім'я. Будь ласка введіть інше ім'я!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		n3.value = null;
		return;
	};
	if(name3 == name1 || name3 == name2){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Уже було введенно таке ім'я. Будь ласка введіть інше ім'я!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		n3.value = null;
		return;
	};
	ctx.font = "25px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(name3,Width-Width/3/2,0);
	ctx.fill();
	$('#p3').fadeOut(0);
	$('#a3').fadeOut(0);
	$('#button_3').fadeOut(0);
	$('#button_z').fadeIn(0);
	enter++;
}
// 

function bz(){
	var name1 = n1.value;
	$('#button_z').fadeOut(0);
	$('#a4').fadeIn(0);
	$('#p4').fadeIn(0);
	$('#a5').fadeIn(0);
	$('#button_4').fadeIn(0);
	var prom = prompt("Загадайте слово "+name1);
	while(prom === null){
		prom = prompt("Загадайте слово "+name1);
	}
	while(prom.length <= 1 || prom.length>15){
		prom = prompt("Загадайте слово "+name1);
	while(prom === null){
			prom = prompt("Загадайте слово "+name1);
		}
	}
	prom_1 = prompt("Коротко опишіть слово " + name1);
	while(prom_1 === null){
		prom_1 = prompt("Коротко опишіть слово " + name1);
	}
	while(prom_1.length > 90 || prom_1.length<=6){
		prom_1 = prompt("Коротко опишіть слово " + name1);
	while(prom_1 === null){
			prom_1 = prompt("Коротко опишіть слово " + name1);
		}
	}
	Description = prom_1;
	word = prom;
	$('#button_hint').fadeIn(0);
	$('#label_a').text(Description.substring(0,30));
	$('#label_b').text(Description.substring(30,60));
	$('#label_c').text(Description.substring(60,90));
	for(let i = 0; i < word.length; i++){
		a[i] = "_";
		// if(word[i]=" "){
		// 	a[i]=" ";
		// }
	}
	remainingLetters = word.length;
	ctx.font = "50px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Загадав слово",Width/3/2,Height/2);
	ctx.fill();
	answerArray = a.join("");
	word_input = answerArray;
	for(let pr = 0; pr<word.length; pr++){
		if(word[pr] == " "){
			word_input = replaceAt(word_input,pr,"⊗");
			remainingLetters--;
		}
	}
	w.value = word_input;
	na1.focus();
	enter++;
}

function b4(){
	var name2 = n2.value;
	var name3 = n3.value;
	var name1 = n1.value;
	let correctLetter = false;
	let f = false;
	guess = na1.value;
	if(guess.length != 1){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Ввдіть будь ласка тільки 1 літеру!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		return;
	}else if(guess.length == 1){
		for(var i = 0; i < word.length; i++){
			if((word[i] === guess || word[i].toLowerCase()==guess || word[i].toUpperCase()==guess) && word_input[i] != guess){
				word_input = replaceAt(word_input,i,guess);
				w.value = word_input;
				remainingLetters--;
				correctLetter = true;
			}
			if(word_input[i] == guess){
				f = true;
			}
		}
		if(remainingLetters==0){
			setTimeout(end_game(1),1);
		}
		if(f){
			return;
		}
		if(correctLetter === false){
			Stage1++;
			draw1(Width/2-50,30,100,300);
			$('#a5').fadeOut(0);
			$('#button_4').fadeOut(0);
			if(gameOver!=2){
				$('#a6').fadeIn(0);
				$('#button_5').fadeIn(0);
			}else if(gameOver==2){
				$('#p4').fadeOut(0);
				$('#p5').fadeIn(0);
				w.value = word;
				setTimeout(end_game(3),1);
			}
		}
	}
	na1.value = null;
	na2.focus();
	enter++;
}

function b5(){
	var name3 = n3.value;
	var name2 = n2.value;
	var name1 = n1.value;
	let correctLetter = false;
	let f = false;
	guess = na2.value;
	if(guess.length != 1){
		setTimeout(function(){
			$('#Message').fadeIn(0);
			$('#Message').text("Ввдіть будь ласка тільки 1 літеру!");	
		},0);
		setTimeout(function(){
			$('#Message').fadeOut(0);
		},3000);
		return;
	}else if(guess.length == 1){
		for(var i = 0; i < word.length; i++){
			if((word[i] === guess || word[i].toLowerCase()==guess || word[i].toUpperCase()==guess) && word_input[i] != guess){
					word_input = replaceAt(word_input,i,guess);
					w.value = word_input;
					remainingLetters--;				
					correctLetter = true;
			}
			if(word_input[i] == guess){
				f = true;
			}
		}
		if(remainingLetters==0){
			setTimeout(end_game(2),1);
		}
		if(f){
			return;
		}
		if(correctLetter === false){
			Stage2++;
			draw2(Width/3*2+Width/3/2-50,30,100,300);
			$('#a6').fadeOut(0);
			$('#button_5').fadeOut(0);
			if(gameOver!=2){
				$('#a5').fadeIn(0);
				$('#button_4').fadeIn(0);
			}else if(gameOver==2){
				$('#p4').fadeOut(0);
				$('#p5').fadeIn(0);
				w.value = word;
				setTimeout(end_game(3),1);
			}
		}
	}
	na2.value = null;
	na1.focus();
	enter--;
}

function replaceAt(string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 1);
}

function end_game(a){
	enter = -1;
	var name3 = n3.value;
	var name2 = n2.value;
	var name1 = n1.value;
	$('label').fadeOut(0);
	$('div').fadeOut(0);
	$('canvas').fadeOut(0);
	$('input').fadeOut(0);
	$('button').fadeOut(0);
	$('img').fadeOut(0);
	$('p').fadeOut(0);
	$('#Conclusion').fadeIn(1);
	$('#Conc_p').fadeIn(1);
	$('#time').fadeIn(1);
	$('#div_p_1').fadeIn(1);
	$('#div_p_2').fadeIn(1);
	$('#div_p_3').fadeIn(1);
	if(a == 1){
		if(Stage2 != 9){
			$('#div_p_1').text('1 місце ' + name2);
			$('#div_p_2').text('2 місце ' + name3);
			$('#div_p_3').text('3 місце ' + name1);
		}else{
			$('#div_p_1').text('1 місце ' + name2);
			$('#div_p_2').text('2 місце ' + name1);					
			$('#div_p_3').text('3 місце ' + name3);
		}	
	}
	if(a == 2){
		if(Stage1 != 9){
			$('#div_p_1').text('1 місце ' + name3);
			$('#div_p_2').text('2 місце ' + name2);
			$('#div_p_3').text('3 місце ' + name1);
		}else{
			$('#div_p_1').text('1 місце ' + name3);
			$('#div_p_2').text('2 місце ' + name1);					
			$('#div_p_3').text('3 місце ' + name2);
		}
	}
	if(a == 3){
		$('#div_p_1').text('1 місце ' + name1);
		$('#div_p_2').text('2 місце ' + name2);
		$('#div_p_3').text('2 місце ' + name3);
	}
	$('#time').fadeIn(1).text(Tick_min + ' хв. ' + Tick_Sec + ' сек. гри');
	clearInterval(T);
	$('#Conclusion').append('<a href="./../Gallows.html" id="Menu">Меню</a>');
}

var s = 0;
function b_hint() {
	if(s == 0){
		s = 1;
	$('#hint').fadeIn(0);
	if(prom_1.length < 31){		
		$('#label_a').fadeIn(0);
	}else if((prom_1.length < 61) && (prom_1.length > 30)){
		$('#label_a').fadeIn(0);
		$('#label_b').fadeIn(0);
	}else if((prom_1.length < 91) && (prom_1.length < 60)){
		$('#label_a').fadeIn(0);
		$('#label_b').fadeIn(0);
		$('#label_c').fadeIn(0);
	}	
	$('#button_hint').text('Підказка вкл.');
	} else{
		s = 0;
	$('#hint').fadeOut(0);
	$('#label_a').fadeOut(0);
	$('#label_b').fadeOut(0);
	$('#label_c').fadeOut(0);
	$('#button_hint').text('Підказка викл.');
	}
}

function keyHandler( e ){
	switch( e.keyCode ){
		case 13: keyEnter(); break;
	}
}

function keyEnter(){
	if(enter == 0){
		b1();		
	}else if(enter == 1){
		b2();		
	}else if(enter == 2){
		b3();
	}else if(enter == 3){
		bz();
	}else if(enter == 4){
		b4();
	}else if(enter == 5){
		b5();
	}
}
