var output = "type start to begin <br> <br> <p style='font-size:12px;'>Sorry about there being no mobile support</p>"
var command;
var note;
var place = 1
var thing;
var mainEats = ['pizza']
var mainPoisons = ['trash']
var pickUp = ['pick up', 'pick', 'grab', 'take']
var eatWords = ['eat', 'consume']
var nonEats = ['rock']
var white, red, green, blue, purple, yellow, orange, brown;
var inventory = new Object()
inventory.spotsUsed = 0;
inventory.contentsOf = []
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var noteElem = document.getElementById('note');
noteElem.innerHTML = "<p style='font-size:10px;'>game written by kai wildberger</p>"
var area = ['player']

// Intervals + onload functions
setInterval(function() { inventory.spotsUsed = inventory.contentsOf.length}, 100)
setInterval(function() { undefin() }, 10)
printOut(output)


// Utility functions

function inArea(person) {
	area.push(person)
}

function areaHandler() {
	if(place === 2) {
		inArea('male')
	} else if(place === 3) {
		inArea('unfem')
	} else if(place === 4) {
		inArea('unale')
	} else {
		area = ["player"]
	}
}

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

function undefin() {
	if(outElement.innerHTML === 'undefined') {
			printOut("I don't understand what you're trying to do.", "")
		} else if(outElement.innerHTML == 'He says: "undefined"' || outElement.innerHTML == 'She says: "undefined"' && command.includes('talk')) {
			if(area.includes('male')) {
				printOut('He says: "'+friendlymale.dialogue[1]+'"')
			} else if(area.includes('unale')) {
				printOut('He says: "'+unfriendlymale.dialogue[2]+'"')
			} else if(area.includes('female')) {
				printOut('She says: "'+friendlyfemale.dialogue[3]+'"')
			} else if(area.includes('unfem')) {
				printOut('She says: "' + unfriendlyfemale.dialogue[1]+'"')
			}

			if(command.includes('"') && command.includes('"')) {
				if(command.includes('your') && command.includes('name')) {
					if(roomCheck('male') == true) {
						printOut('He says: "' + friendlymale.name[2]+'"')
					} else if(roomCheck('unale') == true) {
						printOut('He says: "' + unfriendlymale.name[2]+'"')
					} else if(roomCheck('female') == true) {
						printOut('She says: "' + friendlyfemale.name[2]+'"')
					} else if(roomCheck('unfem') == true) {
						printOut('She says: "'+unfriendlyfemale.name[2]+'"')
					}
				}
			}
		}
	if(area.length > 2) {
		if(place === 2) {
			area = ['player', 'male']
		} else if(place === 3) {
			area = ['player', 'unfem']
		} else if(place === 4) {
			area = ['player', 'unfem']
		}
	}	
}

setInterval(undefin(), 25) 

// Place functions

function firstPlace() {
	out2.innerHTML = ""
	var eats = []
	var poisons = ['trash', 'juice box']
	var items = ['juice box', 'trash']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a wall.", 
						"To your left is the road.",
						"Behind you is a mass of people waiting at the crosswalk.", 
						"In front of you is a sidewalk lined with small privet trees. Farther up, there is a man on his cell phone leaning against the wall.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through walls.",
								 1,
						"It would be unwise to walk into the road.",
								 1,
						"You walk towards the crosswalk.",
								 3,
						"You walk ahead on the sidewalk, encountering a few people.",
								2)
				out2.innerHTML = ""
			}
}

function secondPlace() {
	out2.innerHTML = ""
	var eats = []
	var poisons = ['trash', 'juice box']
	var items = ['juice box', 'trash']
	eating(eats, items, poisons)
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a wall. There is a man on his cell phone leaning against it.", 
						"To your left is the road.",
						"Behind you is a the segment of sidewalk where you started.", 
						"In front of you is the sidewalk, lined with small privet trees.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through walls.",
								 2,
						"It would be unwise to walk into the road.",
								 2,
						"You walk back to where you came from.",
								 1,
						"You walk ahead on the sidewalk, encountering a few more people.",
								4)
				out2.innerHTML = ""
			}
}


function doAction() {
		areaHandler()
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
		if(place == '1') {
			firstPlace()
		} else if(place == '2') {
			secondPlace()
		}
		if(place == 'end') {
			game.end()
		} 
	npc(command)
	if(command === 'help' || command === 'HELP' || command === 'Help') {
		var past = outElement.innerHTML
		outElement.innerHTML = "move [direction](up down left right forward back)<br> look [direction] <br> eat [item] <br> pick up/grab [item] <br> drop[item] <br> inventory (to display inventory)"
		setTimeout(function() {
			outElement.innerHTML = past
		}, 5000)
	}
}

