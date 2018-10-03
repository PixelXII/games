var opponent, Mm;
var nwS = function(val) {
     Game.reset()
     Crate = new Container('crate', [SteelSword, new Gold(Math.round(Math.random()*100))])
    Game.lookForward = 'Ahead of you is a road leading to a small village.'
    Game.lookBack = 'Behind you is the tunnel entrance, now sealed over with a strong iron grate.'
    Game.lookRight = 'To your right is a massive oak tree. It looks like it\'s hundreds of years old.'
    Game.lookLeft = 'To your left is a river. It rushes by at a swift pace, and you can see fish jumping in and out of the river.'
    Game.lookDown = 'Below you is the ground. The soft, loamy soil squishes and compresses beneath your feet.'
    Game.lookUp = 'Above, a few raptors drift lazily in the few clouds scattered across the sky. You relax as a warm breeze blows across your face.'
    Game.moveForward = 'You walk down the road leading to the village.'
    Game.forward = 'outskirts'
    Game.moveBack = 'You cannot move through the grate.'
    Game.back = 'nw-saeur'
    Game.left = 'nw-saeur'
    Game.right = 'nw-saeur'
    Game.location.items = [Stick, Rock, Acorn]
    Game.location.containers.push(Crate)

    Game.auto(val)
    nwS = function(val) {
         Game.auto(val)
    }
}

var outskirts = function(val) {
     Game.reset()
     Game.lookForward = 'Ahead of you is a small town. There is a sign on the side of the road, telling you that the name of the town is Rivergate.'
     Game.lookBack = 'Behind you is the iron grate.'
     Game.lookRight = 'To your right is a small inn. It\'s called "Bartie\'s Food and Brew"'
     Game.lookLeft = 'On your left is the river.'
     Game.moveBack = 'You move back to the top of the stairs.'
     Game.back = 'nw-saeur'
     Game.moveLeft = 'You cannot step into the river.'
     Game.moveRight = 'You step up to the inn and enter.'
     Game.right = 'barties'
     Game.moveForward = 'You walk into town.'
     Game.forward = 'bridge'

     Game.location.items = [Stick, Rock, Acorn, Stick, Acorn, Pickaxe]
     Game.auto(val)
     outskirts = function(val) {
          Game.lookForward = 'Ahead of you is a small town. There is a sign on the side of the road, telling you that the name of the town is Rivergate.'
          Game.lookBack = 'Behind you is the iron grate.'
          Game.lookRight = 'To your right is a small inn. It\'s called "Bartie\'s Food and Brew"'
          Game.lookLeft = 'On your left is the river.'
          Game.moveBack = 'You move back to the top of the stairs.'
          Game.back = 'nw-saeur'
          Game.moveLeft = 'You cannot step into the river.'
          Game.left = 'outskirts'
          Game.moveRight = 'You step up to the inn and enter.'
          Game.right = 'barties'
          Game.moveForward = 'You walk towards town.'
          Game.forward = 'bridge'
          Game.auto(val)
     }
}

