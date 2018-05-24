// Technical things -- getting the output in the right place, setting event listeners etc
var output = "type start to begin"
var command;
var note;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var noteElem = document.getElementById('note');
setInterval(printOut(output), 100)

function printOut(mess, mess2) {
  outElement.innerHTML = mess
  if(mess2 != null) {
	  out2.innerHTML = mess2;
  }
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
	setTimeout(printOut("Pine is a text-based RPG, like <a href='http://zorkonline.net'>Zork</a>. Enjoy the game!"), 5000);
	setTimeout(function() {game.first()}, 5000);
}

game.look = function(action, rightMess, leftMess, behMess, foMess) {
	if(action.includes('look ') || action.includes('Look ')) {
		if(action.includes('right')) {
			return rightMess;
		} else if(action.includes('left')) {
			return leftMess;
		} else if(action.includes('backwards') || action.includes('behind me') || action.includes('behind') || action.includes(' back')) {
			  return behMess;
		} else if(action.includes('forward') || action.includes('ahead')) {
			return foMess;
		}
	}
}

game.first = function() {
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You are standing at the entrance to a tunnel which leads under a road. <br> Behind you, to the north, is a trail leading to the nearby town.',
		'You can see a dried-up streambed on the other side of the tunnel.')
	if(command.includes('look ') || command.includes('Look ')) {
	outElement.innerHTML = game.look(command, 
					"To your right, there is a massive tree. It looks like it has been there for hundreds of years.", 
					"To your left, there is a pile of rocks and sticks, presumably dumped off the road.", 
							 "Behind you is a cement block with a ladder leading down into it.", 
							 "In front of you is the tunnel.")
}
}
		   
var slice = function(command, start, end) {
	return command.slice(start, end)
}



	

game.move = function(action) {
    if(action.inlcudes('move') || action.includes('walk') || action.includes('step')) {
		if(action.charAt(6) != ' ') {
			var five = action.charAt(5)+action.charAt(6);
       		 } else {
        	var five = action.charAt(5);
      		  }
		
        console.log('You move ' + five + ' steps ' + direction + '.');
		}
}