// event listeners always help

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
	printOut("move [direction](up down left right forward back)<br> look [direction] <br> eat [item] <br> pick up/grab [item] <br> drop[item] <br> inventory (to display inventory) <br> help")
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
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You find yourself in a very large city enclosed by the tallest walls you\'ve ever seen.')
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
	 startinghp: 8,
	 exp:0,
	 place:1
 }
 
 var placeInt = setInterval(function() { player.place = place }, 1000)
 
 var friendlyfemale = {
	 dialogue: ["It's a really nice day today. There isn't a cloud in the sky!", "Oh, hi. Sorry, I didn't see you there.", "Hello."],
	 movement: 3,
	 name: ['Georgia', 'Sunny', 'April', 'Ellie']
 }
 
 var unfriendlyfemale = {
	 dialogue: ['Hi.', 'Who are you?', 'Get outta my way!'],
	 movement: 2,
	 name: ['Kelly', 'Caroline', 'Carol', 'Pam']
 }
 
 var friendlymale = {
	 dialogue: ["Hey, look who's here!", "Hey.", "Yo!"],
	 movement: 4,
	 name: ['George', 'Tyler', 'Jaden', 'Matt']
 }
 
 var unfriendlymale = {
	 dialogue: ["Oh.", "I find it disappointing you're still here.", "Probably shouldn't hang around here..."],
	 movement: 1,
	 name: ["Scott", 'Mack', 'Julian', 'Rob']
 }
 
 function maleInArea(command) {
	if(command.includes('talk')) {
		var ran = Math.random()
		var i;
		if(ran < 0.33) {
			i = 2
		} else if(ran >= 0.33 && ran <= 0.66) {
			i = 1
		} else {
			i = 3
		}
		if(area.includes('male')) {
			printOut('He says: "' + friendlymale.dialogue[i] + '"')
		} else {
			printOut('He says: "' + unfriendlymale.dialogue[i] + '"')
		}
	}
	 if(command.includes('attack') || command.includes('hit') || command.includes('beat') && command.includes('with')) {
		var arr = command.split(' ')
		var thing = arr[arr.length-1]
		if(area.includes('unale')) {
			 if(inventory.contentsOf.includes(thing)) {
				 printOut("You beat the man with the " + thing + ". However, he is more experienced in fights like this and quickly knocks you out.")
				 setTimeout(game.end(), 5000)
			 } else {
				 printOut('You do not have a ' + thing)
			 }
		 } else if(area.includes('male')) {
			   if(inventory.contentsOf.includes(thing)) {
			 	printOut("You hit the man with the " + thing + ". You are at an advantage here and you quickly knock him out.")
		 	   } else {
				   printOut('You do not have a ' + thing)
			   }
	 	} 
	 } else if(command.includes('"') || command.includes("'")) {
		if(command.includes('your') && command.includes('name')) {
			var ran = Math.random()
			var na;
			var i;
			if(ran < 0.25) {
				i = 1
			} else if(ran >= 0.25 && ran <= 0.5) {
				i = 2
			} else if(ran >= 0.5 && ran <= 0.75) {
				i = 3
			} else {
				i = 4
			}
			if(area.includes('unale')) {
			   	printOut('He says: "'+unfriendlymale.name[i]+'."')
			} else if(area.includes('male')) {
				printOut('He says: "'+friendlymale.name[i]+'."')
			}
		}
	}
 }


function femaleInArea(command) {
	if(command.includes('talk')) {
		var ran = Math.random()
		var i;
		if(ran <= 0.33) {
			i = 1
		} else if(ran >= 0.33 && ran <= 0.66) {
			i = 2
		} else {
			i = 3
		}
		if(area.includes('female')) {
			printOut('She says: "' + friendlyfemale.dialogue[i] + '"')
		} else {
			printOut('She says: "' + unfriendlyfemale.dialogue[i] + '"')
		}
	}
	 if(command.includes('attack') || command.includes('hit') || command.includes('beat') && command.includes('with')) {
		var arr = command.split(' ')
		var thing = arr[arr.length-1]
		if(area.includes('unfem')) {
			if(inventory.contentsOf.includes(thing)) {
				printOut("You hit the woman with the " + thing + ". She brushes it off and dispatches you with one swift blow.")
			} else {
					 printOut('You do not have a ' + thing)
			}
		} else if(area.includes('fem')) {
			if(inventory.contentsOf.includes(thing)) {
				printOut('You hit the woman with the ' + thing + '. You quickly realize your mistake as she screams and knocks you out with her flailing fists.')
			} else {
				printOut('You do not have a ' + thing)
			}
	 }
 } else if(command.includes('"') || command.includes("'")) {
		if(command.includes('your') && command.includes('name')) {
			var ran = Math.random()
			var na;
			var i;
			if(ran < 0.25) {
				i = 1
			} else if(ran >= 0.25 && ran <= 0.5) {
				i = 2
			} else if(ran >= 0.5 && ran <= 0.75) {
				i = 3
			} else {
				i = 4
			}
			if(area.includes('female')) {
				printOut('She says: "'+friendlyfemale.name[i]+'."')
			} else if(area.includes('unfem')) {
				printOut('She says: "'+unfriendlyfemale.name[i]+'."')
			}
		}
	}
}
 




 

function npc(command) {
	if(roomCheck('female') || roomCheck('unfem')) {
		femaleInArea(command)
	} else if(roomCheck('male') || roomCheck('unale')) {
		maleInArea(command)
	} 
}
			

function roomCheck(person) {
	 if(area.includes(eval("'"+person+"'"))) {
		 return true;
	 } else {
		 return false;
	 }
 }