var barties = function(val) {
     Game.reset()
     Game.lookForward = 'In front of you, a small shopkeeper takes care of the store.'
     Game.lookBack = 'Behind you, the door gently rocks on its hinges.'
     Game.lookRight = 'On your right, a doorway opens to a room with many tables and a bar.'
     Game.lookLeft = 'To your left is a small stairway leading up to the second story, where the inn\'s guests sleep.'
     Game.lookDown = 'Below you are the floorboards of Bartie\'s Food and Brew. They are smooothed with use, and you can see stains and dropped trinkets between the cracks.'
     Game.lookUp = "Above, the you see the rafters of the inn."
     Game.moveBack = 'You walk back outside to the road.'
     Game.back = 'outskirts'
     Game.moveRight = 'You walk through the doorway and enter the bar area. There is one man at the bar, and he looks sad and worried about something.'
     Game.right = 'barties-bar'
     Game.moveLeft = 'You trudge up the stairs to the guests\' rooms. <br> <br> You arrive in a long hallway with rooms on the left.'
     Game.left = 'barties-inn'
     var bartie = new Shop('Bartie\'s Food and Brew', 'Bartie', [HealingTea, Ale, Beer, Wine], [HealingTea.value, 25, Beer.value+10, Wine.value+5])
     Game.location.shop = bartie


     Game.auto(val)
}
var jaspersFarm = new Quest("Jasper's Damn Creatures", 'Jasper wants you to help him restore his farm by killing whatever creatures are eating his crops.', function() {
          consul.dialogue('Jasper says: "It\'s not much, but it\'s what I have. I hope it\'s enough."')
          consul.info('Jasper gives you a handful of coins.')
          consul.dialogue('Jasper says: "You don\'t know how much this means to me. My farm can function again!"')
          Player.gold.amount += 20
});
jaspersFarm.dead = 0
var bBar = function(val) {
     Game.reset()
     Game.location.items = [Tankard]
     var Jasper = new Person('Jasper', function() {
          document.getElementById('ie').disabled = true
          consul.dialogue('Jasper says: "Are you here to help me?"')
          setTimeout(function() {
               consul.dialogue('Jasper says: "Some damn critters are eating my crops. I live just towards town and across the river."')
               setTimeout(function() {
                    consul.dialogue('Jasper says: "I need someone to kill the creatures for me. I can\'t do it myself."')
                    setTimeout(function() {
                         consul.dialogue('Jasper thanks you for your help.')
                         jaspersFarm.dead = 0;
                         jaspersFarm.initiate()
                         setTimeout(function() {
                              document.getElementById('ie').disabled = false
                              document.getElementById('ie').focus()
                              consul.dialogue('Jasper says: "Thank you for doing this."')
                              Jasper.dialogue = function() {
                                   consul.dialogue('Jasper says: "Thank you for doing this."')
                              }
                         }, 4000)
                    }, 5000)
               }, 6000)
          }, 5500)
     })
     Game.location.person = Jasper
     Game.lookForward = 'In front of you is the bar and the man sitting at it. His name is Jasper.'
     Game.lookLeft = 'To your left is a small cluster of tables. It looks like there was a drinking competition recently, as there are plenty of stains on the floor, and not just from ale.'
     Game.lookRight = 'To your right is the wall of the inn.'
     Game.lookBack = 'Behind you is the lobby where Bartie sells his wares.'
     Game.moveBack = 'You turn around and head back through the door to the lobby.'
     Game.back = 'barties'
     Game.forward = 'barties-bar'
     Game.left = Game.forward
     Game.right = Game.left

     Game.auto(val)

}

var bInn = function(val) {
     Game.reset()
     Game.location.items = [Mug]
     Game.moveBack = 'You descend back down the stairs and return to the main chamber.'
     Game.back = 'barties'
     Game.lookLeft = 'On your left is a door, leading to a guest\'s room.'
     Game.lookRight = 'On your right is the wall of the hallway.'
     Game.lookForward = 'Ahead the hallway continues for about 100 feet, then stops at a small wall with a painting on it.'
     Game.lookBack = 'Behind you, the stairs lead down to the storefront.'
     Game.lookDown = 'Below you are the floorboards of the hallway.'
     Game.forward = 'barties-hall-end'
     Game.moveForward = 'You walk down the hallway, the floorboards creaking under your feet.'
     Game.right = Player.location
     Game.left = Player.location

     Game.auto(val)
}

var hEnd = function(val) {
     Game.reset()
     Game.moveBack = 'You move back towards the stairs.'
     Game.back = 'barties-inn'
     Game.moveLeft = 'You step inside the room.'
     Game.left = 'barties-room'
     Game.right = 'barties-hall-end'
     Game.forward = Game.right

     Game.lookRight = 'On your right is a small window. You can hear the roaring of the river from inside the hallway.'
     Game.lookLeft = 'On your left is an open door that leads to a guest room. There is no one inside.'
     Game.lookForward = 'On the wall is a painting. You\'ve seen it before, but it doesn\'t ring any bells.'
     Game.lookBack = 'Behind you is the beginning of the hallway, at the top of the stairs.'
     Game.auto(val)
}

