const environments = {
     down: {
          cobblestone: 'The flagstones in the road below you are old and worn with use.',
          forest: 'Below you are some old rotten leaves on the forest floor, and a salamander basks in the sunlight.',
          dirtroad: 'The dirt in the road below you has been sliced by the carriage wheels, leaving deep ruts on both sides of the road.',
          oldtrail: 'The small trail below you hasn\'t been walked on for a very long time, it seems. There\'s vines and annuals all over it, but the general direction of the trail remains clear.',
          newtrail: 'The trail below you looks trimmed recently, and its wideness tells of many feet passing over daily.',
          alley: 'The dank alley floor has puddles and piles of trash all over.',
          woodenFloor: `Below you are the old wooden boards of the floor.`
     },
     up: {
          birds: 'Above you, a flock of birds flies about aimlessly.',
          alley: `Above the alley is a wooden pallet, blocking out most of the sky and preventing any smells from the alley getting into the open tavern window.`,
          clouds: 'A few clouds drift lazily across the sky.',
          cloudless: 'The sun shines, and there isn\'t a cloud in the sky.',
          treeCanopy: 'The branches of the trees stretch out above you, partially blocking the sky from your view.',
          woodCeiling: `Above, the wood in the ceiling has begun to rot and smell awful.`
     }
}
var input;
window.onload = function() {
     input = document.getElementById('ie')
}
var nRiver = function(val) {
     Game.reset()
     Game.location.items = [IronMace]
     Game.lookLeft = 'On your left is a rushing river. The stones in the river are shiny and don\'t seem to be normal stones.'
     Game.lookRight = 'On your right is a forest.'
     Game.lookForward = 'In front of you, a dirt road leads ahead to a small village.'
     Game.lookBack = 'Behind you, densly packed trees prevent you from looking more than 20 feet into the forest.'
     Game.lookUp = environments.up.treeCanopy
     Game.lookDown = environments.down.oldtrail

     Game.moveForward = 'You walk ahead to the dirt road and start making your way to the village.'
     Game.forward = 'rivergate.outskirts'
     Game.auto(val)
     nRiver = function(val) {
          Game.lookLeft = 'On your left is a rushing river. The stones in the river are shiny and don\'t seem to be normal stones.'
          Game.lookRight = 'On your right is a path leading into a forest. The path, covered in dappled sunlight, winds around an old stump and drops out of sight.'
          Game.lookForward = 'In front of you, a dirt road leads ahead to a small village.'
          Game.lookBack = 'Behind you, densly packed trees prevent you from looking more than 20 feet into the forest.'
          Game.lookUp = environments.up.treeCanopy
          Game.lookDown = environments.down.oldtrail
          Game.moveForward = 'You walk ahead to the dirt road and start making your way to the village.'
          Game.forward = 'rivergate.outskirts'
          Game.auto(val)
     }
}

