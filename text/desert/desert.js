var output = "type start to begin <br> <br> <br> Note: there is no support for mobile. sorry for the device incompatibility."
var command = null;
var note;
var place = 'first'
var thing;
var hints = 0;
var note = "note"
var pushNote = 'inventory.contentsOf.push('+note+')'
var mainEats = ['cactus fruit', 'water']
var mainPoisons = ['cactus']
var pickUp = ['pick up', 'pick', 'grab', 'take']
var eatWords = ['eat', 'consume']
var nonEats = ['rock']
var carryNote = false;
var white, red, green, blue, purple, yellow, orange, brown;
var inventory = new Object()
inventory.spotsUsed = 0;
inventory.contentsOf = []
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var noteElem = document.getElementById('note');
setInterval(function() { inventory.spotsUsed = inventory.contentsOf.length}, 100)
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

function eating(eats, items, poisons) {
	if(command.includes('eat')) {
		game.eat(command)
	} else if(command.includes('throw') || command.includes('chuck') || command.includes('drop')) {
		game.throw(command)
	} else if(command.includes('grab') || command.includes('pick') || command.includes('take')) {
		game.pickUp(command, eats, items, poisons)
	}
}

// The area functions

function firstPlace() {
  out2.innerHTML = ""
	var eats = ['cactus fruit']
	var poisons = ['']
	var items = ['rock']
	eating(eats, items, poisons)
	if(command.includes('look')) {
	outElement.innerHTML = game.look(command, 
	  "On your right there is a well with a considerable amount of water in it.", 
		"To your left is a very steep slope going down to an area of sparse shrubbery and rocks.", 
    "Behind you is a massive mound of boulders.", 
    "In front of you, away from the pile of boulders, is the edge of the dune that you are standing on.")
	}
	if(command.includes('walk') || command.includes('step') || command.includes('move')) {
  outElement.innerHTML = game.move(command, 
		"You walk to the well.",
								 "well",
		"You slip and slide and eventually you find yourself at the bottom of the slope. <br> Gravel and sand continues falling long after you've reached the bottom.",
								 "belowSlope",
		"You cannot climb the boulders.",
								 "first",
		"Walking forward, you come to the end of the small dune.",
								"dune")
	}
}


function doAction() {
		command = inElement.value;
		inElement.value = "";
		if(command.includes('game') || command.includes('(') || command.includes(')')) {
			eval(command)
		}
    if(command.includes('look') && command.includes('around') || command.includes('about') || command.includes('in this area')) {
      game.look()
    }
		if(command == 'start' || command == 'Start') {
			game.start()
		} else if(place == 'first') {
			firstPlace()
		} else if(place == 'end') {
			game.end()
		} 
		if(outElement.innerHTML == 'undefined') {
			printOut("I don't understand what you mean.", "")
		}
}

// event listeners help everything

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});
	
// the game object

var game = new Object()

game.reset = function() {
	noteElem.innerHTML = ""
	out2.innerHTML = ""
	outElement.innerHTML = ""
	printOut("You screwed up. Reload to reset the game.")
}

game.end = function() {
	printOut('END OF GAME <br> ------------------------------<br> You have reached the end of this adventure. <br> <br> Game written by Kai Wildberger, age 12, grade 6 <br> <br> <br> <br> May 29th, 2018');
	inElement.style.display = "none"
}

game.start = function() {
	inElement.style.display = "none"
	printOut("move [direction](left right forward back)<br>look [direction] <br>eat [item] <br>pick up/grab [item]")
	setTimeout(function() {game.first()}, 5000);
}

game.look = function(action, rightMess, leftMess, behMess, foMess) {
	action = action.toLowerCase()
	if(action.includes('look')) {
		/* if(action == 'look' || action.includes('look') && action.includes('around')) {
			printOut(rightMess+'<br>'+leftMess+'<br>'+behMess+'<br>'+foMess)
		} */ 
		if(action.includes('right')) {
			return rightMess;
		} else if(action.includes('left')) {
			return leftMess;
		} else if(action.includes('backwards') || action.includes('behind me') || action.includes('behind') || action.includes(' back')) {
			  return behMess;
		} else if(action.includes('forward') || action.includes('ahead')) {
			return foMess;
		} else if(action.includes('around')) {
			return foMess + "<br>" + behMess + "<br>" + rightMess + "<br>" + leftMess
		} else {
			return "I don't understand what you mean."
		}
	}
}

