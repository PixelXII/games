// Technical things -- getting the output in the right place, setting event listeners etc
var output;
var action;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');

function printOut(mess) {
  outElement.innerHTML = mess
}

if(action != null) {
	setInterval(printOut(action), 100)
} else {
	action = "pine"
	setInterval(printOut(action), 100)
}

function doAction() {
  inElement.submit;
  console.log('done');
  action = inElement.value;
  
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});

// The actual game

var game = new Object();

game.start = function() {
	output = "WELCOME TO PINE!!!"
	setTimeout(changeOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>."), 5000);
}
		

game.move = function() {
    if(action.inlcudes('move') || action.includes('walk') || action.includes('step')) {
		if(action.charAt(6) != ' ') {
			var five = action.charAt(5)+action.charAt(6);
        } else {
        	var five = action.charAt(5);
        }
		
        console.log('You move ' + five + ' steps ' + direction + '.');
	}
}

