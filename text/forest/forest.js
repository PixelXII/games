/* 

If anyone is bothering to look at the source for the game, I'll say hi first. 

"hi"

I am twelve and I am just beginning to understand how I can make a JavaScript game. 
The code is probably horribly messy and things aren't functioning exactly the way they are supposed to (the game works though!).
If you have a bug, issue, or something else, go to the github repo at github.com/PixelXII/games

*/

// Variables
var output = "type start to begin"
var command = null;
var note;
var place = 'first'
var thing;
var note = "note"
var pushNote = 'inventory.contentsOf.push('+note+')'
var mainEats = ['acorn', 'hazelnut', 'daisy', 'white flower', 'blackberries', 'blackberry', 'berry', 'fish']
var mainPoisons = ['mushroom', 'red flower', 'crayfish']
var pickUp = ['pick up', 'pick', 'grab', 'take']
var eatWords = ['eat', 'consume']
var nonEats = ['rock', 'shrine', 'grass']
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
setInterval(function() {
	if(place === 'shrine') {
		out2.innerHTML =+ "<img src='altar.png' style='width:50; height:50;'>"
	} else if(place === 'inHut' || place === 'shrine' && inventory.contentsOf.includes('note')) {
		out2.innerHTML = "<img src='./note.png' style='height:50; width:50;'>"
	} else {
		out2.innerHTML = ""
	}
}, 100)


// Utility functions

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

// Functions that handle the messages to display for the locations.

function firstPlace() {
	out2.innerHTML = ""
	var eats = ['acorn', 'hazelnut']
	var poisons = ['mushroom']
	var items = ['rock', 'stone', 'mushroom', 'hazelnut', 'acorn', 'stick', 'twig']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a small, bubbling stream. There is also a hazelnut shrub, bursting with hazelnuts.", 
						"To your left is a giant oak tree. There are many mushrooms under the tree.", 
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

function firstOakPlace() {
	out2.innerHTML = ""
	var eats = ['acorn']
	var items = ['rock', 'stone', 'acorn', 'stick', 'twig']
	var poisons = []
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"On the right there is a massive branch. The branch is too big to climb up.", 
						"To your left is a place where the trunk splits. It is impossible to climb to the split without 3 legs.", 
						"Behind you is where you started, just before the flowers.", 
						"In front of you is a blackberry thicket.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot climb the branch.",
								 "firstOak",
						"You cannot reach there.",
								 "firstOak",
						"You jump off the tree.",
								 "first",
						"You decide not to jump into the brambles.",
								"firstOak")
				out2.innerHTML = ""
			}
}

function flowerPlace() {
	out2.innerHTML = ""
	var eats = ['hazelnut', 'acorn', 'daisy', 'white flower']
	var items = ['rock', 'stone', 'acorn', 'hazelnut', 'daisy', 'red flower', 'white flower']
	var poisons = ['red flower']
	eating(eats, items, poisons)
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

function shrinePlace() {
	out2.innerHTML = ""
	var eats = ['hazelnut', 'acorn', 'blackberry', 'blackberries', 'berry']
	var items = ['rock', 'stone', 'acorn', 'hazelnut', 'stick', 'shrine', 'blackberry', 'blackberries', 'mushroom']
	var poisons = ['mushroom']
	eating(eats, items, poisons)
	if(inventory.contentsOf.includes('note') && command.includes('note') && command.includes('shrine')) {
		doNote()
		setTimeout(function() {game.end()}, 6000)
	}
	if(command.includes('look')) {
					if(inventory.contentsOf.includes('note') === false) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a blackberry thicket. You can hear the small, bubbling stream on the other side..", 
						"To your left is a blackberry thicket. There are a few blackberries on the bush.", 
						"Behind you is the flower patch.", 
						"In front of you is the shrine. There is an offering of blackberries at the shrine.")
						out2.innerHTML = ""
					} else if(inventory.contentsOf.includes('note')) {
						outElement.innerHTML = game.look(command, 
						"To your right there is a blackberry thicket. You can hear the small, bubbling stream on the other side..", 
						"To your left is a blackberry thicket. There are a few blackberries on the bush.", 
						"Behind you is the flower patch.", 
						"In front of you is the shrine. You place the note on the shrine, as requested in the note.")
						
					}
					if(outElement.innerHTML == "In front of you is the shrine. You place the note on the shrine, as requested in the note.") {
						setTimeout(function() { printOut('You feel yourself rising out of the forest from some ethereal force.') }, 5000)
						setTimeout(function() { game.end() }, 5000)
					}
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through the blackberry bush.",
								 "shrine",
						"You cannot walk through the blackberry bush",
								 "shrine",
						"You slowly back away from the shrine, back to the safety of the flowers.",
								 "flowers",
						"You cannot walk through the shrine.",
								"shrine")
				out2.innerHTML = ""
			}
}
function streamPlace() {
	out2.innerHTML = ""
	if(command == 'drown') {
		printOut('You drowned in the stream because you wanted to.')
		setTimeout(function() {game.reset()}, 5000)
	}
	var eats = ['fish']
	var items = ['rock', 'stone', 'crayfish', 'fish']
	var poisons = ['crayfish']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is the opposite bank of the stream. Under the water, you can see a crayfish.", 
						"To your left is the patch of flowers and the mushrooms under the oak.", 
						"Behind you is where the stream is coming from, and eventually, its source.", 
						"In front of you is a bend in the stream. You cannot see past the bend.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You step out of the stream and dry yourself off.",
								 "outHut",
						"You exit the stream.",
								 "first",
						"The current is too great to wade up the stream.",
								 "stream",
						"You walk ahead to the bend in the river.",
								"downstream")
				out2.innerHTML = ""
			}
	}

