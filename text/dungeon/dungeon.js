/* 

Hello.

Thanks for caring about the source for this game.

I am twelve and I am just beginning to understand how I can make a JavaScript game. 
The code is probably horribly messy and things aren't functioning perfectly...but it works!
I got my friend to do some art for me, to add some more visual elements to the game.
If you have a bug, issue, or something else, go to the github repo at github.com/PixelXII/games

*/

// Variables
var output = "type start to begin <br> <br> <p style='font-size:12px;'>Sorry about the mobile support issues</p>"
var command = null;
var note;
var place = 1
var thing;
var mainEats = ['cactus fruit']
var mainPoisons = ['']
var pickUp = ['pick up', 'pick', 'grab', 'take']
var eatWords = ['eat', 'consume']
var nonEats = ['rock', 'cactus', 'stick', 'twig', 'torch', 'sand']
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





function sure() {
	out2.innerHTML = ""
	var eats = ['']
	var poisons = ['']
	var items = ["bone", "rock"]
	eating(eats, items, poisons)
	if(command.includes('look')) {
	outElement.innerHTML = game.look(command,
	 "On your right there is the wall of the dungeon. The bricks have a lot of moss on them and are very worn.", 
	 "To your left is the other wall of the dungeon.", 
   	 "Behind you is a locked door.",
   	 "In front of you is a spider.",
	 "Above you is one bright star in the shape of a pineapple.", 
	 "Below you is a slab of glass. Below you, you can see a strange, blocky shape. It looks like a slice of desert hanging in the sky."
    )
	}
	if(command.includes('walk') || command.includes('step') || command.includes('move')) {
  outElement.innerHTML = game.move(command, 
		"You walk to the statue.",
								 "thanks",
		"You walk through the portal.",
								 "portal",
		"You approach the raven.",
								 "thanks",
		"Walking forward, you burn yourself on the pineapple and fall off the slab of glass.",
								"well")
	}
}
	

function firstPlace() {
	out2.innerHTML = ""
	var eats = ['']
	var poisons = ['']
	var items = ["bone", "rock"]
	eating(eats, items, poisons)
	if(command.includes('look')) {
	outElement.innerHTML = game.look(command,
	 "On your right there is the wall of the dungeon. The bricks have a lot of moss on them and are very worn.", 
	 "To your left is the other wall of the dungeon.", 
   	 "Behind you is a locked door.",
   	 "In front of you is a zombie. Behind it, you can see the darkness of a small passageway.",
	 "Above you is darkness. You can assume that the ceiling of the dungeon is above you, but you cannot see it.", 
	 "Below you is the floor of the dungeon. The flagstones are worn and cracked."
    )
	}
	if(command.includes('walk') || command.includes('step') || command.includes('move')) {
  outElement.innerHTML = game.move(command, 
		"You cannot walk through walls.",
								 1,
		"You cannot walk through walls.",
								 1,
		"You cannot pick the lock of the door or break it down.",
								 1,
		"You approach the zombie carefully.",
								2)
	}
}

function secondPlace() {
	out2.innerHTML = ""
	var eats = ['']
	var poisons = ['']
	var items = ["bone", "rock"]
	eating(eats, items, poisons)
	if(command.includes('look')) {
	outElement.innerHTML = game.look(command,
	 "On your right there is one of the walls of the dungeon. The bricks are mossy and have been used a lot.", 
	 "To your left is another wall of the dungeon.", 
   	 "Behind you is the place you started.",
   	 "In front of you is a very dark and small passageway.",
	 "Above you is darkness. You can assume that the ceiling of the dungeon is above you, but you cannot see it.", 
	 "Below you is the floor of the dungeon. You can see a few zombie guts and intestines scattered about."
    )
	}
	if(command.includes('walk') || command.includes('step') || command.includes('move')) {
  outElement.innerHTML = game.move(command, 
		"You cannot walk through walls.",
								 2,
		"You cannot walk through walls.",
								 2,
		"You make your way around the innards of the zombie and head back to the door.",
								 1,
		"You start down the passage.",
								3)
	}
}