var jRoom = function(val) {
     Game.reset()
     var lo = Player.location
     Game.location.items = [Pickaxe, HealingTea, Tankard, Ale]
     Game.moveBack = 'You slowly back out of the room.'
     Game.back = 'barties-hall-end'
     Game.moveForward = lo
     Game.moveRight = lo
     Game.moveLeft = lo
     Game.lookLeft = 'On your left is a small bed.'
     Game.lookRight = 'To your right is a desk and a small nightstand. There is an empty tankard on the desk, and a full one right next to it.'
     Game.lookForward = 'Ahead is the far wall of the room.'
     Game.lookBack = 'Behind you is the small window in the hallway.'
     Game.auto(val)
     jRoom = function(val) {
          var lo = Player.location
          Game.location.items = [Pickaxe, HealingTea, Tankard, Ale]
          Game.moveBack = 'You slowly back out of the room.'
          Game.back = 'barties-hall-end'
          Game.moveForward = lo
          Game.moveRight = lo
          Game.moveLeft = lo
          Game.lookLeft = 'On your left is a small bed.'
          Game.lookRight = 'To your right is a desk and a small nightstand. There is an empty tankard on the desk, and a full one right next to it.'
          Game.lookForward = 'Ahead is the far wall of the room.'
          Game.lookBack = 'Behind you is the small window in the hallway.'
          Game.auto(val)
          jRoom = function(val) {
               var lo = Player.location
               Game.location.items = [Pickaxe, HealingTea, Tankard, Ale]
               Game.moveBack = 'You slowly back out of the room.'
               Game.back = 'barties-hall-end'
               Game.moveForward = lo
               Game.moveRight = lo
               Game.moveLeft = lo
               Game.lookLeft = 'On your left is a small bed.'
               Game.lookRight = 'To your right is a desk and a small nightstand. There is an empty tankard on the desk, and a full one right next to it.'
               Game.lookForward = 'Ahead is the far wall of the room.'
               Game.lookBack = 'Behind you is the small window in the hallway.'
               Game.auto(val)
               jRoom = function(val) {
                    if(val === 'move back') {
                         Game.auto(val)
                         return false;
                    }
                    document.getElementById('ie').disabled = true
                    consul.info('Jasper enters the room.')
                    consul.dialogue('Jasper says: "What are you doing in my room?"')
                    setTimeout(function() {
                         consul.dialogue('Jasper says: "Sneaking around... I don\'t like it."')
                         setTimeout(function() {
                              consul.info('Jasper has left the room.')
                              document.getElementById('ie').disabled = false
                              document.getElementById('ie').focus()
                              jRoom = function(val) {
                                   consul.dialogue('You probably shouldn\'t.')
                              }
                         }, 5600)
                    }, (Math.random()*5500)+1500)
               }
          }
     }
}

function junct(val) {
     Game.reset()
     Game.moveLeft = 'You cross the bridge to the other side. <br> <br> As you get to the other side, a small raccoon jumps up at your face and begins to try to gouge your eyes out.'
     Game.left = 'jFarm'
     Game.moveBack = 'You walk away from town, to the inn entrance.'
     Game.back = 'outskirts'
     Game.moveForward = 'You walk into town.'
     Game.forward = 'rivergate-gate'
     Game.moveRight = 'You cannot step over the wall.'
     Game.right = 'bridge'
     Game.lookRight = 'On your right is a small stone wall. It looks to be around 50 years old.'
     Game.lookLeft = 'On your left is a small wooden bridge. You can see a hammer and a bag of nails nearby, hinting that it was repaired recently.'
     Game.lookDown = 'Below you, a stone road becomes the prevalent feature of the ground. You can see ruts and gaps in the road where carriages and chariots\' wheels have made their mark.'
     Game.lookBack = 'Behind you is the front yard of the inn.'
     Game.lookForward = 'In front of you, the road continues for a short distance, then passes the gates of town and enters Rivergate.'

     Game.auto(val)
}