game.first = function() {
	inElement.style.display = "block"
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You find yourself on a small dune in a desert.')
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

// This is where it gets slightly screwy. I wrote pickUp, throw, and eat all past 8pm on school nights. Somehow, they work.

game.pickUp = function(action, eats, items, poisons) {
	if(inventory.spotsUsed === 3) {
			printOut('Your hands are full.')
		} else {
			if(action.includes('pick up') || action.includes('pick') || action.includes('hold') || action.includes('grab') || action.includes('take')) {
			if(action.includes('pick up')) {
		   		var thing = action.slice(8);
				var otherThing = thing;
			} else {
				var thing = action.slice(5)
				var otherThing = thing
			}
			if(thing.includes(' ')) {
				thing = thing.split(' ')
				var newThing = thing.join()
				thing = newThing.replace(',', ' ');
			}
			if(items.includes(thing) === false) {
				outElement.innerHTML = ""
				printOut("", "You don't see a " + thing)
			} else {
				out2.innerHTML = ""
				inventory.contentsOf.push(thing)
				printOut('You have a ' + thing)
			}
				eval(thing + 'Thing = new Object()')
				inventory.spotsUsed++
				if(mainEats.includes(otherThing) || mainPoisons.includes(otherThing)) {
					eval(thing + 'Thing.edible = true')
				} else { 
					eval(thing + 'Thing.edible = false')
				}
			}
		}
	}

 game.eat = function(action) {
	if(action.includes('eat') || action.includes('consume')) {
		if(action.includes('consume')) {
			var thing = action.slice(8)
			var otherThing = action.slice(8)
		} else {
			var thing = action.slice(4)
			var otherThing = action.slice(4)
		}
		if(thing.includes(' ')) {
			thing = thing.split(' ')
			var newThing = thing.join()
			thing = newThing.replace(',', ' ');
		}
		if(inventory.contentsOf.includes(thing) === false) {
			printOut("", "You do not have a " + thing)
		} 
		if(eval(thing+'Thing.edible') === true) {
			inventory.spotsUsed--
			if(inventory.contentsOf.indexOf(thing) == 0) {
				inventory.contentsOf.shift()
			} else if(inventory.contentsOf.indexOf(thing) == inventory.contentsOf.length-1) {
				inventory.contentsOf.pop()
			} else {
				var index = inventory.contentsOf.indexOf(thing);
  				array.splice(index, 1);
			}
			outElement.innerHTML = ""
			printOut("", 'Eaten.') 
		} else {
			printOut("You cannot eat that.", "")
		}
		console.log(thing+' eaten')
	}
 }
 
 game.throw = function(action) {
	 if(action.includes('throw') || action.includes('chuck') || action.includes('drop')) {
		if(action.includes('drop')) {
			var thing = action.slice(5)
			var otherThing = action.slice(5)
		} else {
			var thing = action.slice(6)
			var otherThing = action.slice(6)
		}
		if(thing.includes(' ')) {
			thing = thing.split(' ')
			var newThing = thing.join()
			thing = newThing.replace(',', ' ');
		} else if(thing.includes(',')) {
			thing = thing.replace(',', ' ')
		}
		if(inventory.contentsOf.includes(thing) === false) {
			printOut("", "You do not have a " + thing)
		} else {
			inventory.spotsUsed--
			if(inventory.contentsOf.indexOf(thing) == 0) {
				inventory.contentsOf.shift()
			} else if(inventory.contentsOf.indexOf(thing) == inventory.contentsOf.length-1) {
				inventory.contentsOf.pop()
			} else {
				var index = inventory.contentsOf.indexOf(thing);
  				array.splice(index, 1);
			}
			outElement.innerHTML = ""
			printOut('You do not have a '+thing+' anymore', "") 
		}
		console.log(thing+' dropped')
	}
 }
 
 // The new stage of development: look around, hint, and other features. (i have not decided yet..my friend and helper is thinking of them)
 
 // I was going to add an item limit, so there isn't an infinite number of items in a given area, but I decided not to because I'm lazy.
 
 game.hint = function(message) {
   printOut(message)
   setTimeout(function() { printOut('You have ' + 3-hints + "left.") }, 5000)
 }
