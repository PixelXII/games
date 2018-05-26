var output = "type start to begin"
var command = null;
var note;
var thing;
var inventory = new Object()
inventory.spots = 0;
inventory.contentsOf = [" "]
var place = 'first'
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var noteElem = document.getElementById('note');
var eats = ['hazelnut', 'white flower', 'daisy']
setInterval(printOut(output), 100)

function printOut(mess, mess2) {
  outElement.innerHTML = mess
  if(mess2 != null) {
	  out2.innerHTML = mess2;
  }
}

var searchArray = function(needle, haystack) {
  for(var i = 0; i < needle.length; i++){
    	if(haystack.indexOf(needle[i]) === -1) {
       		return false;
  	} else {
 	 	return true;
	}
	}
}

var slice = function(command, start, end) {
	return command.slice(start, end)
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

function flowerPlace() {
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is the small, bubbling stream.", 
						"To your left is a hazelnut tree. You can see some hazelnuts on the tree.", 
						"Behind you is the massive tree.", 
						"In front of you is a circle of stones.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You take a step into the cold, clear water of the stream. ",
								 "stream",
						"The hazelnut tree is not strong enough for you to climb.",
								 "flowers",
						"You step out of the flower patch, back to where you started.",
								 "first",
						"You walk ahead to the stones and see a small shrine in the center of the circle.",
								"shrine")
				out2.innerHTML = ""
			}
}

function doAction() {
	try {
		command = inElement.value;
		inElement.value = "";
		if(command == 'start' || command == 'Start' || command.includes('help') || command.includes('Help')) {
			game.start()
		} else if(command.includes('grab') || command.includes('take') || command.includes('pick up')) {
			game.pickUp(command)
		} else if(place == 'first') {
			firstPlace()
		} else if(place == 'flowers') {
			flowerPlace()
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

window.addEventListener('beforeunload', function() {
	document.cookie = "place=" + place
	document.cookie = "inventorySpots=" + inventory.spots
	document.cookie = "inventoryContents=" + inventory.contentsOf
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
	setInterval(function() {
			var i = 0;
			if(i === 600) {
				printOut('You did not eat and starved to death.',
					 "<br>Don't do it again.")
				setTimeout(function() {game.reset()}, 5000)
			}
			i++
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

game.pickUp = function(action) {
	if(action.includes('pick') || action.includes('hold') || action.includes('grab')) {
		if(action.includes('pick up')) {
		   	var thing = action.slice(8)
			var otherThing = thing;
		} else {
			var thing = action.slice(5)
			var otherThing = thing
		}
		if(inventory.spots === 3) {
			printOut('Your hands are full.')
		} else {
			eval(thing + ' = new Object()')
			inventory.spots++
			if(eats.includes(otherThing)) {
				eval(thing + '.edible = true')
			} else {
				eval(thing + '.edible = false')
			}
			inventory.contentsOf.pop()
			inventory.contentsOf.push(thing)
			printOut('Taken')
		}
	}
}

game.eat = function(action) {
	try {
	if(action.includes('eat') || action.includes('consume')) {
		if(action.includes('consume')) {
			var thing = action.slice(8)
			var otherThing = action.slice(8)
		} else {
			var thing = action.slice(4)
			var otherThing = action.slice(4)
		}
		inventory.spots++
		if(eats.includes(otherThing)) {
			printOut('Eaten. <br> <br> You are not hungry anymore.')
			inventory.spots--
		} else {
			printOut('You ate something you weren\'t supposed to. <br> <br> <br> END OF GAME  <br> [You died of food poisoning]')
			setTimeout(function() {game.reset();}, 5000);
		}
		console.log('eaten')
	} catch {
		console.log('not eaten')
	}
}
