// Параметри полотна 
var cnv = document.getElementById('MyCanvas');
var ctx = cnv.getContext('2d');
//

document.getElementById('start').style.display = 'none';

var animation = null; // змінна для сетІнтервалу
var enter = false; // Змінна для перевірки чи буде працювати клавіша ентер чи ні(вона виконує функцію кнопки старту)

var score = 0; // Рахунок гри(скільки разів куб стрибнув на різні платформи)
var bestScore = 0; // Найкращий рахунок з всіх зігратих ігор(висвічується коли гравець програв) 

// Все пов'язане з фоном гри
var bgImage = new Image(); // Зоображення фону
bgImage.src = "image/bgImage.png";  // Зоображення фону
//

// Все пов'язане з платформами 
var platform = new Image(); //Зоображення платформи
var platform_b1 = new Image(); // 1 зоображення з тріщинами в платформі
var platform_b2 = new Image(); // 2 зоображення з тріщинами в платформі
var platform_b3 = new Image(); // 3 зоображення з тріщинами в платформі
platform.src = "image/platform.png"; //Зоображення платформи
platform_b1.src = "image/platform — brittel1.png"; // 1 зоображення з тріщинами в платформі
platform_b2.src = "image/platform — brittel2.png"; // 2 зоображення з тріщинами в платформі
platform_b3.src = "image/platform — brittel3.png"; // 3 зоображення з тріщинами в платформі
var platformArray = []; // Масив з позиціонуванням платформ
var nP = 90; // Мінімальна відстань між платформами
var eP = 0; // Змінна потрібна для вичеслення скільки об'єктів в platformArray потрібно видалити для оптимізації гри
//

// Все що пов'язано з кубом
var widthCube = 30; // Розмір куба по ширині і висоті
var posXCube = 0; // X позиція верхнього-лівого кута куба
var posYCube = 430; // Y позиція верхнього-лівого кута куба
var moveLeft = false; // Змінна яка перевіряє чи рухатись кубу ліворуч чи ні(Коли клавіша a нажата moveLeft = true коли відпускається moveLeft = false)
var moveRight = false; // Змінна яка перевіряє чи рухатись кубу праворуч чи ні(Коли клавіша a нажата moveLeft = true коли відпускається moveLeft = false)
// Все що пов'язане з зміною кольору куба
var cl = -1; // Число  яке стає рандомним тим самим вичисляє рандомний колір
var color = null; // Змінна кольору який наложується на попередній
var oldColor = "white"; // Попередній колір
var grColor = 0; // Число яке вичисляє прозорісь кольору(color) який наложується на попередній колір(oldColor)
//
var jump = [false,0]; // Масив потрібний для вичеслення падає куб чи підстрибує
var hJump = 80; // Ця змінна визначає наскільки високо стрибає куб(з часом куб стрбає вище тому ця змінна потрібна)
//

// Коректування анімації(за часом)
var tick = 0; // Номер кадру	
function drawAnimation(){
	tick++; // Номер кадру
	// На кожному 10 кадрі буде виконуватиь функція draw
	if(tick % 10 == 0){ 
		draw(); // Функція draw
	};
	//
	// Якщо moveLeft = true куб рухається ліворуч
	if(moveLeft){
		posXCube--; // X позиція верхнього-лівого кута куба 
	};
	//
	// Якщо moveRight = true куб рухається праворуч
	if(moveRight){
		posXCube++; // Y позиція верхнього-лівого кута куба 
	};
	//
	// На кожному 5000-ному кадрі якщо мінімальна відстань між платформами менша 110 вона збільшується
	if(nP < 110 && tick % 5000 == 0){
		nP++;
	};
	//
	// На кожному 5000-ному кадрі якщо висота стрибка куба менша 100 вона збільшується
	if(hJump < 100 && tick % 5000 == 0){
		hJump++;
	};
	//
	// якщо eP більша нуля один об'єкт з початку масиву platformArray виділяється
	while(eP>0){
		eP--; // Зменшення числа eP 
		platformArray.shift(); // видалення з початку масиву platformArray об'єкта
	};
	//
	// Постійний рух платформ вниз на кожному 3 кадрі
	if(tick % 3 == 0){
		// Цикл для всіх об'єктів з значеннями кожної платформи
		for(let i = 0; i < platformArray.length; i++){
			platformArray[i].y++; // Збільшення Y позиції кожної платформи
		};
		//
	};
	//
	// Якщо jump[0] = true куб стрибає якщо jump[0] = false куб падає
	if(jump[0]){
		// Якщо висота стрибка не максимальна куб піднімається в вверз якщо ні він jump[0] = false
		if(jump[1]<hJump+widthCube+platform.height){
			jump[1]++;
		}else if(jump[1]>=hJump+widthCube+platform.height){
			jump[0] = false;
		};
		//
	}else{
		jump[1]--;
	};
	//
	// Якщо прозорість наложуємого кольору максимально мала виконується функція colorCube
	if(grColor == 9){
		colorCube(); // Функція colorCube
		return; // Закінчення всієї функції drawAnimation
	};
	//
	// Якщо прзорість наложуємого кольору не максимальна то на кожному 30-тому кадрі вона зменшується 
	if(grColor < 9 && tick % 30 == 0){
		grColor++; // Зменшення прозорості
	};
	//
};
//