var jFarm = function(val) {
     Game.reset()
     Game.location.items = [Rock, Pickaxe]
     Game.location.opponent = {
          hp:40,
          name: 'Raccoon',
          weapon: Claws,
          dead: false
     }
     Player.inCombat = true;
     Game.lookForward = 'In front of you is a dilapidated barn.'
     Game.lookRight = 'To your right is a field of unidentifiable vegetables.'
     Game.lookLeft = 'On your left is a large open space. A wall separates it from the farm, and it doesn\'t seem to be part of the farm.'
     Game.lookBack = 'Behind you is the small bridge you crossed over.'
     Game.moveBack = 'You cross over the bridge, back to the road to town.'
     Game.moveForward = 'The door to the barn is locked.'
     Game.moveLeft = 'The wall is too high to climb.'
     Game.moveRight = 'You carefully step through the rows of vegetables and find yourself face-to-face with a large raccoon.'
     Game.right = 'jFarm-field'
     Game.lookDown = 'Below you is the soft, rich soil of the farm.'
     Game.auto(val)

     jFarm = function(val) {
          Game.lookForward = 'In front of you is a dilapidated barn.'
          Game.lookRight = 'To your right is a field of unidentifiable vegetables.'
          Game.lookLeft = 'On your left is a large open space. A wall separates it from the farm, and it doesn\'t seem to be part of the farm.'
          Game.lookBack = 'Behind you is the small bridge you crossed over.'
          Game.moveBack = 'You cross over the bridge, back to the road to town.'
          Game.moveForward = 'The door to the barn is locked.'
          Game.moveLeft = 'The wall is too high to climb.'
          Game.moveRight = 'You carefully step through the rows of vegetables and find yourself face-to-face with a large raccoon.'
          Game.right = 'jFarm-field'
          if(Game.location.opponent.dead === true && Player.quests.includes(jaspersFarm)) {
               jaspersFarm.dead++
          }
          Game.auto(val)
          jFarm = function(val) {
               Game.lookForward = 'In front of you is a dilapidated barn.'
               Game.lookRight = 'To your right is a field of unidentifiable vegetables.'
               Game.lookLeft = 'On your left is a large open space. A wall separates it from the farm, and it doesn\'t seem to be part of the farm.'
               Game.lookBack = 'Behind you is the small bridge you crossed over.'
               Game.moveBack = 'You cross over the bridge, back to the road to town.'
               Game.moveForward = 'The door to the barn is locked.'
               Game.moveLeft = 'The wall is too high to climb.'
               Game.moveRight = 'You carefully step through the rows of vegetables and find yourself face-to-face with a large raccoon.'
               Game.right = 'jFarm-field'
               if(Game.location.opponent.dead === true && Player.quests.includes(jaspersFarm)) {
                    jaspersFarm.dead++
               }
               Game.auto(val)
          }
     }
}

var jField = function(val) {
     Game.reset()
     Game.location.items = [Carrot, Carrot, Potato]
     Game.location.opponent = {
          name: 'large raccoon',
          hp: 50,
          weapon: LargeClaws,
          dead: false
     }
     Player.inCombat = true
     Game.lookLeft = 'On your left is a large expanse of field.'
     Game.lookRight = 'To your right is a small stone wall.'
     Game.lookForward = 'In front of you is the open field. In the distance, you can see a the stone wall.'
     Game.lookBack = 'Behind you is the farm entrance.'
     Game.moveForward = 'You step through the rows of carrots and potatoes and find yourself in front of a large hole.'
     Game.moveBack = 'You retreat back to the farm\'s entrance.'
     Game.back = 'jFarm'
     Game.forward = 'jFarm-hole'
     Game.auto(val)
     jField = function(val) {
          if(Game.location.opponent.dead === true && Player.quests.includes(jaspersFarm)) {
               jaspersFarm.dead++;
          }
          Game.lookLeft = 'On your left is a large expanse of field.'
          Game.lookRight = 'To your right is a small stone wall.'
          Game.lookForward = 'In front of you is the open field. In the distance, you can see a the stone wall.'
          Game.lookBack = 'Behind you is the farm entrance.'
          Game.moveForward = 'You step through the rows of carrots and potatoes and find yourself in front of a large hole.'
          Game.moveBack = 'You retreat back to the farm\'s entrance.'
          Game.back = 'jFarm'
          Game.forward = 'jFarm-hole'
          Game.auto(val)
          jField = function(val) {
               Game.lookLeft = 'On your left is a large expanse of field.'
               Game.lookRight = 'To your right is a small stone wall.'
               Game.lookForward = 'In front of you is the open field. In the distance, you can see a the stone wall.'
               Game.lookBack = 'Behind you is the farm entrance.'
               Game.moveForward = 'You step through the rows of carrots and potatoes and find yourself in front of a large hole.'
               Game.moveBack = 'You retreat back to the farm\'s entrance.'
               Game.back = 'jFarm'
               Game.forward = 'jFarm-hole'
               Game.auto(val)
          }
     }
}

