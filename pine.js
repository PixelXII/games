// Technical things -- getting the output in the right place, setting event listeners etc
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

function climbWall() {
	var rand = Math.random();
	var fall = false;
	if(rand > 0.7) {
	if(fall === false) {
	outElement.innerHTML = "You climb up the rock face, slowly but surely. Suddenly, you slip and fall back down to the streambed."
	fall = true;
	} else {
		outElement.innerHTML = "You climb up the rock face, a little slower this time after your fall. Once again, you tumble down the rock face and land on the streambed."
		j = false;
	}
	} else {
		printOut('You climb up the rock slowly. When you reach the small ledge at the top, you can see farther into the cave. <br> <br> The entrance is grand and open, but as it goes farther in, the ceiling and walls close in tighter.');
		place = "ledge"
	}	
}

function canyonPlace() {
	if(command.includes('climb') && command.includes('rock') || command.includes('wall')) {
		climbWall()
	} else if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right, there is a steep gorge wall. <br><br> A massive boulder perches on the edge of a tree stump.", 
						"To your left, there is a tree on the canyon wall, precariously leaning over the gorge. <br><br> A cave opens up about halfway up the wall of the canyon. You can see marks where people before you have climbed up the wall.", 
						"Behind you is the tunnel.", 
						"In front of you is the dried-up stream. Many rocks and sticks are haphazardly strewn across the streambed.")
						out2.innerHTML = ""
	} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot move into the stump.",
								 "canyon",
						"You cannot <i>walk</i> up the side of the rock.",
								 "canyon",
						"You walk through the tunnel, back to where you began.",
								 "first",
						"As you step over fallen trees and rocks, you see a pool of water ahead.",
								"stream")
				out2.innerHTML = ""
			}
}	

function ledgePlace() {
	if(command.includes('climb') && command.includes('down')) {
					outElement.innerHTML = "You climb back down the rock face, with some difficulty.";
					place = 'canyon';
				} else if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a madrone tree. Its roots look worn, and its bark is peeling.", 
						"To your left, a sheer drop cuts into the ledge. Looking down, you can see a sharp rock, waiting for something to impale. <br> <br> You decide to step away from the drop-off.", 
						"Behind you is the rock face you climbed.", 
						"In front of you is the cave entrance.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot move into the tree.",
								 "ledge",
						"You tell yourself that nothing matters and hurl yourself at the rock below. <br> <br> <br> END OF GAME <br> [You killed yourself]",
								 "reset",
						"You cannot <i>walk</i> down a rock face.",
								 "ledge",
						"You push ahead and make your way into the cave.",
								"cave")
			}
}

function streamPlace() {
	if(command.includes('look')) {
				outElement.innerHTML = game.look(command, 
					"To your right there is a mossy boulder. <br> The moss makes a certain pattern on the boulder that implies that an immature human was there and influenced the shape of the moss.", 
					"On the left is an ancient tree. The tree is an awe-inspiring one, and when you look at the tree you can see many burnt portions and scars from its years in the gorge.", 
					"Behind you is the dried-up stream and tunnel.", 
					"In front of you is a pool of water.")
		out2.innerHTML = ""
	} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
			outElement.innerHTML = game.move(command, 
					"You cannot move into the boulder.",
								"stream",
					"That tree is too high to climb.",
								"stream",
					"You decide you have other places to go and walk back up the streambed.",
								"canyon",
					"You take off your clothes and take a dip in the beautiful blue water. <br><br> You misjudged the depth of the pool, and out of the darkness below comes an immense creature. <br> You scream as it drags you below, but no one can hear you. <br> <br> <br> END OF GAME <br> [You were eaten]",
								"reset")
			}
}

