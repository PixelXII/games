// Technical things -- getting the output in the right place, setting event listeners etc
var output = "type start to begin"
var command;
var note;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var noteElem = document.getElementById('note');
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
		} 
		console.log('doAction() done');
	} catch {
		console.error('doAction() failed.')
	}	
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});

// The actual game

var game = new Object();

game.start = function() {
	setTimeout(printOut("Pine is a text-based RPG, like <a href='https://zorkonline.net'>Zork</a>. Enjoy the game!"), 5000);
	setTimeout(function() {game.first()}, 5000);
}
		
game.first = function() {
	noteElem.innerHTML = "game written by kai wildberger"
	setTimeout(function() { output = 'You are standing at the entrance to a tunnel which leads under a road. Behind you, to the north, is a trail leading to the nearby town.'; }, 5000);
	setTimeout(function() { output = 'You can see a dried-up streambed on the other side of the tunnel.'; }, 5000);	
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