var jFarmhole = function(val) {
     Game.reset()
     Game.lookLeft = 'On your left is an open expanse of field and a small stone wall on the edge.'
     Game.lookRight = 'On your right is a small stone wall.'
     Game.lookForward = 'In front of you is a large hole in the ground.'
     Game.lookDown = 'Below you, the soft soil of the farm transitions to hard, dry dirt as it nears the entrance to the hole.'
     Game.moveForward = 'You drop down into to the hole and begin crawling along the floor of the tunnel. <br> <br> Eventually you come to a small cavern with 2 raccoons.'
     Game.forward = 'jFarm-nest'
     Game.moveBack = 'You slowly back away from the tunnel and go back towards the bridge.'
     Game.back = 'jFarm-field'
     Game.auto(val)
}

var jFarmnest = function(val) {
     Game.reset()
     Game.location.opponent = {
          name: 'large raccoon',
          hp:60,
          weapon: Claws,
          dead: false
     }
     Player.inCombat = true;
     Game.lookLeft = 'To your left is the wall of the cavern.'
     Game.lookRight = 'On your right is the wall of the chamber.'
     Game.lookUp = 'Looking up, you can see many small roots poking through the roof of the chamber.'
     if(Player.quests.includes(jaspersFarm)) {
          Game.lookDown = 'Under your feet are the bones of many small animals and the crops that the raccoon was eating.'
     } else {
          Game.lookDown = 'Under your feet are many bones of small animals.'
     }
     Game.lookBack = 'You look behind you and see a small pinprick of light, where the tunnel opens up onto the farm.'
     Game.lookForward = 'Ahead of you is a wall of rock.'
     Game.auto(val)
     jFarmnest = function(val) {
          Game.lookLeft = 'To your left is the wall of the cavern.'
          Game.lookRight = 'On your right is the wall of the chamber.'
          Game.lookUp = 'Looking up, you can see many small roots poking through the roof of the chamber.'
          if(Player.quests.includes(jaspersFarm)) {
               Game.lookDown = 'Under your feet are the bones of many small animals and the crops that the raccoons were eating.'
          } else {
               Game.lookDown = 'Under your feet are many bones of small animals.'
          }
          Game.lookBack = 'You look behind you and see a small pinprick of light, where the tunnel opens up onto the farm.'
          Game.lookForward = 'Ahead of you is a wall of rock.'
          }
          if(Game.location.opponent.dead && Player.quests.includes(jaspersFarm)) {
               jaspersFarm.complete = true;
          }
          Game.auto(val)
          jFarmnest = function(val) {
               Game.lookLeft = 'To your left is the wall of the cavern.'
               Game.lookRight = 'On your right is the wall of the chamber.'
               Game.lookUp = 'Looking up, you can see many small roots poking through the roof of the chamber.'
               if(Player.quests.includes(jaspersFarm)) {
                    Game.lookDown = 'Under your feet are the bones of many small animals and the crops that the raccoons were eating.'
               } else {
                    Game.lookDown = 'Under your feet are many bones of small animals.'
               }
               Game.lookBack = 'You look behind you and see a small pinprick of light, where the tunnel opens up onto the farm.'
               Game.lookForward = 'Ahead of you is a wall of rock.'
               if(Game.location.opponent.dead && Player.quests.includes(jaspersFarm)) {
                    jaspersFarm.complete = true;
               }
               Game.auto(val)
          }
}