var Rivergate = {
     outskirts: function(val) {
          Game.reset()
          Game.location.shop = new Shop('farmstand', 'Jasper', [Carrot, Potato, Wine, Ale], [15, 10, 25, 15])
          Game.location.person = new Person("Jasper", ['Nice day, isn\'t it?', 'You want to buy something?', 'You gonna buy, or just browsing?', 'Welcome! You\'re the first customer of the day!', 'I\'m almost out, better buy quick!'])
          Game.lookLeft = 'To your left is a small hut. A small man stands outside and yells his wares to the world.'
          Game.lookRight = 'On your right is a large field, fenced off from the road.'
          Game.lookBack = "Behind you is the small forest trail."
          Game.lookForward = 'Ahead, Rivergate hides between a copse of trees and the river.'
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.dirtroad
          Game.moveBack = 'You move back to the small trail in the woods.'
          Game.moveRight = 'You cannot vault the fence.'
          Game.moveForward = 'You continue on to Rivergate.'
          Game.forward = 'rivergate.town'
          Game.back = 'north-rivergate'
          Game.auto(val)
     },
     town: function(val) {
          Game.reset()
          Game.location.person = new Person('Aritran', ['Hi! You must be new around here. Rivergate\'s rather nice, isn\'t it?', 'Hello...', 'Welcome to Rivergate! My name is Aritran.'])
          Game.lookLeft = 'On your left is a small house. A woman stands in front of it, looking rather happy.'
          Game.lookForward = 'Ahead of you is the main village road leading over to the town square.'
          Game.lookRight = 'On your right is a longhouse with a large gate in front.'
          Game.lookBack = 'Behind you is the farmstand next to the dirt road.'
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.cobblestone
          Game.moveRight = 'The gate is locked.'
          Game.moveBack = 'You walk away from town and head back to the dirt road.'
          Game.back = 'rivergate.outskirts'
          Game.moveLeft = "You politely knock on the door. <br> <br> No one answers."
          Game.forward = 'rivergate.market'
          Game.moveForward = 'You walk up the road to the marketplace.'
          Game.auto(val)
     },
     market: function(val) {
          Game.reset()
          Game.location.shop = new Shop('fruit stand', 'the merchant', [Pear, Apple, Dragonfruit, PalmFruit], [Pear.value, 15, 25, 35])
          Game.lookLeft = `On your left is a fruit stand overflowing with fruits. You see pears, apples, dragonfruits, and another fruit that you can't identify by sight.<br>Behind it is a large tavern, called "The Barrel and Staff".`
          Game.lookForward = `Ahead, you see a large fountain. The water in it shimmers in the light.`
          Game.lookDown = environments.down.cobblestone
          Game.lookUp = environments.up.clouds
          Game.moveLeft = 'You go around the fruit stand and enter the tavern.'
          Game.left = 'rivergate.inn'
          Game.lookRight = `On your right is a small alleyway, covered with banners.`
          Game.lookBack = `Behind you is the road through town.`
          Game.moveBack = `You walk back to the road.`
          Game.back = 'rivergate.town'
          Game.moveRight = 'You slip into the alleyway and jump back in surprise as a mouse pokes its head out from behind a small counter.'
          Game.right = 'rivergate.alley'     
          Game.moveForward = 'You go around the fountain and through the town gates, and you end up on the edge of town.'
          Game.forward = `rivergate.edge`
          Game.auto(val)
     },
     alley: function(val) {
          Game.reset()
          Game.location.shop = new Shop('weapon stand', 'the mouse', [IronSword, SteelSword, SteelMace, WoodAxe, IronSpear], [30, 35, 45, 20, 45])
          Game.lookLeft = `On your left is the wall of the alleyway, covered in grease and mold.`
          Game.lookRight = `On your right is the wall of the alleyway, with water and what looks like blood smeared on it.`
          Game.lookDown = environments.down.alley
          Game.lookUp = environments.up.alley
          Game.lookForward = `In front of you is the mouse, standing on a stack of barrels, trying to look professional.`
          Game.lookBack = `Behind you is the main market square with the fountain.`
          Game.moveBack = `You give the mouse an encouraging smile and sneak out of the alley.`
          Game.back = 'rivergate.market'
          Game.auto(val)
     },
     edge: function(val) {
          Game.reset()
          Game.lookLeft = `On your left is a small aspen tree, the tip of it about shoulder height.`
          Game.lookRight = `On your right is a pile of firewood. A snake sits on top, sunning itself in the dappled sunlight of the trees.`
          Game.lookBack = `Behind you is Rivergate's marketplace.`
          Game.lookForward = `In front of you, the road stretches on, changing from paved cobblestone to dirt.`
          Game.lookDown = environments.down.cobblestone
          Game.lookUp = environments.up.treeCanopy
          Game.moveBack = 'You walk back into town, to the market square.'
          Game.back = 'rivergate.market'
          Game.moveForward = `You continue on the road, deeper into the forest.`
          Game.forward = 'forest.begin-road'
          Game.auto(val)
     },
     inn: function(val) {
          Game.reset()
          Game.location.shop = new Shop('inn', 'Horadric', [Ale, Wine, HealingTea, HealingPotion], [15, 20, 30, 40])
          Game.location.person = new Person('Horadric', ['Want to buy something?', 'Are you buying, or just coming in to see a friend?', 'You from around here? <br><br> *Horadric shrugs and looks around* <br><br> My daughter, Aritran, is one of the only people around here who\'s friendly. Besides me, of course.'])
          Game.lookLeft = `On your left is a large stack of barrels and buckets.`
          Game.lookRight = `On your right is a locked door with a sign on it, labelling it as the guest room stairway.`
          Game.lookBack = `Behind you is the door to the marketplace.`
          Game.lookForward = `In front of you is the counter, behind which Horadric stands and tends to his shop.`
          Game.moveBack = `You smile and wave goodbye to Horadric, who returns the gesture.`
          Game.lookDown = environments.down.woodenFloor
          Game.lookUp = environments.up.woodCeiling
          Game.back = 'rivergate.market'
          Game.auto(val)
     }
}
var forest = {
     beginning: function(val) {
          Game.reset()
          Game.lookUp = environments.up.treeCanopy
          Game.lookDown = environments.down.forest
          Game.lookRight = `On your right, mist obscures the trees in the distance.`
          Game.lookLeft = `To your left, a trail makes its way through the trees and meets up with the road. It's a small trail, but looks well used.`
          Game.lookBack = `Behind you, you can barely see the town gates of Rivergate.`
          Game.lookForward = `In front of you, the road stretches on into the mist.`
          Game.moveForward = `You walk for a while, in the mist, and emerge on the other side in a bright, cheery landscape with mountains all around.`
          Game.forward = `valley.beginning`
          Game.moveLeft = 'You walk out on the trail and make your way through the trees.'
         Game.moveBack = 'You walk back to the town.'
         Game.back = 'rivergate.market'
          Game.left = `forest.hut`
          if(val == 'move left') {
               getId('ie').disabled = true
               setTimeout(() => {
                    consul.log(`After a little while, you end up in a clearing in the woods, a small hut in the center.`)
                    getId('ie').disabled = false
                    getId('ie').focus()
               }, 4000)
          }
          Game.auto(val)
     },
     hut: function(val) {
          Game.reset()
          Game.location.opponent = {
               name: `Raccoon`,
               hp:20,
               weapon: Claws,
          }
          Player.inCombat = true
          Game.lookLeft = `On your left is a small table with some empty dishes on it.`
          Game.lookRight = `On your right is a fireplace.`
          Game.lookBack = `Behin you is the door of the hut.`
          if(Game.location.opponent.dead) {
               Game.lookForward = `In front of you is the body of the ${Game.location.opponent.name.toLowerCase()}.`
          } else {
               Game.lookForward = `In front of you is a raccoon.`
          }
          Game.lookUp = environments.up.woodCeiling
          Game.lookDown = environments.down.woodenFloor
          Game.moveBack = `You walk back to the road.`
          Game.back = 'forest.begin-road'
          Game.auto(val)
          forest.hut = function(val) {
               Game.lookLeft = `On your left is a small table with some empty dishes on it.`
               Game.lookRight = `On your right is a fireplace.`
               Game.lookBack = `Behin you is the door of the hut.`
               if(Game.location.opponent.dead) {
                    Game.lookForward = `In front of you is the body of the ${Game.location.opponent.name.toLowerCase()}.`
               } else {
                    Game.lookForward = `In front of you is a raccoon.`
               }
               Game.lookUp = environments.up.woodCeiling
               Game.lookDown = environments.down.woodenFloor
               Game.moveBack = `You walk back to the road.`
               Game.back = 'forest.begin-road'
               Game.auto(val)
          }
     }
}
var gerrysQuest = new Quest(`Gerry's Favorite Herb Patch`, "You are going to help Gerry remove the ogre from his favorite herb patch.", function() {
    Player.gold += 75
    consul.info('Gerry will be happy that you removed the ogre from his favorite herb patch.')
})
var Gerry = new Person('the merchant', function() {
    input.disabled = true
    consul.dialogue(`Gerry says: "Hello, traveler! I have some herbs for sale, if you would like."`)
    setTimeout(function() {
        consul.dialogue(`"Y'know what? I'm having some issues with my favorite patch -- there's some ogre that thinks it's found a home."`)
        setTimeout(function() {
            consul.dialogue(`"And you could certainly deal with it, with that ${Player.weapon.name.toLowerCase()} hanging off your belt."`)
            gerrysQuest.initiate()
        }, 1500)
    }, 3000)
})

