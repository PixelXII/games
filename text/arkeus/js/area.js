var ie = document.getElementById('ie')
var nwS = function(val) {
     Game.reset()
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
     Game.left = 'outskirts'
     Game.moveRight = 'You step up to the inn and enter.'
     Game.right = 'barties'
     Game.moveForward = 'You walk into town.'
     Game.forward = 'rivergate'
     
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
          Game.moveForward = 'You walk into town.'
          Game.forward = 'rivergate'
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
     var bartie = new Shop('Bartie\'s Food and Brew', 'Bartie', [HealingTea, Ale, Beer, Wine], [10, 10, 15, 20])
     Game.location.shop = bartie
     
     
     Game.auto(val)
}

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
                         var jaspersFarm = new Quest("Jasper's Damn Creatures", 'Jasper wants you to help him restore his farm by killing whatever creatures are eating his crops.', function() {
                              consul.dialogue('Jasper says: "It\'s not much, but it\'s what I have. I hope it\'s enough."')
                              consul.info('Jasper gives you a handful of coins.')
                              consul.dialogue('Jasper says: "You don\'t know how much this means to me. My farm can function again!"')
                              Player.gold.amount += 20
                         })
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
