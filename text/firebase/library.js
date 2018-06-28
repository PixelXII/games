
var command;
var note;
var place = 1
var thing;
var beaten = false;
var pickUp = ['pick up', 'pick', 'grab', 'take']
var eatWords = ['eat', 'consume']
var white, red, green, blue, purple, yellow, orange, brown;
var inventory = {
	spotsUsed: 0,
	contentsOf: [];
}
var area = ['player']

// Intervals + onload functions
setInterval(function() { inventory.spotsUsed = inventory.contentsOf.length}, 100)
setInterval(function() { undefin(); }, 10)

// Utility functions

function timeout(action, time) {
	setTimeout(function() { eval(action)  }, time)
}

function inArea(person) {
	area.push(person)
}

function areaHandler(area1, person1, area2, person2, area3, person3, area4, person4) {
	if(place === area1) {
		if(beaten === false) {
			inArea(person1)
		}
	} else if(place === area2) {
		if(beaten === false) {
			inArea(person2)
		}
	} else if(place === area3) {
		if(beaten === false) {
			inArea(person3)
		}
	} else if(place === area4) {
		if(beaten === false) {
			inArea(person4)
		}
	} else {
		area = ["player"]
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
			throw new Error('There was an unrecognised command. ~ ???')
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
			throw new Error('There was an error with the speech.')
		}
	if(area.length > 2) {
		if(place === 2) {
			area = ['player', 'male']
		} else if(place === 3) {
			area = ['player', 'unfem']
		} else if(place === 4) {
			area = ['player', 'unale']
		}
	}	
} 

var game = new Object()

game.reset;
game.end;
game.start = function() {
	return "move [direction](up down left right forward back)<br> look [direction] <br> eat [item] <br> pick up/grab [item] <br> drop[item] <br> inventory (to display inventory) <br> talk to (person) <br> hit (person) with (item[fist]) <br> \"what is your name?\" <br> help")
	setTimeout(function() {game.first()}, 7000);
}
game.first = function(des) {
	place = 1
	return des
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

game.pickUp = function(action, eats, items, poisons) {
	if(inventory.spotsUsed === 3) {
			return 'Your hands are full.'
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
				return "You don't see a " + thing
			} else {
				inventory.contentsOf.push(thing)
				return 'You have a ' + thing
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
			return "You do not have a " + thing
		} 
		if(mainEats.includes(thing)) {
			inventory.spotsUsed--
			if(inventory.contentsOf.indexOf(thing) == inventory.contentsOf.length-1) {
				inventory.contentsOf.pop()
			} else {
				var index = inventory.contentsOf.indexOf(thing);
  				array.splice(index, 1);
			}
			return 'Eaten'
		} else {
			return "You cannot eat that."
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
			return "You do not have a " + thing
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
			return 'You do not have a '+thing+' anymore'
		}
		console.log(thing+' dropped')
	}
 }
 
 var friendlyfemale = {
	 dialogue: [],
	 name: '',
 }
 
 var unfriendlyfemale = {
	 dialogue: [],
	 name: '';
 }
 
 var friendlymale = {
	 dialogue: [],
	 name: '';
 }
 
 var unfriendlymale = {
	 dialogue: [],
	 name: '';
 }
 var place2name;
 function maleInArea(command, beatmess, unfriendlyMaleFunction, friendlyMaleFunction) {
	if(command.includes('talk')) {
		if(beaten === true) {
			return beatmess
		} else {
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
				return 'He says: "' + friendlymale.dialogue[i] + '"'
			} else {
				return 'He says: "' + unfriendlymale.dialogue[i] + '"'
			}
		}
	}
	 if(command.includes('attack') || command.includes('hit') || command.includes('beat') && command.includes('with')) {
		var arr = command.split(' ')
		var thing = arr[arr.length-1]
		if(command.includes('attack') || command.includes('hit') && command.includes('with') === false) {
			throw new Error('You must specify an item to hit him with. \'fist\' is valid')
			return 'What do you hit him with? <br> <br> <p style=\'font-size:10px;\'>this can be a "fist"</p>'
		}
		if(area.includes('unale')) {
			 if(inventory.contentsOf.includes(thing) || thing === 'fist' || thing === 'fists' || thing === 'hands') {
				 unfriendlyMaleFunction()
			 } else {
				 return 'You do not have a ' + thing
			 }
		 } else if(area.includes('male')) {
			   if(inventory.contentsOf.includes(thing) || thing === 'fist' || thing === 'fists' || thing === 'hands') {
			 	friendlyMaleFunction()
		 	   } else {
				  return 'You do not have a ' + thing
			   }
	 	} 
	 } else if(command.includes('"') || command.includes("'")) {
		if(command.includes('your') && command.includes('name')) {
			if(area.includes('unale')) {
			   	return 'He says: "'+unfriendlymale.name+'."'
			} else if(area.includes('male')) {
				return 'He says: "'+friendlymale.name+'."'
			}
		}
	}
 }

function femaleInArea(command, beatmess, unfriendlyFemaleFunction, friendlyFemaleFunction) {
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
			return 'She says: "' + friendlyfemale.dialogue[i] + '"'
		} else {
			return 'She says: "' + unfriendlyfemale.dialogue[i] + '"'
		}
	}
	 if(command.includes('attack') || command.includes('hit') && command.includes('with')) {
		var arr = command.split(' ')
		var thing = arr[arr.length-1]
		if(command.includes('attack') || command.includes('hit') || command.includes('beat') && command.includes('with') === false) {
			throw new Error('You must specify an item to hit her with. fist is valid')
			return 'What do you hit her with? <br> <br> <p style=\'font-size:10px;\'>this can be a "fist"</p>'
		}
		if(area.includes('unfem')) {
			if(inventory.contentsOf.includes(thing) || thing === 'fist' || thing === 'fists' || thing === 'hands') {
				unfriendlyFemaleFunction()
			} else {
					 return 'You do not have a ' + thing
			}
		} else if(area.includes('fem')) {
			if(inventory.contentsOf.includes(thing) || thing === 'fist' || thing === 'fists' || thing === 'hands') {
				friendlyFemaleFunction()
			} else {
				return 'You do not have a ' + thing)
			}
	 }
 } else if(command.includes('"') || command.includes("'")) {
		if(command.includes('your') && command.includes('name')) {
			if(area.includes('female')) {
				return 'She says: "'+friendlyfemale.name+'."'
			} else if(area.includes('unfem')) {
				return 'She says: "'+unfriendlyfemale.name+'."'
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
