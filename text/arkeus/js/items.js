var Rock = new Item('rock', "It's a rock.")
var Stick = new Item('stick', 'Just a small twig, a large branch.')
var Acorn = new Item('acorn', 'It\'s from an oak tree')
var Pickaxe = new Item('pickaxe', 'The pickaxe is rusty and worn with use.', 15)
var Gold;
var Stone = new Item('stone', 'It shimmers with an ethereal light.', 10)
var Branch = new Item('branch', 'It fell off a tree.')

var HealingTea = new Item('healing tea', 'A warm tea. You are not sure what it is made of.', 10, true, function() { Player.hp += 5; Game.health();})
var HealingPotion = new Item('healing potion', 'A potion of healing. The label says: "You don\'t want to know what\'s in it.', 25, true, function() { Player.hp += 12; Game.health();})
var Ale = new Item('ale', 'It\'s classic ale.', 20, true, function() { Player.hp += 10; Game.health(); })
var Beer = new Item('beer', 'It\'s classic beer.', 25, true, function() { Player.hp += 15; Game.health(); })
var Wine = new Item('wine', 'It\'s your average wine.', 50, true, function() { Player.hp += 25; Game.health(); })
var Tankard = new Item('wine', 'It smells awful.', 0, false, function() {})
var Mug = new Item('mug', 'It smells like beer.', 0, false, function() {})

var sword = 'sword'
var mace = 'mace'
var axe = 'axe'
var spear = 'spear'

var IronSword = new Weapon(sword, 'Iron Sword', 13, 'A simple iron sword.')
var SteelSword = new Weapon(sword, "Steel Sword", 15, 'A simple steel sword.')
var AdamantineSword = new Weapon(sword, "Adamantine Sword", 16, 'The adamantine in the sword glows with a soft red light.')
var IronMace = new Weapon(mace, "Iron Mace", 17, 'A simple iron mace.')
var SteelMace = new Weapon(mace, "Steel Mace", 11, 'A simple steel mace.')
var EbonyMace = new Weapon(mace, "Ebony Mace", 12, 'This mace seems to absorb all light around it.')
var WoodAxe = new Weapon(axe, "Wooden War Axe", 14, 'A primitive war axe.')
var IronAxe = new Weapon(axe, "Iron War Axe", 12, 'A simple iron war axe.')
var SteelAxe = new Weapon(axe, "Steel War Axe", 12, 'A simple steel war axe.')
var IronSpear = new Weapon(spear, 'Iron Spear', 11, 'A simple iron spear.')
var SteelSpear = new Weapon(spear, 'Steel Spear', 13, 'A simple steel spear.')
var OrichalcumSpear = new Weapon(spear, 'Orichalcum Spear', 15, 'The orichalcum in the spear gives off a light without color.')

var Claws = new Weapon('claws', 'claws', 3, 'They\'re an animal\'s claws.')

var CleodianDagger = new Weapon('dagger', 'Cleodian Dagger', 20, 'Whoever wielded this dagger last must have had immense strength, as the dagger is very heavy.')
var Hammer = new Weapon('hammer', 'hammer', 19, 'The hammer looks like a blacksmith\'s hammer.')
var NocriteKatana = new Weapon('katana', 'Nocrite Katana', 22, 'The katana gleams in the light of the sun, giving off a warm glow.')
var StiraothsStaff = new Weapon(sword, "Stiraoth's Quarterstaff", 21, 'The previous owner of this staff was either very rich or had a lot of skill with woodcarving, because the staff has many intricate carvings. Some depict stories of battles, and others are just designs.')