// Головна функція
function draw(){
	ctx.clearRect(0,0,cnv.width,cnv.height); // Очистка попередньго кадру
	ctx.drawImage(bgImage,0,0); // Малювання фонового зоображення
	// Писання по середині кількість набраних очок
	ctx.beginPath(); 
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.font = "40px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(score,cnv.width/2,50);
	ctx.strokeText(score,cnv.width/2,50);
	ctx.fill();
	ctx.stroke();
	//
	//Цикл який малює платформи
	for(let i = 0; i < platformArray.length; i++){
		if(platformArray[i].bs == 0){
			ctx.drawImage(platform,platformArray[i].x,platformArray[i].y); // Малювання зоображення платформи
		}else if(platformArray[i].bs == 1){
			ctx.drawImage(platform_b1,platformArray[i].x,platformArray[i].y); 
		}else if(platformArray[i].bs == 2){
			ctx.drawImage(platform_b2,platformArray[i].x,platformArray[i].y); 
		}else if(platformArray[i].bs == 3){
			ctx.drawImage(platform_b3,platformArray[i].x,platformArray[i].y); 
		};
		if(platformArray[i].y > cnv.height){
			eP++;
		};
		if(posYCube+widthCube-jump[1] < 0){
			platformArray[i].y+=400;
		};
		if(platformArray[i].bs > 0 && platformArray[i].bs<4 && tick % 20 == 0){
			platformArray[i].bs++;
		};
		if(
			(posYCube+widthCube-jump[1] >= platformArray[i].y && posYCube+widthCube-jump[1] <=platformArray[i].y+platform.height) && 
			(
				(posXCube>=platformArray[i].x && posXCube<=platformArray[i].x+platform.width) || 
				(posXCube+widthCube>=platformArray[i].x && posXCube+widthCube<=platformArray[i].x+platform.width)
			) && platformArray[i].bs !=4
		){
			if(!jump[0]){
				if(platformArray[i].b && platformArray[i].bs == 0){
					platformArray[i].bs = 1;
				};
				if(!platformArray[i].u){
					score++;
					platformArray[i].u = true;
				};
				jump[0] = true;
				posYCube-=jump[1];
				jump[1] = 0;
			};
		};
	};
	//
	// Додавання нових платформ зверху
	if(platformArray[platformArray.length-1].y>=0){
		let r = random(241); // рандомне число позиціонування платформи по іксу(x)
		// Якщо рандомне число більше ніж ширина платформи то це число зменшується на цю ширину
		if(r>=platform.width){
			r-=platform.width;
		};
		//
		// Додавання до массиву платформ новий об'єкт
		platformArray.push({
			x:5+r, // ікс(x) координата верхнього-лівого кута платформи
			y:platformArray[platformArray.length-1].y-nP-random(60), // ігрик(y) координата верхнього-лівого кута платформи
			b:false,
			bs:0,
			u:false
		});
		//
		let br = random(15);
		if(br == 0){
			platformArray[platformArray.length-1].b = true;
		};
	};
	
	ctx.beginPath();
	ctx.fillStyle = oldColor;
	ctx.fillRect(posXCube,posYCube-jump[1],widthCube,widthCube);
	ctx.beginPath();
	ctx.fillStyle = color + "0." + grColor + ")";
	ctx.strokeStyle = "black";
	ctx.fillRect(posXCube,posYCube-jump[1],widthCube,widthCube);
	ctx.strokeRect(posXCube,posYCube-jump[1],widthCube,widthCube);
	ctx.stroke();
	if(posXCube+widthCube<=0){
		posXCube+=widthCube+cnv.width;
	};
	if(posXCube>=cnv.width){
		posXCube-=widthCube+cnv.width;
	};
	if(posYCube-jump[1] > cnv.height){
		gameOver();
	};
	if(posYCube+widthCube-jump[1] < 0){
		posYCube+=400;
	};
};
//

