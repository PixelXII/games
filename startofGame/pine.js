// Technical things -- getting the output in the right place, setting event listeners etc
var output = "type start to begin"
var command;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
setInterval(printOut(output), 100)

function printOut(mess) {
  outElement.innerHTML = mess
}

function doAction() {
	try {
	command = inElement.value;
	printOut(command);
	console.log('doAction() done');
	} catch {
	console.error('doAction() failed.')
	}	
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
	setTimeout(printOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>. Enjoy the game! Type 'help' for help."), 5000);
}

game.first = function() {}
		   
game.move = function() {
    if(command.inlcudes('move') || command.includes('walk') || command.includes('step')) {
		if(command.charAt(6) != ' ') {
			var five = command.charAt(5)+command.charAt(6);
        } else {
        	var five = command.charAt(5);
        }
		
        console.log('You move ' + five + ' steps ' + direction + '.');
	}
}

// The actual game

var game = new Object();

game.start = function() {
	output = "WELCOME TO PINE!!!"
	setTimeout(printOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>. Enjoy the game! Type 'help' for help."), 5000);
	game.first()
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
