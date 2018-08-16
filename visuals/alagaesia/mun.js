/* This is the inventory management file */

player.inventory = []

monster.inventory = []

// constructors

function Weapon(type, name, damage) {
  this.type = type
  this.name = name
  this.damage = damage
}

// declaring weapons
var sword = 'sword'
var mace = 'mace'
var axe = 'axe'
var spear = 'spear'

var ironSword = new Weapon(sword, 'Iron Sword', 6)
var steelSword = new Weapon(sword, "Steel Sword", 8)
var adamantineSword = new Weapon(sword, "Adamantine Sword", 10)
var ironMace = new Weapon(mace, "Iron Mace", 5)
var steelMace = new Weapon(mace, "Steel Mace", 6)
var ebonyMace = new Weapon(mace, "Ebony Mace", 9)
var woodAxe = new Weapon(axe, "Wooden War Axe", 5)
var ironAxe = new Weapon(axe, "Iron War Axe", 7)
var steelAxe = new Weapon(axe, "Steel War Axe", 11)
var ironSpear = new Weapon(spear, 'Iron Spear', 4)
var steelSpear = new Weapon(spear, 'Steel Spear', 7)
var orichalcumSpear = new Weapon(spear, 'Orichalcum Spear', 10)

var weapons = [ironSword, steelSword, adamantineSword, ironMace, steelMace, ebonyMace, woodAxe, ironAxe, steelAxe, ironSpear, steelSpear, orichalcumSpear]

player.inventory = [ironSword]


// functions

function randomWeapon() {
  return weapons[Math.round(Math.random()*weapons.length)]
}


// Monster's inventory

monster.inventory = [randomWeapon()]



// testing

console.log(monster.inventory)

console.log(randomWeapon())

console.log(player.inventory)