// items -- name, desc, value, edible, buffs

var Thyme = new Item('thyme', 'A little herb that grows in small shrubs.', 15, true, function() {Player.hp+=5})
var Fireweed = new Item('fireweed', 'A small but powerful plant that grows on rocks in the sun.', 30, true, function() {Player.hp+=15})
var AllHeal = new Item('all-heal', 'A very rare and potent healing herb, found in just a few locations.', 150, true, function() {Player.hp+=Math.floor(Player.maxhp/2)})
var Aloe = new Item('aloe', 'A small succulent that can be found in most deserts, but also can be found in certain forests. It is most commonly used to increase one\'s strength in combat.', 75, true, function() {Player.weapon.damage+=5; setTimeout(function() {Player.weapon.damage-=5}, 10000)})
var Athelas = new Item('Athelas', 'A very very rare vine that grows in only one location. Legend says that it can heal any wound or disease.', 300, true, function() {Player.hp=Player.maxhp})
var Key = new Item('key', 'They key to the traveling merchant\'s lockbox.')

var valley = {
     beginning: function(val) {
          Game.reset()
          Game.lookLeft = 'On your left is a road leading off to a large lake. The lake shimmers and gleams in the sunlight, brightening the valley.'
          Game.lookRight = 'On your right is an old abandoned shed. The shed is surrounded by old barrels and crates.'
          Game.lookDown = environments.down.dirtroad
          Game.lookUp = environments.up.clouds
          Game.lookBack = 'Behind you is the forest of mist and the road leading to Rivergate.'
          Game.lookForward = 'In front of you, the road continues on for a couple miles, then disappears behind a ridge.'
          Game.moveLeft = "You take the left fork and make your way over to the lake."
          Game.left = 'valley.lake'
          Game.moveRight = "You take the right fork and cautiously approach the abandoned shed."
          Game.right = 'valley.shed'
          Game.moveBack = 'You walk up the road, into the forest of mist again.'
          Game.back = 'forest.begin-road'
          Game.moveForward = 'You decide to continue on the main road and start walking.'
          Game.forward = 'valley.ridge'
          Game.auto(val)
         valley.beginning = function() {
             Game.lookLeft = 'On your left is a road leading off to a large lake. The lake shimmers and gleams in the sunlight, brightening the valley.'
              Game.lookRight = 'On your right is an old abandoned shed. The shed is surrounded by old barrels and crates.'
              Game.lookDown = environments.down.dirtroad
              Game.lookUp = environments.up.clouds
              Game.lookBack = 'Behind you is the forest of mist and the road leading to Rivergate.'
              Game.lookForward = 'In front of you, the road continues on for a couple miles, then disappears behind a ridge.'
              Game.moveLeft = "You take the left fork and make your way over to the lake."
              Game.left = 'valley.lake'
              Game.moveRight = "You take the right fork and cautiously approach the abandoned shed."
              Game.right = 'valley.shed'
              Game.moveBack = 'You walk up the road, into the forest of mist again.'
              Game.back = 'forest.begin-road'
              Game.moveForward = 'You decide to continue on the main road and start walking.'
              Game.forward = 'valley.ridge'
              Game.auto(val)
         }
     },
     lake: function(val) {
          Game.reset()
          Game.location.person = Gerry
          Game.location.shop = new Shop('the merchant', 'the merchant', [Thyme, Fireweed, AllHeal, Aloe, Athelas, Key], [Thyme.value, Fireweed.value, AllHeal.value, Aloe.value, Athelas.value, 350])
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.newtrail
          Game.lookRight = `On your right is a large lake. The trail skirts the lake and enters a small forest.`
          Game.lookLeft = `On your left is a traveling merchant, sitting down with his supplies on his back.`
          Game.lookBack = `Behind you is the fork where the trail that you're on now intersects with the main road out of town.`
          Game.lookForward = 'In front of you, the trail leads straight into a small copse of trees.'
          Game.moveBack = 'You turn around and head back to the main road.'
          Game.back = 'valley.beginning'
          Game.moveForward = 'You continue towards the lake on the small trail.'
          Game.forward = 'valley.actualLake'
          Game.auto(val)
         valley.lake = function() {
             Game.location.person = Gerry
              Game.location.shop = new Shop('the merchant', 'the merchant', [Thyme, Fireweed, AllHeal, Aloe, Athelas, Key], [Thyme.value, Fireweed.value, AllHeal.value, Aloe.value, Athelas.value, 350])
              Game.lookUp = environments.up.clouds
              Game.lookDown = environments.down.newtrail
              Game.lookRight = `On your right is a large lake. The trail skirts the lake and enters a small forest.`
              Game.lookLeft = `On your left is a traveling merchant, sitting down with his supplies on his back.`
              Game.lookBack = `Behind you is the fork where the trail that you're on now intersects with the main road out of town.`
              Game.lookForward = 'In front of you, the trail leads straight into a small copse of trees.'
              Game.moveBack = 'You turn around and head back to the main road.'
              Game.back = 'valley.beginning'
              Game.moveForward = 'You continue towards the lake on the small trail.'
              Game.forward = 'valley.actualLake'
              Game.auto(val)
         }
     },
     actualLake: function(val) {
          Game.reset()
          Game.location.container = new Container('box', [Fireweed, Thyme, Aloe])
          if(first(val) == 'loot') {
               if(Player.inventory.includes(Key)) {
                    Game.auto(val)
                    return false;
               } else {
                    consul.error(`The box is locked.`)
                    return false;
               }
          }
          Game.lookRight = `On your right is the shore of the lake. The small waves from the lake lap up against the shore, creating a hypnotic sound.`
          Game.lookForward = `In front of you, the forest gets bigger with every step.`
          Game.lookBack = `Behind you is the stretch of trail that leads back to the road.`
          Game.lookLeft = `On your left is a lockbox with a label on it, saying "This is property of Gerry." <br> You assume that Gerry is the name of the traveling merchant.`
          if(first(val) === 'look' || (first(val) == 'look' && second(val) == 'left')) {
               Gerry.name = 'Gerry'
          }
          Game.moveBack = `You walk back, away from the lake, to where the traveling merchant is sitting.`
          Game.back = `valley.lake`
          Game.auto(val)
     }
}
