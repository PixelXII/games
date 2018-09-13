var nwS = function(val) {
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
     Game.lookForward = 'Ahead of you is a small town. There is a sign on the side of the road, telling you that the name of the town is Rivergate.'
     Game.lookBack = 'Behind you is the top of the staircase.'
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
          Game.auto(val)
     }
}

var barties = function(val) {
     Game.location.items = []
     Game.lookForward = 'In front of you, a small shopkeeper takes care of the store.'
     Game.lookBack = 'Behind you, the door swings shut.'
     Game.lookRight = 'On your right, a doorway opens to a room with many tables and a bar.'
     Game.lookLeft = 'To your left is a small stairway leading up to the second story, where the inn\'s guests sleep.'
     Game.lookDown = 'Below you are the floorboards of Bartie\'s Food and Brew. They are smooothed with use, and you can see stains and dropped trinkets between the cracks.'
     Game.lookUp = "Above, the you see the rafters of the inn."
     var barties = new Shop('Bartie\'s Food and Brew', 'Bartie', [HealingTea, Ale, Beer, Wine], [10, 10, 15, 20])
     Game.location.shop = barties
     
     Game.auto(val)
}
