let is_default_graphic = false;

function init() {
    [r_out, x_out, y_out].forEach(f => f.value='_');
    createGraphic('canvas', r_out.value);
}

function createGraphic(id, r) {
    if (r === 0 || r === '_') {
        is_default_graphic = true;
        r = 1;
    }else{
        is_default_graphic = false;
    }

    let canvas = document.getElementById(id), context = canvas.getContext("2d");
    // очистка
    context.clearRect(0, 0, canvas.width, canvas.height);

    // прямоугольник
    context.beginPath();
    context.rect(85, 150, 65, 130);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // сектор
    context.beginPath();
    context.moveTo(150, 150);
    context.arc(150, 150, 130, 0, Math.PI / 2, false);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // треугольник
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(85, 150);
    context.lineTo(150, 85);
    context.lineTo(150, 150);
    context.closePath();
    context.strokeStyle = "#2f9aff";
    context.fillStyle = "#2f9aff";
    context.fill();
    context.stroke();

    // оси
    context.beginPath();
    context.font = "10px Verdana";
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.moveTo(150, 0);
    context.lineTo(150, 300);
    context.moveTo(150, 0);
    context.lineTo(145, 15);
    context.moveTo(150, 0);
    context.lineTo(155, 15);
    context.fillText("Y", 160, 10);
    context.moveTo(0, 150);
    context.lineTo(300, 150);
    context.moveTo(300, 150);
    context.lineTo(285, 145);
    context.moveTo(300, 150);
    context.lineTo(285, 155);
    context.fillText("X", 290, 130);

    // деления Y
    context.moveTo(145, 20);
    context.lineTo(155, 20);
    context.fillText(is_default_graphic ? 'R' : String(r), 160, 20);
    context.moveTo(145, 85);
    context.lineTo(155, 85);
    context.fillText(is_default_graphic ? 'R/2' : String(r / 2), 160, 78);
    context.moveTo(145, 215);
    context.lineTo(155, 215);
    context.fillText(is_default_graphic ? '-R/2' : String(-(r / 2)), 160, 215);
    context.moveTo(145, 280);
    context.lineTo(155, 280);
    context.fillText(is_default_graphic ? '-R' : String(-r), 160, 280);

    // деления X
    context.moveTo(20, 145);
    context.lineTo(20, 155);
    context.fillText(is_default_graphic ? '-R' : String(-r), 15, 140);
    context.moveTo(85, 145);
    context.lineTo(85, 155);
    context.fillText(is_default_graphic ? '-R/2' : String(-(r / 2)), 70, 140);
    context.moveTo(215, 145);
    context.lineTo(215, 155);
    context.fillText(is_default_graphic ? 'R/2' : String(r / 2), 215, 140);
    context.moveTo(280, 145);
    context.lineTo(280, 155);
    context.fillText(is_default_graphic ? 'R' : String(r), 280, 140);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
}

function clickOnGraph(r) {
    document.getElementById("x_out").value = "_";
    document.getElementById("y_out").value = "_";
    let canvas = document.getElementById('canvas');
    let err = document.getElementById('errorGraph');
    err.innerHTML = '';

    if (is_default_graphic) {
        createGraphic('canvas', 0);
        err.append('You have to set R parameter');
        return;
    }

    let br = canvas.getBoundingClientRect();
    let left = br.left;
    let top = br.top;

    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;
    document.getElementById("x_id").value = (x - 150) / 130 * r;
    document.getElementById("y_id").value = (-y + 150) / 130 * r;
    markPointFromServer((x - 150) / 130 * r, (-y + 150) / 130 * r, r);
    markPoint((x - 150) / 130 * r, (-y + 150) / 130 * r, r);
}

function showPoint(x, y, r){
    let canvas = document.getElementById("canvas"), context = canvas.getContext("2d");

    createGraphic('canvas', r);
    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130))-2, 4, 4);
    context.closePath();
    let color = "red";
    if (isArea(x, y, r)) {
        color = "lime";
    }
    context.fillStyle = color;
    context.strokeStyle = "black";
    context.fill();
    context.stroke();

}

function markPointFromServer(x, y, r) {
    let error = document.getElementById('error');
    error.innerHTML = '';
    console.log('try to mark point from server with x:' + x + ', y:' + y + ', r:' + r);
    if (!checkAllParameters(x, y, r)) {
        error.append('Wrong parameters');
        return false;
    } else {
        //document.getElementById("flag").value = 0;
        fetch("./check?&x_v=" + encodeURI(x) + "&y_v=" + encodeURI(y) + "&r_v=" + encodeURI(r) , {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        })
        document.getElementById('result').src = document.getElementById('result').src
        return true;
    }
}

