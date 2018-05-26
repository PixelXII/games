var output = "type start to begin"
var command = null;
var note;
var place = 'first'
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
var slice = function(command, start, end) {
	return command.slice(start, end)
}

function firstPlace() {
	if(command.includes('walk through tunnel') || command.includes('walk down tunnel') || command.includes('walk through the tunnel')) {
					outElement.innerHTML = "You walk ahead to the dried stream. You can see a cave on the side of the canyon.";
					place = 'canyon';
					out2.innerHTML = ""
				} else if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right, there is a massive tree. It looks like it has been there for hundreds of years.", 
						"To your left, there is a pile of rocks and sticks, presumably dumped off the road.", 
						"Behind you is a steep rock face that looks impossible to climb.", 
						"In front of you is the tunnel.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot move into the tree.",
								 "first",
						"There is too much debris to climb on top of the pile.",
								 "first",
						"You cannot climb the rock.",
								 "first",
						"You walk ahead to the dried stream. You can see a cave on the side of the canyon.",
								"canyon")
				out2.innerHTML = ""
			}
}

function doAction() {
	try {
		command = inElement.value;
		inElement.value = "";
		if(command == 'start' || command == 'Start' || command.includes('help') || command.includes('Help')) {
			game.start()
		} else if(place == 'first') {
			firstPlace()
		} else if(place == 'end') {
			game.end()
		} else if(outElement.innerHTML == 'undefined') {
			outElement.innerHTML = "I don't understand what you mean."
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

var game = new Object();

game.reset = function() {
	noteElem.innerHTML = ""
	out2.innerHTML = ""
	outElement.innerHTML = ""
	printOut("You screwed up. Type 'reset' to reset the game.")
	if(command === 'reset' || command === 'Reset') {
		location.reload()
	}
}

game.end = function() {
	printOut('END OF GAME <br> ------------------------------<br> You have reached the end of this adventure. <br> <br> Game written by Kai Wildberger, age 12, grade 6 <br> <br> <br> <br> May 24th, 2018');
	inElement.style.display = "none"
}

game.start = function() {
	inElement.style.display = "none"
	printOut("<h2>COMMANDS:</h2> <br> <br> 'move' to move <br> 'look' to look")
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
		} else {
			return "I don't understand what you mean."
		}
	if(action == 'look' || action == 'Look' || action == 'look around' || action == 'Look around') {
		printOut(rightMess + "<br>" + leftMess + "<br>" + behMess + '<br>' + foMess)
		}
	}
}

game.first = function() {
	inElement.style.display = "block"
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You are standing at the entrance to a tunnel which leads under a road. <br> Behind you, is a steep rock face.',
		'You can see a dried-up streambed on the other side of the tunnel.')
		if(command.includes('look ') || command.includes('Look ')) {
			try {
			outElement.innerHTML = game.look(command, 
						"To your right, there is a massive tree. It looks like it has been there for hundreds of years.", 
						"To your left, there is a pile of rocks and sticks, presumably dumped off the road.", 
								 "Behind you is a cement block with a ladder leading down into it.", 
								 "In front of you is the tunnel.")
				console.log('game.look() succeeded.')
			} catch {
				console.error('Excecution of game.look() failed.');
		}
	}
}

game.move = function(action, right, rightLoc, left, leftLoc, back, backLoc, forward, forLoc) {
	if(action.includes('move ') || action.includes('step') || action.includes('go') || action.includes('walk')) {
		if(action.includes('right')) {
			place = rightLoc
			return right;
		} else if(action.includes('left')) {
			place = leftLoc
			return left;
		} else if(action.includes('backwards') || action.includes('behind me') || action.includes('behind') || action.includes('back')) {
			place = backLoc
			return back;
		} else if(action.includes('forward') || action.includes('ahead')) {
			place = forLoc
			return forward;
		} else {
			return "I don't understand what you mean."
		}
		
	}
}