// Функція рандому
function random(a){
	let randomNumber = Math.floor(Math.random() * a); // Радномне число від 0 до заданого в аргументі числа 
	return randomNumber; // Виводження рандомного числа
};
//

function keyDown(){
	switch(event.keyCode){
		case 65: //left(a)
		moveLeft = true;
		break;
		case 68: //right(d)
		moveRight = true;
		break;
		case 13:
			if(enter){
				start();
			};
		break;
	};
};

function keyUp(){
	switch(event.keyCode){
		case 65: //left(a)
		moveLeft = false;
		break;
		case 68: //right(d)
		moveRight = false;
		break;
	};
};

function colorCube(){
	grColor = 0;
	oldColor = color + "1)";
	let clF = cl;
	while(clF == cl){
		cl = random(7);
	};
	if(cl == 0){
		color = "rgba(255,0,0,";
	}else if(cl == 1){
		color = "rgba(0,128,0,";
	}else if(cl == 2){
		color = "rgba(255,255,0,";
	}else if(cl == 3){
		color = "rgba(0,0,255,";
	}else if(cl == 4){
		color = "rgba(165,42,42,";
	}else if(cl == 5){
		color = "rgba(255,255,255,";
	}else if(cl == 6){
		color = "rgba(255,165,0,";
	};
};

function gameOver(){
	ctx.clearRect(0,0,cnv.width,cnv.height);
	clearInterval(animation);
	ctx.drawImage(bgImage,0,0);
	moveLeft = false;
	moveRight = false;
	hJump = 80;
	cl = -1;
	color = null;
	oldColor = "white";
	grColor = 0;
	nP = 90;
	eP = 0;
	posXCube = 0;
	posYCube = 430;
	jump = [false,0];
	platformArray = [];
	tick = 0;
	if(score > bestScore){
		bestScore = score;
	};
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = "40px Tahoma";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Ви програли",cnv.width/2,cnv.height/2-30);
	ctx.fill();
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.font = "20px Tahoma";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	ctx.fillText("Рахунок:",20,cnv.height/2+100);
	ctx.fillText(score,100,cnv.height/2+100);
	ctx.fillText("Найкращий рахунок:",20,cnv.height/2+140);
	ctx.fillText(bestScore,212,cnv.height/2+140);
	ctx.fill();
	score = 0;
	document.getElementById('start').style.top = '278px';
	document.getElementById('start').style.display = 'inline-block';
	enter = true;
};

function start(){
	document.getElementById('start').style.display = 'none';
	enter = false;
	let r = random(241);
	if(r>=platform.width){
		r-=platform.width;
	};
	platformArray.push({
		x:5+r,
		y:460,
		b:false,
		bs:0,
		u:true
	});
	posXCube = platformArray[0].x+(platform.width-widthCube)/2;
	animation = setInterval(drawAnimation,1); // сетІнтервал для drawAnimation
};

// Все що має статися при загрузці браузерного вікна
window.onload = function interval(){
	document.getElementById('start').style.display = 'inline-block';
	enter = true;
	ctx.drawImage(bgImage,0,0); // Малювання фонового зоображення
};
//