function cavePlace() {
	if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right there is a stalagmite. There seems to be a swarm of creatures around it.", 
						"To your left, a stalagtite precariously hangs down from the ceiling.", 
						"Behind you is the entrance to the cave. Light spills in from the entrance.", 
						"In front of you is a staircase. You cannot see where the rope leads to.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('crawl') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot move into the stalagmite.",
								 "cave",
						"Ducking under the stalagtite, you find yourself in an impossibly large cavern.",
								 "cavern",
						"You chicken out and stand on the ledge again.",
								 "ledge",
						"You continue on, despite the ominous feeling in your gut.",
								"caveTwo")
			} else if(command.includes('walk')) {
				out2.innerHTML = "There is not enough headroom to walk."
			}
}

function cavernPlace() {
	 if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"You cannot see anything to your right. You see darkness.", 
						"You cannot see anything to your left besides darkness.", 
						"Behind you is the stalagtite you ducked underneath to get to this place.", 
						"You cannot see in front of you.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You step to the right, and then feel yourself falling. <br> <br> <br> END OF GAME <br> [You fell from a high hight]",
								 "reset",
						"You step to the left, and then feel yourself slowly sinking. You realize, too late, that you have stepped into a puddle of quicksand. <br> <br> <br> END OF GAME <br> [You drowned in quicksand]",
								 "reset",
						"As you cautiously step back to the stalagtite, you feel the earth below you give a great shake, and then fall, bringing you down into the bowels of the earth. <br> You feel as though you are in a very large opening.",
								 "deep",
						"You feel a nasty push from behind as you take a step forward. The push is enough to send you flying, and, as you land, your head hits a stone and you black out. <br> <br> <br> END OF GAME <br> [You were pushed too hard]",
								"reset")
			}
}

function cave2() {
	 if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"To your right is the wall of the passageway.", 
						"To your left is the wall of the passageway.", 
						"Behind you is the opening at the very start of the cave.", 
						"In front of you is the staircase leading down.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You cannot walk through walls.",
								 "caveTwo",
						"You cannot walk through walls.",
								 "caveTwo",
						"Your better senses tell you to leave the cave completely.",
								 "cave",
						"You decide to take a risk and walk down the stairs. <br> <br> Eventually, the stairs end and you find yourself in a very large space.",
								"deep")
			}
}

function deep() {
	if(command.includes('follow') && command.includes('white line')) {
			printOut('You follow the white line. <br> It leads you to a massive hole in the ground.')
			place = 'hole'
		} else if(command.includes('look')) {
					outElement.innerHTML = game.look(command, 
						"You can see that a torch is mounted on the wall.", 
						"To your left, there is a campfire with figures around it. <br> <br> You cannot identify the species of these creatures.", 
						"There are stairs behind you.", 
						"There is a long white line in front of you.")
			out2.innerHTML = ""
			} else if(command.includes('move') || command.includes('walk') || command.includes('step') || command.includes('go')) {
				outElement.innerHTML = game.move(command, 
						"You burn your hair on the torch and jump back, alarmed.",
								 "deep",
						"On your way to the campfire, you trip over a root, hidden in the darkness. You fly forward and land, headfirst, in the campfire. <br> <br> <br> END OF GAME <br> [You hit your head too hard]",
								 "reset",
						"You decide to forget about the torches and line and hightail it up the stairs.",
								 "cave",
						"Following the white line, you reach a massive hole in the ground.",
								"hole")
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
		} else if(place == 'canyon') {
			canyonPlace()
		} else if(place == 'ledge') {
			ledgePlace()
		} else if(place == 'reset') {
			game.reset()
		} else if(place == 'stream') {
			streamPlace()
		} else if(place == 'cave') {
			cavePlace()
		} else if(place == 'cavern') {
			cavernPlace()
		} else if(place == 'caveTwo') {
			cave2()
		} else if(place == 'deep') {
			deep()
		} else if(place == 'hole') {
			if(command.length >= 0) {
				printOut('You feel an ethereal power forcing your will to bend. Your body ignores your commands and throws itself off the cliff.');
				place = 'end'
			}
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

// The actual game

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
}

game.start = function() {
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
		}
	}
}

game.first = function() {
	noteElem.innerHTML = "game written by kai wildberger"
	printOut('You are standing at the entrance to a tunnel which leads under a road. <br> Behind you, to the north, is a steep rock face.',
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
		}
		
	}
}
