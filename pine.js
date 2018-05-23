// Technical things -- getting the output in the right place, setting event listeners etc
var output = "pine"
var action;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
setInterval(printOut(output), 100)

function printOut(mess) {
  outElement.innerHTML = mess
}

function doAction() {
  inElement.submit;
  inElement.reset()
  console.log('done');
  action = inElement.value;
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      setTimeout(doAction(), 500);
    }
});

// The actual game

var game = new Object();

game.start = function() {
	output = "WELCOME TO PINE!!!"
	setTimeout(printOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>."), 5000);
	setTimeout(printOut("Don't kill me for copying Zork."), 5000);
	setTimeout(printOut("Enjoy the game! Type 'help' for help."), 500);
	setTimeout(game.first, 5000);
}
		
game.first = function() {}
		   
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