function doAction() {
		command = inElement.value;
		inElement.value = ""; 
    	if(command == 'inventory' || command == 'show inventory') {
			if(inventory.contentsOf.length === 0) {
				printOut('There is nothing in your inventory.')
			} else {
				printOut(inventory.contentsOf.toString().replace(',', ', '))
				var inter = setInterval(function() { outElement.innerHTML.replace(',', ', ') }, 10)
				setTimeout(function() { clearInterval(inter) }, 50)
			} 
    	}
	if(command == 'thanks') {
		printOut("You're welcome")
	}
		if(command == 'start' || command == 'Start') {
			game.start()
		}
		if(place == 'thanks') {
			sure()
		} else if(place == 'portal') {
			place = prompt('enter a place')
		} else if(place == 1) {
			firstPlace()
		} else if(place == 2) {
			secondPlace()
		}
		if(place == 'end') {
			game.end()
		} 
		if(outElement.innerHTML == 'undefined') {
			printOut("I don't understand what you're trying to do.", "")
		}
		if(roomCheck() === true) {
			printOut(npc())	
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
	printOut("END OF GAME <br> ------------------------------<br> You have reached the end of this adventure. <br> <br> Game written by Kai Wildberger and art by <a style='color:black; cursor:pointer; text-decoration:underline;' title='her deviantart' onclick='lit()'>Ashlyn Bishop</a><br> <br> <br> <br> May 29th, 2018");
	inElement.style.display = "none"
}

game.start = function() {
	inElement.style.display = "none"
	printOut("move [direction](up down left right forward back)<br> look [direction] <br> eat [item] <br> pick up/grab [item] <br> drop[item] <br> inventory (to display inventory)")
	setTimeout(function() {game.first()}, 7000);
}

game.look = function(action, rightMess, leftMess, behMess, foMess, upMess, downMess) {
	if(action.includes('look ') || action.includes('Look ')) {
		if(action.includes('right')) {
			return rightMess;
		} else if(action.includes('left')) {
			return leftMess;
		} else if(action.includes('backwards') || action.includes('behind me') || action.includes('behind') || action.includes(' back')) {
			  return behMess;
		} else if(action.includes('forward') || action.includes('ahead')) {
			return foMess;
		} else if(action.includes('up')) {
			return upMess
		} else if(action.includes('down')) {
			return downMess
		} else if(action.includes('around')) {
			return rightMess + '<br>' + leftMess + '<br>' + behMess + '<br>' + foMess
		} else {
			return "I don't understand what you mean."
		}
	}
}

game.first = function() {
	inElement.style.display = "block"
	noteElem.innerHTML = "<p style='font-size:12px;'>game written by kai wildberger</p>"
	printOut('You find yourself in a dungeon, surrounded by damp darkness and stone.')
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
				console.log(thing + ' taken')
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
		if(mainEats.includes(thing)) {
			inventory.spotsUsed--
			if(inventory.contentsOf.indexOf(thing) == inventory.contentsOf.length-1) {
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


// Characters/NPCs.
 
 // Started these at 9 am. I haven't had any coffee this morning, and I am not at my fullest. 
 // I have a small inkling on how to do this, though.
 
 var player = {
	 damage:3,
	 hp:8,
	 exp:0,
	 place:1
 }
 
 var placeInt = setInterval(function() { player.place = place }, 10)
 
 var zombie = {
	 place:2,
	 hp:5,
	 startinghp:5,
	 damage:2
 }
 
 var skeleton = {
	 place:5,
	 hp:3,
	 startinghp:3,
	 damage:2
 }

 var zhp;

var playersTurn = null;
 
function fightZombie() {
	playersTurn = true
	return 'Brutally, you attack the zombie.'
	zombie.hp = zombie.hp - player.damage
	if(outElement.innerHTML === 'Brutally, you attack the zombie') {
			setTimeout(function() {
				playersTurn = false;
				player.hp = player.hp - zombie.damage
				zombieHits++
				return 'The zombie attacks you back mercilessly.'
			}, 5000)
	}
	if(zombie.hp === 0) {
		clearInterval(zhp)
		return 'The zombie has died. You earned ' + zombie.startinghp + place + ' experience points.'
		player.exp = zombie.startinghp + place
		out2.innerHTML = ""
	}
}

 function npc(command) {
	 if(place == zombie.place) {
		 zhp = setInterval(function() { out2.innerHTML = zombie.hp; if(zombie.hp < 0) { zombie.hp = 0 }}, 100)
		 let playerHits = 0;
		 let zombieHits = 0;
		 return '<strong>[encounter]</strong> <br> The zombie has ' + zombie.hp + ' health and does ' + zombie.damage + ' points of damage.'
		 setTimeout(fightZombie(), 5000)
	 }
 }

 function roomCheck(creature) {
 	if(eval(creature+'.place') === player.place) {
 		return true
 	} else {
 		return false
 	}
 }
