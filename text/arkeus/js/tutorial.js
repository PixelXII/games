var ie = document.getElementById('ie')
var opponent;

var looking = ['right', 'left', 'up', 'down', 'forward', 'back']

// utilities

function first(str) {
    return str.split(' ')[0]
}
function second(str) {
    return str.split(' ')[1]
}
function third(str) {
    return str.split(' ')[2]
}

// locations

function tutorialStart(val) {
    Game.lookLeft = 'To your left you see a small, dilapidated shack. Its corrugated roof is corroded and falling down into the interior of the shack.'
    Game.lookRight = 'On your right there is a small creek filled with rocks, sticks, and tree stumps.'
    Game.lookDown = 'Looking down, you see many tan oak leaves, redwood needles, and the path you\'re walking on.'
    Game.lookUp = 'Above you, sunlight is shining through the clouds and tops of trees, making beautiful dappled sunlight on the forest floor.'
    Game.lookForward = 'Ahead, trail continues on for about 500 feet up a steep hill before turning down, around a large rockpile, and out of sight.'
    Game.lookBack = 'Behind you, trail fades away into the forest behind you. About 200 feet back, there is a very unstable-looking bridge.'
    
    Game.right = 'creek'
    Game.left = 'shack'
    Game.forward = 'rockpile'
    Game.back = 'bridge'
    
    if(val === 'skip tutorial') {
        consul.hp('You skipped the tutorial.')
        Player.location = 'nw-saeur'
        return false;
    }
    
    Game.moveForward = 'You follow the trail to the pile of rocks. There\'s about 10 large rocks in the pile, and they seem to have been placed there for a reason.'
    if(first(val) == 'look') {
        Game.look(second(val))
    }
    if(val == 'move forward') {
        Game.move(second(val))
    } else {
        consul.log(Game.placeholder)
        consul.log('Move forward to continue the tutorial')
    }
}

function tutorialPile(val) {
    Game.lookLeft = 'On your left, you see the pile of rocks. The rocks are rugged, and they look almost mined.'
    Game.lookRight = 'There is a very old-looking tree stump on your right.'
    Game.lookDown = 'Below is the gravelly path. The pebbles that make up this path seem like they were taken from the creek.'
    Game.lookUp = 'Looking up at the sky, you see the sun just beginning to peek out from behind the clouds.'
    Game.lookForward = 'In front of you, you see the entrance to a small tunnel. There is a flickering light coming from the inside of the tunnel, making shadows dance eerily.'
    Game.lookBack = 'Behind you, you can make out the shape of the cabin, down at the bottom of the hill.'
    
    Game.forward = 'mine'
    
    Game.moveForward = 'You walk into the tunnel entrance. Now you can see that the source of the flickering light is a group of 3 torches mounted on the wall.'
    if(first(val) == 'look') {
        Game.look(second(val))
    }
    if(val == 'move forward') {
        Game.move(second(val))
    } else {
        consul.log(Game.placeholder)
        consul.log('Move forward to continue the tutorial.')
    }
}

function tutorialMine(val) {
    Game.lookLeft = 'On your left and right are the walls of the tunnel. They are made of packed dirt and supports every 10 feet.'
    Game.lookRight = 'On your right, one of the supports holding the tunnel ceiling has begun to rot.'
    Game.lookDown = 'Looking down, you see the gently sloping tunnel floor. The dirt crunches softly against your feet, echoing along the length of the tunnel.'
    Game.lookUp = 'Above you is the tunnel ceiling and the struts that support it.'
    Game.lookForward = 'Ahead, you see a large opening. You can see a campfire blazing in the center of the chamber.'
    Game.lookBack = 'A few feet behind you is the tunnel opening.'
    
    Game.forward = 'chamber'
    
    Game.moveForward = 'You carefully step into the large chamber and find yourself face-to-face with a man dressed in overalls and has a pickaxe slung over his back. He snarls, grabs his pickaxe, and starts swinging at you.'
    
    if(first(val) == 'look') {
        Game.look(second(val))
    }
    if(val == 'move forward') {
        Game.move(second(val))
    } else {
        consul.log(Game.placeholder)
        consul.log('Move forward to continue the tutorial')
    }
}

