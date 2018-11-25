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
         Rivergate.outskirts = function(val) {
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
         }
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
         Rivergate.town = function(val) {
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
         }
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
         Rivergate.market = function(val) {
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
         }
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
         Rivergate.alley = function(val) {
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
         }
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
         Rivergate.edge = function(val) {
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
         Rivergate.inn = function(val) {
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
}
var forest = {
     beginning: function(val) {
          Game.reset()
          Game.lookUp = environments.up.treeCanopy
          Game.lookDown = environments.down.forest
          Game.lookRight = `On your right, the density of the trees prevents you from looking very far..`
          Game.lookLeft = `To your left, a trail makes its way through the trees and meets up with the road. It's a small trail, but looks well used.`
          Game.lookBack = `Behind you, you can barely see the town gates of Rivergate.`
          Game.lookForward = `In front of you, the road stretches on into the forest.`
          Game.moveForward = `You walk for a while, and emerge in a small valley, a cheery landscape with mountains all around.`
          Game.forward = `valley.beginning`
          Game.moveLeft = 'You walk out on the trail and make your way through the trees.'
         Game.moveBack = 'You walk back to the town.'
         Game.back = 'rivergate.edge'
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
         forest.beginning = function(val) {
              Game.lookUp = environments.up.treeCanopy
          Game.lookDown = environments.down.forest
          Game.lookRight = `On your right, the density of the trees prevents you from looking very far..`
          Game.lookLeft = `To your left, a trail makes its way through the trees and meets up with the road. It's a small trail, but looks well used.`
          Game.lookBack = `Behind you, you can barely see the town gates of Rivergate.`
          Game.lookForward = `In front of you, the road stretches on into the forest.`
          Game.moveForward = `You walk for a while, and emerge in a small valley, a cheery landscape with mountains all around.`
          Game.forward = `valley.beginning`
          Game.moveLeft = 'You walk out on the trail and make your way through the trees.'
         Game.moveBack = 'You walk back to the town.'
         Game.back = 'rivergate.edge'
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
         }
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
    Player.gold.amount += 75
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
var Key = new Item('key', 'They key to the traveling merchant\'s lockbox.', 10)
var TriffidLeaves = new Item('Triffid Leaves', 'The leaves of a triffid plant, obtained by giving the plant a mouse to consume, then stealing a leaf and running up a tree to avoid its sting.', 500, true, function() {Player.maxhp+=10;Player.hp=Player.maxhp})

var Sinope = new Person('Sinope', [`Oh, hello.. I'm Sinope the Naiad, and I get zero business here.`, `You're the first person I've seen for months!`, `You're not going to use that weapon on me, are you?`, `Don't tell Gerry, but I was the one who put that ogre in the gnomes' forest. They don't really mind, and he's a friend of mine, anyways.`])
var sinopesShop = new Shop('Sinope', 'Sinope', [AllHeal, Aloe, Athelas, Thyme, Fireweed, TriffidLeaves], [AllHeal.value, Aloe.value, Athelas.value, 25, Fireweed.value, TriffidLeaves.value])

var valley = {
     beginning: function(val) {
          Game.reset()
          Game.lookLeft = 'On your left is a road leading off to a large lake. The lake shimmers and gleams in the sunlight, brightening the valley.'
          Game.lookRight = 'On your right is an old abandoned shed. The shed is surrounded by old barrels and crates.'
          Game.lookDown = environments.down.road
          Game.lookUp = environments.up.clouds
          Game.lookBack = 'Behind you is the forest of mist and the road leading to Rivergate.'
          Game.lookForward = 'In front of you, the road continues on for a couple miles, then disappears behind a ridge.'
          Game.moveLeft = "You take the left fork and make your way over to the lake."
          Game.left = 'valley.lake'
          Game.moveRight = "You take the right fork and cautiously approach the abandoned shed. <br> You enter the dark door and end up in a gloomy room with a sad naiad running a shop."
          Game.right = 'valley.shed'
          Game.moveBack = 'You walk up the road, into the forest of mist again.'
          Game.back = 'forest.begin-road'
          Game.moveForward = 'You decide to continue on the main road and start walking. <br> After a few hours of mundane walking, you come to a split in the road, the right leading down, and the left going up, to the top of the mountain.'
          Game.forward = 'valley.ridge'
          Game.auto(val)
         valley.beginning = function(val) {
              Game.lookLeft = 'On your left is a road leading off to a large lake. The lake shimmers and gleams in the sunlight, brightening the valley.'
          Game.lookRight = 'On your right is an old abandoned shed. The shed is surrounded by old barrels and crates.'
          Game.lookDown = environments.down.road
          Game.lookUp = environments.up.clouds
          Game.lookBack = 'Behind you is the forest of mist and the road leading to Rivergate.'
          Game.lookForward = 'In front of you, the road continues on for a couple miles, then disappears behind a ridge.'
          Game.moveLeft = "You take the left fork and make your way over to the lake."
          Game.left = 'valley.lake'
          Game.moveRight = "You take the right fork and cautiously approach the abandoned shed. <br> You enter the dark door and end up in a gloomy room with a sad naiad running a shop."
          Game.right = 'valley.shed'
          Game.moveBack = 'You walk up the road, into the forest of mist again.'
          Game.back = 'forest.begin-road'
          Game.moveForward = 'You decide to continue on the main road and start walking. <br> After a few hours of mundane walking, you come to a split in the road, the right leading down, and the left going up, to the top of the mountain.'
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
         valley.lake = function(val) {
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
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.newtrail
          Game.lookRight = `On your right is the shore of the lake. The small waves from the lake lap up against the shore, creating a hypnotic sound.`
          Game.lookForward = `In front of you, the forest gets bigger with every step.`
          Game.lookBack = `Behind you is the stretch of trail that leads back to the road.`
          Game.lookLeft = `On your left is a lockbox with a label on it, saying "This is property of Gerry." <br> You assume that Gerry is the name of the traveling merchant.`
          if(first(val) === 'look' || (first(val) == 'look' && second(val) == 'left')) {
               Gerry.name = 'Gerry'
          }
          Game.moveBack = `You walk back, away from the lake, to where the traveling merchant is sitting.`
          Game.back = `valley.lake`
          Game.moveForward = 'You move continue on the trail, towards the forest.'
          Game.forward = 'valley.forest'
          Game.auto(val)
         valley.actualLake = function(val) {
             if(first(val) == 'loot') {
               if(Player.inventory.includes(Key)) {
                    Game.auto(val)
                    return false;
               } else {
                    consul.error(`The box is locked.`)
                    return false;
               }
          }
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.newtrail
          Game.lookRight = `On your right is the shore of the lake. The small waves from the lake lap up against the shore, creating a hypnotic sound.`
          Game.lookForward = `In front of you, the forest gets bigger with every step.`
          Game.lookBack = `Behind you is the stretch of trail that leads back to the road.`
          Game.lookLeft = `On your left is a lockbox with a label on it, saying "This is property of Gerry." <br> You assume that Gerry is the name of the traveling merchant.`
          if(first(val) === 'look' || (first(val) == 'look' && second(val) == 'left')) {
               Gerry.name = 'Gerry'
          }
          Game.moveBack = `You walk back, away from the lake, to where the traveling merchant is sitting.`
          Game.back = `valley.lake`
          Game.moveForward = 'You move continue on the trail, towards the forest.'
          Game.forward = 'valley.forest'
          Game.auto(val)
         }
     },
     forest: function(val) {
          Game.reset()
          Game.lookForward = 'In front of you is a gate, surrounded by small gnomes holding spears.'
          Game.lookLeft = 'On your left is a massive tree, easily twice the size of any building.'
          Game.lookRight = 'On your right is a smaller gate, presumably for the gnomes.'
          Game.lookBack = `Looking behind you, you cannot see ${Gerry.name} because of a small hill in the way.`
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.newtrail
          Game.forward = 'lake.field'
          Game.moveBack = 'You walk away from the forest, back to the lake shore.'
          Game.back = 'valley.actualLake'
          Game.moveForward = ''
          if(val === 'move forward') {
               getId('ie').disabled = true
               consul.dialogue('A gnome says: "Do you have a key?"')
               if(Player.inventory.includes(Key)) {
                    setTimeout(() => {
                         consul.info('You nod your head and show him.')
                         setTimeout(() => {
                              consul.dialogue('The gnome says: "Ok. Move on forward."')
                              setTimeout(function() {
                                   if(Player.quests.includes(gerrysQuest)) {
                                        consul.log('A large ogre ambles around the clearing, idly swinging its mace.')
                                   }
                                   getId('ie').disabled = false
                                   getId('ie').focus()
                                   Player.location = 'valley.field'
                              }, 1200)
                         }, 500)
                    }, 1200)
               } else {
                    setTimeout(() => {
                         consul.info('You search your pockets and come up empty.')
                         setTimeout(() => {
                              consul.dialogue('The gnome says: "You can\'t come in without the key."')
                              getId('ie').disabled = false
                              getId('ie').focus()
                              return false;
                         }, 2000)
                    }, 1500)
               }
          }
          Game.auto(val)
         valley.forest = function(val) {
             Game.lookForward = 'In front of you is a gate, surrounded by small gnomes holding spears.'
          Game.lookLeft = 'On your left is a massive tree, easily twice the size of any building.'
          Game.lookRight = 'On your right is a smaller gate, presumably for the gnomes.'
          Game.lookBack = `Looking behind you, you cannot see ${Gerry.name} because of a small hill in the way.`
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.newtrail
          Game.forward = 'lake.field'
          Game.moveBack = 'You walk away from the forest, back to the lake shore.'
          Game.back = 'valley.actualLake'
          Game.moveForward = ''
          if(val === 'move forward') {
               getId('ie').disabled = true
               consul.dialogue('A gnome says: "Do you have a key?"')
               if(Player.inventory.includes(Key)) {
                    setTimeout(() => {
                         consul.info('You nod your head and show him.')
                         setTimeout(() => {
                              consul.dialogue('The gnome says: "Ok. Move on forward."')
                              setTimeout(function() {
                                   if(Player.quests.includes(gerrysQuest)) {
                                        consul.log('A large ogre ambles around the clearing, idly swinging its mace.')
                                   }
                                   getId('ie').disabled = false
                                   getId('ie').focus()
                                   Player.location = 'valley.field'
                              }, 1200)
                         }, 500)
                    }, 1200)
               } else {
                    setTimeout(() => {
                         consul.info('You search your pockets and come up empty.')
                         setTimeout(() => {
                              consul.dialogue('The gnome says: "You can\'t come in without the key."')
                              getId('ie').disabled = false
                              getId('ie').focus()
                              return false;
                         }, 2000)
                    }, 1500)
               }
          }
          Game.auto(val)
         }
     },
     field: function(val) {
          Game.reset()
          Game.location.items = [Fireweed, AllHeal]
          if(Player.quests.includes(gerrysQuest)) {
               Game.location.opponent = {
                    hp: 50,
                    weapon: IronMace,
                    name: 'Ogre'
               }
               Player.inCombat = true
               Game.lookLeft = 'On your left is a large ogre, standing 7 feet tall.'
          } else {
               Game.lookLeft = 'On your left is a small hut, a few gnomes running around inside.'
          }
          Game.lookRight = 'On your right is an impressively large patch of Fireweed and some All-Heal.'
          Game.lookBack = 'Behind you is the gnomes\' gate.'
          Game.lookForward = 'In front of you is a small path in the woods. The clearing you\'re in is the farthest you can go, because the gnomes\' paths are so thin.'
          Game.lookDown = environments.down.forest
          Game.lookUp = environments.up.treeCanopy
          Game.moveForward = 'You cannot fit in the gnomes\' tunnels.'
          Game.forward = 'valley.field'
          Game.moveBack = 'You walk back through the gate, out of the forest.'
          Game.back = 'valley.forest'
          Game.auto(val)
          valley.field = function(val) {
               if(Player.quests.includes(gerrysQuest)) {
                    if(Game.location.opponent && Game.location.opponent.dead && Player.quests.includes(gerrysQuest)) {
                         gerrysQuest.resolve()
                    }
                    Game.lookLeft = 'On your left is a large ogre, standing 7 feet tall.'
               }
               Game.lookLeft = 'On your left is a small hut, a few gnomes running around inside.'
               Game.lookRight = 'On your right is an impressively large patch of Fireweed and some All-Heal.'
               Game.lookBack = 'Behind you is the gnomes\' gate.'
               Game.lookForward = 'In front of you is a small path in the woods. The clearing you\'re in is the farthest you can go, because the gnomes\' paths are so thin.'
               Game.lookDown = environments.down.forest
               Game.lookUp = environments.up.treeCanopy
               Game.moveForward = 'You cannot fit in the gnomes\' tunnels.'
               Game.forward = 'valley.field'
               Game.moveBack = 'You walk back through the gate, out of the forest.'
               Game.back = 'valley.forest'
               Game.auto(val)
          }
     },
     shed: function(val) {
          Game.reset()
          Game.location.shop = sinopesShop
          Game.location.person = Sinope
          Game.lookLeft = 'On your left the naiad, glumly staring at her crates of goods.'
          Game.lookRight = 'On your right is one of the dilapidated walls of the shed.'
          Game.lookBack = 'Behind you is the entrance to the shed.'
          Game.lookForward = 'In front of you is a blocked-off staircase leading to the upper stories of the small shed.'
          Game.lookUp = environments.up.woodCeiling
          Game.lookDown = environments.down.woodenFloor
          Game.moveBack = 'You wave goodbye to Sinope and return to the road.'
          Game.back = 'valley.beginning'
          Game.auto(val)
         valley.shed = function(val) {
              Game.location.shop = sinopesShop
          Game.location.person = Sinope
          Game.lookLeft = 'On your left the naiad, glumly staring at her crates of goods.'
          Game.lookRight = 'On your right is one of the dilapidated walls of the shed.'
          Game.lookBack = 'Behind you is the entrance to the shed.'
          Game.lookForward = 'In front of you is a blocked-off staircase leading to the upper stories of the small shed.'
          Game.lookUp = environments.up.woodCeiling
          Game.lookDown = environments.down.woodenFloor
          Game.moveBack = 'You wave goodbye to Sinope and return to the road.'
          Game.back = 'valley.beginning'
          Game.auto(val)
         }
     },
     ridge: function(val) {
          Game.reset()
          Game.lookRight = 'On your right is the road, leading off to another region.'
          Game.lookLeft = 'On your left is the road, running up the mountain.'
          Game.lookForward = 'In front of you, the road splits, leaving you with a choice.'
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.road
          Game.lookBack = 'Behind you, the valley stretches out. From your high viewpoint, you can see the village of Rivergate, the forest, and the lake.'
          Game.moveRight = 'You take the right fork, leading down and out of the valley.'
          Game.moveLeft = 'You take the left fork, beginning the long trek up to the top.<br>'
          Game.right = 'acosa.farmland'
          Game.left = 'valley.mountainTop'
          Game.moveBack = 'You begin the hike back down the ridge, to the other fork by the lake.'
          Game.back = 'valley.beginning'
          Game.auto(val)
         valley.ridge = function(val) {
             Game.lookRight = 'On your right is the road, leading off to another region.'
          Game.lookLeft = 'On your left is the road, running up the mountain.'
          Game.lookForward = 'In front of you, the road splits, leaving you with a choice.'
          Game.lookUp = environments.up.clouds
          Game.lookDown = environments.down.road
          Game.lookBack = 'Behind you, the valley stretches out. From your high viewpoint, you can see the village of Rivergate, the forest, and the lake.'
          Game.moveRight = 'You take the right fork, leading down and out of the valley.'
          Game.moveLeft = 'You take the left fork, beginning the long trek up to the top.<br>'
          Game.right = 'acosa.farmland'
          Game.left = 'valley.mountainTop'
          Game.moveBack = 'You begin the hike back down the ridge, to the other fork by the lake.'
          Game.back = 'valley.beginning'
          Game.auto(val)
         }
     },
     moutainTop: function(val) {
          Game.reset()
          Game.lookRight = ""
          Game.lookLeft = ""
          Game.lookBack = ""
          Game.lookForward = ""
          Game.lookDown = environments.down.newtrail
          Game.lookUp = environments.up.clouds
          Game.moveForward = 'It would not be wise to go that way.'
          Game.moveLeft = Game.moveForward
          Game.moveRight = Game.moveLeft
          Game.moveBack = 'You make your way back down the mountain and end up at the intersection at the ridge, again.'
          Game.back = 'valley.ridge'
          Game.auto(val)
         valley.mountainTop = function(val) {
             Game.lookRight = ""
              Game.lookLeft = ""
              Game.lookBack = ""
              Game.lookForward = ""
              Game.lookDown = environments.down.newtrail
              Game.lookUp = environments.up.clouds
              Game.moveForward = 'It would not be wise to go that way.'
              Game.moveLeft = Game.moveForward
              Game.moveRight = Game.moveLeft
              Game.moveBack = 'You make your way back down the mountain and end up at the intersection at the ridge, again.'
              Game.back = 'valley.ridge'
              Game.auto(val)
         }
     }
}

var acosabankstorage = new Gold(0);

var acosa = {
    farmland: function(val) {
        Game.reset()
        Game.lookLeft = `On your left is a large plot of land, owned by the city of Acosa, but given to the poor peasants to work.`
        Game.lookRight = `On your right is a small shack, with a thatch roof.`
        Game.lookDown = environments.down.dirtroad
        Game.lookUp = environments.up.clouds
        Game.lookBack = "Behind you, you can just make out the little village of Rivergate on the side of the mountain, nestled away from the heart of civilization."
        Game.moveForward = 'You continue on the road.'
        Game.forward = 'acosa.mainRoad'
        Game.moveBack = 'You start heading back up the mountain, towards the valley and Rivergate.'
        Game.back = 'valley.ridge'
        Game.lookForward = 'In front of you, you see a large walled city, sitting on the edge of a drop-off to the ocean below.'
        Game.auto(val)
        acosa.farmland = function(val) {
             Game.lookLeft = `On your left is a large plot of land, owned by the city of Acosa, but given to the poor peasants to work.`
            Game.lookRight = `On your right is a small shack, with a thatch roof.`
            Game.lookDown = environments.down.dirtroad
            Game.lookUp = environments.up.clouds
            Game.lookBack = "Behind you, you can just make out the little village of Rivergate on the side of the mountain, nestled away from the heart of civilization."
            Game.lookForward = 'In front of you, you see a large walled city, sitting on the edge of a drop-off to the ocean below.'
            Game.auto(val)
        }
    },
    mainRoad: function(val) {
        Game.reset()
        if(!Game.day) {
            Game.location.person = new Person('The traveler', ["I only travel at night, so no one sees me.", "Nice night, is it not?", "The moon really shines tonight. I come here every night. I go from Oar's Rest to Acosa every day. Keeps me occupied."])
            Game.lookLeft = 'To your left is a rather short little old man, chewing on a blade of grass and talking to himself, enjoying the night.'
        } else {
            Game.location.person = new Person('The traveler', ["May the stars watch over you, traveler.", "Good day to you."])
            Game.lookLeft = 'On your left is a peculiar man, leaning against the signpost and swinging a hammer idly.'
        }
        Game.moveForward = 'You walk on the road and end up at the gates.'
        Game.forward = 'acosa.gates'
        Game.moveBack = 'You walk back to the little farming house by the road.'
        Game.back = 'acosa.farmland'
        Game.moveRight = 'i dont have enough time to do oars rest, i\'ll just do acosa for now.'
        Game.lookRight = 'On your right is a road that leads off to the horizon. The sign says it goes to Oar\'s Rest and beyond.'
        Game.lookBack = 'Behind you is the farming hut and past that, the mountains.'
        Game.lookForward = 'In front of you is the wide road leading to the main gates of Acosa.'
        Game.lookDown = environments.down.cobblestone
        Game.lookUp = environments.up.birds
        Game.auto(val)
        acosa.mainRoad = function(val) {
            if(!Game.day) {
                Game.location.person = new Person('The traveler', ["I only travel at night, so that no one sees me.", "Nice night, is it not?", "The moon really shines tonight. I come here every night. I go from Oar's Rest to Acosa every day. Keeps me occupied."])
                Game.lookLeft = 'To your left is a rather short little old man, chewing on a blade of grass and talking to himself, enjoying the night.'
            } else {
                Game.location.person = new Person('The traveler', ["May the stars watch over you, traveler.", "Good day to you."])
                Game.lookLeft = 'On your left is a peculiar man, leaning against the signpost and swinging a hammer idly.'
                Game.moveLeft = "Don't get too close or you'll get whacked with the hammer."
            }
            Game.lookRight = 'On your right is a road that leads off to the horizon. The sign says it goes to Oar\'s Rest and beyond.'
            Game.lookBack = 'Behind you is the farming hut and past that, the mountains.'
            Game.lookForward = 'In front of you is the wide road leading to the main gates of Acosa.'
            Game.lookDown = environments.down.cobblestone
            Game.lookUp = environments.up.birds
            Game.auto(val)
        }
    },
    cityGates: function(cmd) {
        Game.reset()
        Game.lookBack = 'Behind you is the intersection with the road that leads to Oar\'s Rest.'
        Game.lookForward = 'In front of you are the city gates. There are some guards standing on the side, watching anyone who enters.'
        Game.lookLeft = 'On your left, the flat farmland begins to transition into a rocky hill leading up to the wall of Acosa.'
        Game.lookRight = 'On your right is a large rock, precariously balanced on the edge of another.'
        Game.lookUp = environments.up.clouds
        Game.lookDown = environments.down.cobblestone
        Game.moveForward = 'You walk straight through the city gates.'
        Game.forward = 'acosa.cityentrance'
        if(cmd === 'move forward') {
            getId('ie').disabled = true
            consul.info('One of the guards steps forward and blocks your path.')
            if(!Player.acosa) {
                setTimeout(function() {
                    consul.dialogue('The guard says: "Hello traveler. I\'ve seen travelers like you come through here before, then next I saw them they was locked up in the dungeons. You gonna cause any trouble?"')
                    setTimeout(function() {
                        consul.info('You shake your head.')
                        setTimeout(function() {
                            consul.info('The guard seems satisfied with your response and lets you in the city.')
                            Player.location = 'acosa.cityentrance'
                            Player.acosa = true
                            getId('ie').disabled = false
                        }, 2000)
                    }, 1500)
                }, 1500)
            } else if(Player.acosa) {
                setTimeout(function() {
                    consul.dialogue('The guard says: "I think I\'ve seen you here before. I\'ll let you in. Just don\'t cause any trouble."')
                    Player.location = 'acosa.cityentrance'
                    Player.acosa = true
                    getId('ie').disabled = false
                }, 1000)
            }
            return false;
        }
        Game.moveBack = 'You walk back to the crossroads.'
        Game.back = 'acosa.mainRoad'
        Game.auto(cmd)
        acosa.cityGates = function(val) {
            Game.lookBack = 'Behind you is the intersection with the road that leads to Oar\'s Rest.'
            Game.lookForward = 'In front of you are the city gates. There are some guards standing on the side, watching anyone who enters.'
            Game.lookLeft = 'On your left, the flat farmland begins to transition into a rocky hill leading up to the wall of Acosa.'
            Game.lookRight = 'On your right is a large rock, precariously balanced on the edge of another.'
            Game.lookUp = environments.up.clouds
            Game.lookDown = environments.down.cobblestone
            Game.moveForward = 'You walk straight through the city gates.'
            Game.forward = 'acosa.cityentrance'
            if(cmd === 'move forward') {
                getId('ie').disabled = true
                consul.info('One of the guards steps forward and blocks your path.')
                if(!Player.acosa) {
                    setTimeout(function() {
                        consul.dialogue('The guard says: "Hello traveler. I\'ve seen travelers like you come through here before, then next I saw them they was locked up in the dungeons. You gonna cause any trouble?"')
                        setTimeout(function() {
                            consul.info('You shake your head.')
                            setTimeout(function() {
                                consul.info('The guard seems satisfied with your response and lets you in the city.')
                                Player.location = 'acosa.cityentrance'
                                Player.acosa = true
                                getId('ie').disabled = false
                            }, 2000)
                        }, 1500)
                    }, 1500)
                } else if(Player.acosa) {
                    setTimeout(function() {
                        consul.dialogue('The guard says: "I think I\'ve seen you here before. I\'ll let you in. Just don\'t cause any trouble."')
                        Player.location = 'acosa.cityentrance'
                        Player.acosa = true
                        getId('ie').disabled = false
                    }, 1000)
                }
                return false;
            }
            Game.moveBack = 'You walk back to the crossroads.'
            Game.back = 'acosa.mainRoad'
            Game.auto(cmd)
        }
    },
    entrance: function(val) {
        Game.reset()
        Game.lookLeft = 'On your left is a large, rowdy tavern by the name of "The Bull and Bear".'
        Game.lookRight = `On your right is a quaint little potions shop. An older woman stands behind the counter, smiling.`
        Game.lookBack = 'Behind you are the city gates.'
        Game.lookForward = 'In front of you is main road through Acosa. On the road, there is a bank, a general store, and an adventuring shop.'
        Game.lookUp = environments.up.clouds
        Game.lookDown = environments.down.city
        Game.moveBack = 'You walk back through the gates to the outskirts of the city.'
        Game.back = 'acosa.gates'
        Game.moveLeft = 'You approach the tavern and enter.'
        Game.left = 'acosa.tavern'
        Game.moveRight = 'You walk over to the potions shop and assess the quality of the potions.'
        Game.right = 'acosa.potions'
        Game.moveForward = 'You continue down the main road, towards the bank.'
        Game.forward = 'acosa.bank'
        Game.auto(val)
        acosa.entrance = function(val) {
            Game.lookLeft = 'On your left is a large, rowdy tavern by the name of "The Bull and Bear".'
            Game.lookRight = `On your right is a quaint little potions shop. An older woman stands behind the counter, smiling.`
            Game.lookBack = 'Behind you are the city gates.'
            Game.lookForward = 'In front of you is main road through Acosa. On the road, there is a bank, a general store, and an adventuring shop.'
            Game.lookUp = environments.up.clouds
            Game.lookDown = environments.down.city
            Game.moveBack = 'You walk back through the gates to the outskirts of the city.'
            Game.back = 'acosa.gates'
            Game.moveLeft = 'You approach the tavern and enter.'
            Game.left = 'acosa.tavern'
            Game.moveRight = 'You walk over to the potions shop and assess the quality of the potions.'
            Game.right = 'acosa.potions'
            Game.moveForward = 'You continue down the main road, towards the bank.'
            Game.forward = 'acosa.bank'
            Game.auto(val)
        }
    },
    tavern: function(val) {
        Game.reset()
        Game.location.person = new Person('The tavernkeep', ["Welcome to the Bull and Bear!", "What would you like to drink?", "What're you coming to Acosa for?", "We got wine and ale, and that's it, but we make it good!", "People come here from all around to take a sip of our beautiful beverages!", "Anything you want, just call me over."])
        Game.location.shop = new Shop('The tavernkeep', 'the tavernkeep', [Ale, Wine], [Ale.value, Wine.value])
        Game.lookLeft = 'On your left is a bar, packed with people.'
        Game.lookRight = 'On your right is a large man, the tavernkeep.'
        Game.lookForward = 'In front of you is the main room of the tavern, filled with tables.'
        Game.lookDown = environments.down.woodenFloor
        Game.lookUp = environments.up.woodCeiling
        Game.lookBack = "Behind you is the door."
        Game.moveBack = 'You walk back out the door.'
        Game.back = 'acosa.cityentrance'
        Game.auto(val)
        acosa.tavern = function(val) {
            Game.location.person = new Person('The tavernkeep', ["Welcome to the Bull and Bear!", "What would you like to drink?", "What're you coming to Acosa for?", "We got wine and ale, and that's it, but we make it good!", "People come here from all around to take a sip of our beautiful beverages!", "Anything you want, just call me over."])
            Game.location.shop = new Shop('The tavernkeep', 'the tavernkeep', [Ale, Wine], [Ale.value, Wine.value])
            Game.lookLeft = 'On your left is a bar, packed with people.'
            Game.lookRight = 'On your right is a large man, the tavernkeep.'
            Game.lookForward = 'In front of you is the main room of the tavern, filled with tables.'
            Game.lookDown = environments.down.woodenFloor
            Game.lookUp = environments.up.woodCeiling
            Game.lookBack = "Behind you is the door."
            Game.moveBack = 'You walk back out the door.'
            Game.back = 'acosa.cityentrance'
            Game.auto(val)
        }
    },
    potions: function(val) {
        Game.reset()
        Game.location.shop = new Shop('The potion stand', 'the brewer', [HealingPotion, HealingTea, Stimulant], [15, 20, 50])
        Game.lookForward = 'In front of you is the potion vendor.'
        Game.lookBack = "Behind you is the main avenue running through the city."
        Game.lookDown = environments.down.city
        Game.lookUp = environments.up.clouds
        Game.lookRight = "On your right is the outer wall of the city."
        Game.lookLeft = 'On your left is the wall of a house.'
        Game.moveBack = "You walk back to the main road."
        Game.back = 'acosa.cityentrance'
        Game.auto(val)
        acosa.potions = function(val) {
            Game.location.shop = new Shop('The potion stand', 'the brewer', [HealingPotion, HealingTea, Stimulant], [15, 20, 50])
            Game.lookForward = 'In front of you is the potion vendor.'
            Game.lookBack = "Behind you is the main avenue running through the city."
            Game.lookDown = environments.down.city
            Game.lookUp = environments.up.clouds
            Game.lookRight = "On your right is the outer wall of the city."
            Game.lookLeft = 'On your left is the wall of a house.'
            Game.moveBack = "You walk back to the main road."
            Game.back = 'acosa.cityentrance'
            Game.auto(val)
        }
    },
    bank: function(val) {
        Game.reset()
        Game.lookLeft = 'On your left is the bank.'
    }
}
