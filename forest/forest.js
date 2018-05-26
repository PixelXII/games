var output = "type start to begin"
var command = null;
var note;
var place = 'first'
var warning = document.getElementById('warning');
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var noteElem = document.getElementById('note');
warning.style.color = 'red';
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
function warning(mess) {
	warn.innerHTML = mess
}

function firstPlace() {
	 if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a small, bubbling stream.", 
						"To your left is a giant oak tree.", 
						"Behind you is a massive tree. You cannot identify the species of this tree.", 
						"In front of you is a small flower patch.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You take a step into the cold, clear water of the stream. ",
								 "stream",
						"You climb the oak tree.",
								 "firstOak",
						"The tree is too large to climb",
								 "first",
						"You walk ahead to the flower patch. You notice that all of the flowers are red, except for one daisy.",
								"flowers")
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
	printOut("<h2>COMMANDS:</h2> <br> <br> 'move' to move <br> 'look' to look <br> 'eat' to eat <br> 'pick up' or 'hold' to pick up")
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
	printOut('You are standing in a forest. You do not remember how you got there or where you are.',
		'You realize that you are hungry and need to eat something.')
	warning('HUNGRY');
	setInterval(function() {
			var i = 0;
			if(i === 600) {
				printOut('You did not eat and starved to death.',
					 "<br>Don't do it again.")
				setTimeout(function() {game.reset()}, 5000)
			}
		}, 1000)
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
