var game = new Object();
var output;
var actionElement = document.getElementById('input');
var outputHasChanged = function() {
	var testVariable = null;
	var output = testVariable;
	if(testVariable != output) {
		return false;
	} else {
		return true;
	}
}

function backOut(mess) {
	actionElement.innerText = mess;
}

function changeOut(str) {
	document.getElementById('out').innerHTMl = str
}

setInterval(function() { 
	actionElement.innerText = output;
}, 10);

if(outputHasChanged == true) {
	backOut(output);
}

game.start = function() {
	output = "WELCOME TO PINE!!!"
	setTimeout(changeOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>."), 5000);
}
		

game.move = function() {
    if(value.inlcudes('move') || value.includes('walk') || value.includes('step')) {
		if(action.charAt(6) != ' ') {
			var five = action.charAt(5)+action.charAt(6);
        } else {
        	var five = action.charAt(5);
        }
		
        console.log('You move ' + five + ' steps ' + direction + '.');
	}
}

function doAction() {
  actionElement.submit;
  var action = actionElement.value;
  game.move()
}
