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
	inElement.value = "";
	if(command == 'start' || command == 'Start') {
		game.start()
	} else if(command == 'help' || command == 'help') {
		game.help()
	}
		
	}
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
	printOut("Pine is a text-based rpg, like <a href='https://zorkonline.net'>Zork</a>. Enjoy the game! Type 'help' for help.")
}

game.help = function() {
	output = "The way this game works is you give me a command, and I will execute it. Try playing <a href='https://zorkonline.net'>Zork</a> to get a feel for the commands and the way the game works.");
}

game.first = function() {
	output = "game written by kai wildberger"
	setTimeout(function() { printOut('You are standing at the entrance to a tunnel which leads under a road. Behind you, to the north, is a trail leading to the nearby town.'); }, 5000);
	setTimeout(function() { printOut('You can see a dried-up streambed on the other side of the tunnel.'); }, 5000);	
}
		   
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