var tutorialChamber = function(val) {
    Game.location.opponent = {
        name: 'Miner',
        hp:Player.hp,
        weapon: IronSword,
        type: 'opponent',
        dead: false
    }
    if(first(val) === 'attack') {
        Player.inCombat === true
        Game.combat(document.getElementById('ie'))
    } else {
        consul.log("'attack' to continue the tutorial")
    }
    tutorialChamber = function(val) {
        if(val == 'attack') {
            Player.inCombat === true;
            Game.combat(document.getElementById('ie'))
        } else if(first(val) === 'move') {
            if(Game.location.opponent.dead === true) {
                Game.moveForward = 'You step over the miner\'s body and make your way to the tunnel on the far side of the chamber. <br> <br> Here, you should do "items", then "take stone" to continue.'
            } else {
                Game.moveForward = 'You dodge his blow and quickly run off to the other tunnel entrance. He trips over the log he was sitting on and knocks himself out. <br> <br> Here, you should do "items", then "take stone" to continue.'
            }
            Game.forward = 'second-tunnel'
            Game.move(second(val))
        } else {
             if(val === 'items') {
                  return false;
             }
            if(Game.location. opponent.dead === true) {
                consul.log('Move forward to continue the tutorial.')
            } else {
                consul.log("'attack' to continue the tutorial")
            }
        }
    }
}

var sTunnel = function(val) {
    Game.location.items = [Stone]
    Game.location.containers = []
    if(Game.location.opponent.dead === true) {
        Game.lookBack = 'Behind you is the cavern where the old miner\'s body lies.'
    } else {
        Game.lookBack = 'Behind you is the cavern where the miner lies unconscious.'
    }
    Game.lookForward = 'In front of you, the tunnel curves away, to the right. You cannot see anything past there, as it is too dark to make anything out.'
    Game.lookRight = 'On your right, the wall of the tunnel begins to transition from dirt to more coarse soil.'
    Game.lookLeft = 'On your left, there is a support that is holding up the tunnel.'
    Game.lookUp = 'Above, the struts that hold up the tunnel ceiling have begun to sag.'
    Game.lookDown = 'Down at your feet is a small stone. It shimmers with a dull blue light.'
    
    if(first(val) === 'take') {
        Game.take(val.replace(first(val)+' ', ''))
    } else if(first(val) == 'look') {
        Game.look(second(val))
    } else if(first(val) == 'move') {
        Game.moveForward = 'You walk farther down the tunnel and around the bend, and find yourself in a large cavern.'
        Game.forward = 'shrine'
        Game.move(second(val))
    } else if(first(val) == 'take') {
        Game.take(rest(val))
    } else if(first(val) === 'items') {
        Game.items()
    } else if(first(val) === 'drop') {
        Game.drop(eval(capitalClean(rest(val))))
    }
    sTunnel = function(val) {
        if(first(val) === 'take') {
            Game.take(rest(val))
        } else if(first(val) === 'look') {
            Game.look(second(val))
        } else if(first(val) == 'move') {
            Game.moveForward = 'You walk farther down the tunnel and around the bend, and find yourself in a large cavern. <br> <br> Here, you should "drop stone"'
            Game.forward = 'shrine'
            Game.move(second(val))
        } else if(first(val) == 'take') {
            Game.take(rest(val))
        } else if(first(val) == 'items') {
            Game.items()
        } else if(first(val) === 'drop') {
            Game.drop(rest(val))
        }
    }
}

function shrineTutorial(val) {
    Game.lookBack = 'Behind you is the small tunnel where you found the shiny stone.'
    Game.lookForward = 'In front of you is a shrine with a space in it, exactly the same size as the stone you picked up.'
    Game.lookLeft = 'On your left is the wall of the cavern. There\'s moss and other plants on it as well.'
    Game.lookRight = 'On your right is the other wall of the cavern. Many large plants and ferns are growing off the wall.'
    Game.lookUp = 'Looking up, you cannot find the ceiling in the darkness. Enough light comes through the tunnel from the miner\'s chamber that you can see the shrine, but not enough to illuminate the ceiling.'
    Game.lookDown = 'The floor of this large chamber is made of mossy, old stone bricks. It looks that they were once beautiful and clean, but now they are chipped, and nature has overtaken them.'
    
    if(first(val) === 'drop') {
        Player.inventory = []
        consul.emphasis('You put the stone in its seemingly designated spot on the shrine. You hear stone grating against stone, and then you see a stairwell appearing. <br> <br> You go up the stairwell into the world.')
        consul.shadow('You have left the tutorial. You are now in the \'real\' world.')
            Player.location = 'nw-saeur'
        setTimeout(function() {
            
        })
    } else if(first(val) == 'look') {
        Game.look(second(val))
    } else {
         consul.log('"drop stone" to end the tutorial."')
    }
}