function downstreamPlace() {
	out2.innerHTML = ""
	var eats = ['fish']
	var poisons = []
	var items = ['rock', 'stone', 'fish']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"On the right is a small hut, peeking over the tops of some bushes.", 
						"To your left is some blackberry bushes. You can see the top of a shrine through the bushes.", 
						"Behind you is the part of the stream that you entered.", 
						"In front of you, the stream flows underground, into a massive cliff.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You take your chances and approach the hut.",
								 "outHut",
						"You cannot climb over the blackberry bushes.",
								 "downstream",
						"You decide to start making your way back before anything happens.",
								 "stream",
						"You cannot go underground or up the cliff.",
								"downstream")
				out2.innerHTML = ""
			}
}

function outsidePlace() {
	out2.innerHTML = ""
	var eats = ['blackberry', 'hazelnut']
	var poisons = ['mushroom']
	var items = ['rock', 'stone', 'mushroom', 'hazelnut', 'acorn', 'stick', 'twig', 'blackberry']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To the right is a dense copse of trees.", 
						"To your left is the cliff that the stream ran under.", 
						"Behind you is the stream.", 
						"In front of you is a small straw hut.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through the trees.",
								 "outHut",
						"You cannot walk up the cliff, or through it.",
								 "outHut",
						"You walk back to the stream.",
								 "downstream",
						"You enter the hut cautiously. <br> There doesn't seem to be anyone inside.",
								"inHut")
				out2.innerHTML = ""
			}
}

function insidePlace() {
	out2.innerHTML = ""
	var eats = ['porridge']
	var poisons = []
	var items = ['porridge', 'note']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"On your right is a small wood-burning stove.", 
						"To your left is a table with a note on it. <br> <br> The note says: <br> Please put this on the shrine in the woods. I would appreciate it. Thank you.", 
						"Behind you is the door.", 
						"In front of you is a large leather chair.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through the fire.",
								 "inHut",
						"You approach the table, pick up the note, and hurry out the door, expecting the worst.",
								 "outHut",
						"You walk back out the door.",
								 "outHut",
						"You are about to sit down on the chair when you realize there is a tarantula on the chair.",
								"inHut")
				out2.innerHTML = ""
			}
}	

function doNote() {
	printOut('You walk to the shrine and put the note on the shrine, as requested. <br> As you do this, you feel a sense of enlightenment wash over you, and you feel yourself leaving the forest.')
	setTimeout(function() {game.end()}, 5000)
}

// doAction(): getting form data and calling location functions

function doAction() {
		command = inElement.value;
		inElement.value = "";
		if(command.includes('game') || command.includes('(') || command.includes(')')) {
			eval(command)
		}
		if(command.includes('note') && command.includes('drop')) {
			printOut('It would be unwise to drop the note.');
			return false;
		}
		if(command == 'start' || command == 'Start') {
			game.start()
		} else if(place == 'first') {
			firstPlace()
		} else if(place == 'flowers') {
			flowerPlace()
		} else if(place == 'stream') {
			streamPlace()
		} else if(place == 'shrine') {
			shrinePlace()
		} else if(place == 'firstOak') {
			firstOakPlace()
		} else if(place == 'downstream') {
			downstreamPlace()
		} else if(place == 'outHut') {
			outsidePlace()
		} else if(place == 'inHut') {
			insidePlace()
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

function lit() {
	window.open('https://literallysomeartist.deviantart.com', '_blank')
}

game.end = function() {
	outElement.innerHTML = ""
	out2.innerHTML = ""
	noteElem.innerHTML = ""
	printOut("END OF GAME <br> ------------------------------<br> You have reached the end of this adventure. <br> <br> Game written by Kai Wildberger and art by <a style='color:black; cursor:pointer; text-decoration:underline;' title='her deviantart' onclick='lit()'>Ashlyn Bishop</a><br> <br> <br> <br> May 29th, 2018");
	inElement.style.display = "none"
}

game.start = function() {
	inElement.style.display = "none"
	printOut("<h5>COMMANDS:</h5> <br> move [direction](left right forward back)<br> look [direction] <br> eat [item] <br> pick up/grab [item]")
	setTimeout(function() {game.first()}, 5000);
}

game.look = function(action, rightMess, leftMess, behMess, foMess) {
	if(action.includes('look ') || action.includes('Look ')) {
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
		} else {
			return "I don't understand what you mean."
		}
	}
	if(action.includes('look') || actions.includes('around')) {
		printOut(rightMess + "<br>" + leftMess + "<br>" + behMess + '<br>' + foMess)
	}
}

game.first = function() {
	inElement.style.display = "block"
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You are standing in a forest. You do not remember how you got there or where you are.')
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
