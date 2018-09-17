# game.js documentation

  ### Quests
  
  ````javascript
  var quest = new Quest("questname", "questdescription", function() { console.log('QUESTREWARD') })
  quest.initiate()
  quest.resolve()
  
  var farmQuest = new Quest('Jaspers Farm', 'Help Jasper clean up his farm.', function() { Player.gold.amount += 50 })
  farmQuest.initiate()
  ````
  
  ### Items
  
  ```javascript
  var Item = new Item('itemname', 'itemdescription', parseInt(itemvalue), itemedible[true/false], [optional]function() { console.log('itembuffs') })
  Item.eat()
  
  var Bowl = new Item('bowl', 'An ordinary bowl.', 0, false)
  Bowl.eat() // doesn't work
  ````
  Item variable names should be in UpperCamelCase for the Game.take() parser.
  
  ### People
  
  ````javascript
  var person = new Person('personname', function() { console.log('person dialogue') })
  
  var sam = new Person('Sam', function() {
    console.log('My name is Sam.')
    setTimeout(function() {
      console.log('Whats yours?')
    }, 2400)
  }
  ````
  
  ### Weapons
  
  ````javascript
  var weapon = new Weapon('weapontype'[mace, sword, spear], 'weaponname', parseInt(weapondamage), 'weapondescription')
  var IronMace = new Weapon('mace', 'iron mace', 14, 'An ordinary iron mace.')
  ````
  
  Weapon types are not pre-defined in game.js -- they're simply there for decoration.
  
  ### Gold
  
  ````javascript
  var gold = new Gold(goldamount)
  ````
  
  ### NPC-Owned Shops
  
  ````javascript
  var shop = new Shop('shopname', 'shopkeepersname', [Item, Item], [item1price, item2price])
  var bar = new Shop('bar', 'bartender', [Beer, Ale, Wine], [15, 25, 40])
  ````
  
  Shop.items (````[Beer, Ale, Wine]````) has the corresponding prices in Shop.costs (````[15, 25, 40]````).