function checkAllParameters(x, y, r) {
    return isNumber(x) && isNumber(y) && isRcorrect(r);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function isRcorrect(r) {
    return r >= 1 && r <= 100;
}

function isArea(x, y, r) {
    if ((x <= 0) && (y <= 0) && (x >= -(r/2)) && (y >= (-r))) {
        return true;
    }
    if ((x <= 0) && (y >= 0) && (x >= (y - (r/2))) && (y <= (r/2))) {
        return true;
    }
    if ((y <= 0) && (x >= 0) && ((Math.pow(x,2) + Math.pow(y,2)) <= (Math.pow(r, 2)))) {
        return true;
    }
    return false;
}

function markPoint(x, y, r) {
    let canvas = document.getElementById('canvas'), context = canvas.getContext("2d");
    //createGraphic(r);

    context.beginPath();
    context.rect(Math.round(150 + ((x / r) * 130))-2, Math.round(150 - ((y / r) * 130)) - 2, 4, 4);
    context.closePath();
    context.strokeStyle = 'black';

    let color = 'red';
    if (isArea(x, y, r)) {
        color = 'lime';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();
}

function setR(r) {
    document.getElementById('r_out').value = r;
    document.getElementById('r_id').value = r;
    let err = document.getElementById('errorGraph');
    err.innerHTML = '';
    createGraphic('canvas', r);
}

function setX(x) {
    document.getElementById('x_out').value = x;
    document.getElementById('x_id').value = x.trim();
}

// сообщение для y
function message(msg) {
    let node = document.getElementById('message');
    node.innerText = msg;
    node.style.visibility = 'visible';
}

// проверка y
function verifyY(y) {
	const yMax = 5;
	const yMin = -5;
    let pattern = new RegExp(/^(-?0$|-?[1-9]*([,.]\d*$)?|-?0[,.]\d*$)$/);
    let yValue = parseFloat(y.value.replace(/,/, '.'));
    let elem = document.getElementById('text_y');
    let y_out = document.getElementById('y_out');
    if (y.value != '' && y.value != '-') {
		if (isNaN(yValue)) {
			y.focus();
            elem.style.backgroundColor = '#cab2cb';
			//message('y is a number');
			y.value = '';
            return false;
		} else if (!pattern.test(y.value)) {
            y.focus();
            elem.style.backgroundColor = '#cab2cb';
			//message('y is a number');
			y.value = '';
            return false;
        } else if (yValue < yMin || yValue > yMax) {
			y.focus();
            elem.style.backgroundColor = '#cab2cb';
			//message('y in [-5; 5]');
			y.value = '';
            return false;
		} else if (y.value.length > 5) {
			y.focus();
            elem.style.backgroundColor = '#cab2cb';
			//message('length < 6');
			y.value = '';
            return false;
		}
        elem.style.backgroundColor = '#FFF';
		//document.getElementById('message').style.visibility = 'hidden';
        y_out.value = yValue;
        return true;
    }
    elem.style.backgroundColor = '#FFF';
	//document.getElementById('message').style.visibility = 'hidden';
    y_out.value = '_';
    return true;
}

// повторная проверка y
function checkY() {
    let yInput = document.getElementById('text_y');
	let pat1 = new RegExp(/^(-?[0-9]*[,.]0*$)$/);
	let pat2 = new RegExp(/^(-?0[,.]0*$)$/);
    let y_out = document.getElementById('y_out');
	if (pat1.test(yInput.value)) {
		if (pat2.test(yInput.value)) {
			yInput.value = '0';
			y_out.value = '0';
		} else yInput.value = yInput.value.replace(/[,.]0*/, '');
	}
}

// выбор x
const correctX = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
function isCorrectX(x) {
    return correctX.includes(Number(x));
}

// выбор r
const correctR = [1, 2, 3, 4, 5];
function isCorrectR(r) {
    return correctR.includes(Number(r));
}


// проверка x, y и r
function check() {
	let error = document.getElementById('error');
    let yInput = document.getElementById('text_y');
    let xInput = document.getElementById('x_out');
    let rInput = document.getElementById('r_out');

    document.getElementById("flag").value = 1;
	error.innerHTML = '';

    let flag_y = 0;
	let flag_x = 1;
	let flag_r = 1;

	// проверка y
	if (yInput.value != '') {
		flag_y = 1;
        document.getElementById("y_id").value = yInput.value;
	} else {
        document.getElementById("y_id").value = 0;
    }
	
	// если y не введен
	if (!flag_y) {
		let err_y = document.createElement('div');
		err_y.innerHTML = 'You have to set Y parameter';
		error.append(err_y);
	}

	// если x не выбран
	if (!isCorrectX(xInput.value)) {
		let err_x = document.createElement('div');
		err_x.innerHTML = 'You have to set X parameter';
		error.append(err_x);
        flag_x = 0;
	}

    // если r не выбран
    if (!isCorrectR(rInput.value)) {
        let err_r = document.createElement('div');
        err_r.innerHTML = 'You have to set R parameter';
        error.append(err_r);
        flag_r = 0;
    }

	// если x, y и r правильные
	if (flag_x && flag_y && flag_r) {
		document.getElementById("flag").value = 0;
        showPoint(xInput.value, yInput.value, rInput.value);
	}
}
