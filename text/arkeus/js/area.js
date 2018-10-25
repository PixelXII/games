const environments = {
     down: {
          cobblestone: 'The flagstones in the road below you are old and worn with use.',
          forest: 'Below you are some old rotten leaves on the forest floor, and a salamander basks in the sunlight.',
          dirtroad: 'The dirt in the road below you has been sliced by the carriage wheels, leaving deep ruts on both sides of the road.',
          oldtrail: 'The small trail below you hasn\'t been walked on for a very long time, it seems. There\'s vines and annuals all over it, but the general direction of the trail remains clear.',
          newtrail: 'The trail below you looks trimmed recently, and its wideness tells of many feet passing over daily.',
          alley: 'The dank alley floor has puddles and piles of trash all over.'
     },
     up: {
          birds: 'Above you, a flock of birds flies about aimlessly.',
          alley: `Above the alley is a wooden pallet, blocking out most of the sky and preventing any smells from the alley getting into the open tavern window.`,
          clouds: 'A few clouds drift lazily across the sky.',
          cloudless: 'The sun shines, and there isn\'t a cloud in the sky.',
          treeCanopy: 'The branches of the trees stretch out above you, partially blocking the sky from your view.'
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
          Game.lookLeft = `On your left is a fruit stand overflowing with fruits. You see pears, apples, dragonfruits, and another fruit that you can't identify by sight.`
          Game.lookRight = `On your right is a large fountain. The water in it shimmers in the light.`
          Game.lookDown = environments.down.cobblestone
          Game.lookUp = environments.up.clouds
          Game.lookForward = `In front of you is a small alleyway, covered with banners.`
          Game.lookBack = `Behind you is the road through town.`
          Game.moveBack = `You walk back to the road.`
          Game.back = 'rivergate.town'
          Game.moveRight = 'You slip into the alleyway and jump back in surprise as a mouse pokes its head out from behind a small counter.'
          Game.right = 'rivergate.alley'
          Game.moveForward = 'You go through the town gates and end up on the edge of town.'
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
     }
}

var forest = {
     beginning: function() {
          // stuff
     }
}
