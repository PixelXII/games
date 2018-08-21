/* This is the inventory management file 
    
    Also weapons and spells

*/

player.inventory = []

monster.inventory;

// constructors

function Weapon(type, name, damage) {
  this.type = type
  this.name = name
  this.damage = damage
}

// Weapons

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

Weapon.prototype.use = function() {
    monster.health -= this.damage
    log('player', playername + " uses the " + this.name + " against the " + monster.name + "!")
    setTimeout(function() {
        monster.inventory.monsterUse()
    }, Math.random()*4896)
}

Weapon.prototype.monsterUse = function() {
  player.health -= this.damage
  log('monster', "The " + monster.name + " hits " + playername + " with the " + this.name + "!")
}
  

// Spells


var flames = new Spell("Flames", 6)
var iceBlast = new Spell("Ice Blast", 8)
var sparks = new Spell("Sparks", 5)
var squirt = new Spell("Squirt", 7)
var firebolt = new Spell("Firebolt", 12)
var freeze = new Spell("Freeze", 11)
var lightningBolt = new Spell('Lightning Bolt', 15)
var waterfall = new Spell("Waterfall", 13)
var inferno = new Spell("Inferno", 19)
var blizzard = new Spell("Blizzard", 20)
var electricStorm = new Spell("Electrical Storm", 18)
var hurricane = new Spell("Hurricane", 21)

// special spells

var resurrect = new special("Resurrect", function() {
    player.health = player.toth
    player.mana = Math.round(player.totm/2)
    id('monster').style.display = 'block'
    id('spells').style.display = 'block'
    id('playerdata').style.display = 'block'
    id('monsterdata').style.display = 'block'
    id('weapons-inventory').style.display = 'block'
    id('confirmation').style.display = 'none'
})
  

var spells = [flames, iceBlast, sparks, squirt, firebolt, freeze, lightningBolt, waterfall, inferno, blizzard, electricStorm, hurricane]
var lv1 = [flames, iceBlast, sparks, squirt]
var lv2 = [flames, iceBlast, sparks, squirt, firebolt, freeze, lightningBolt, waterfall]
function randomSpell() {  // returns random spell based on player's level
  if(player.level <= 7) {
    return lv1[Math.floor(Math.random()*lv1.length)]
  } else if(player.level > 7 && player.level <= 14) {
    return lv2[Math.floor(Math.random()*lv2.length)]
  } else {
    return spells[Math.floor(Math.random()*spells.length)]
  }
}

Spell.prototype.castByMonster = function() {  // enemy casts specified spell
  let cost = 3
  if(Math.round(Math.random()*10 < 9)) {
    if(monster.mana >= cost) {
        player.health -= this.damage
        monster.mana -= Math.round(cost/2)
        if(monstername.includes('%20')) {
            log('monster', 'The ' + monstername.replace('%20', ' ') + ' cast ' + this.name + '!')
        } else {
            log('monster', 'The ' + monstername + ' cast ' + this.name + '!')
        }
        document.getElementById('spells').style.display = 'block'
    } else {
        log('monster', 'The ' + monstername + " does not have enough mana to cast " + this.name + ".")
    }
  } else {
      id('evade').innerText = 'The ' + monstername + ' dodged your attack.'
      setTimeout(function() {
          id('evade').innerText = ""
      }, 4000)
  }
}

Spell.prototype.cast = function() {  // casts spell
  let cost = 3
  if(player.mana < cost) {
    log('player', playername+' doesn\'t have enough mana to cast ' + this.name + '.')
    clearLog('player')
  } else {
    let d = this.damage
    let n = this.name
    player.mana = player.mana - Math.round(this.damage/2)
    if(monster.health <= 0) {
      player.exp += monster.exp
      nextBattle()
    } else {
      monster.health -= d
    }
    player.mana -= Math.round(cost/2)
    log('player', playername + ' cast ' + this.name + ".")
      if(Math.round(Math.random()*10) < 8) {
        if(monster.health > 2) {
            setTimeout(function() {
                randomSpell().castByMonster()
            }, Math.round(Math.random()*5600))
        } else {
            log('monster', 'The ' + monstername + ' is too tired to cast ' + randomSpell().name)
            clearLog('monster')
        }
      } else {
          id('evade').innerText = playerdata.name + " evaded the " + monstername + "'s attack."
          setTimeout(function() {
              id('evade').innerText = ""
          }, 4000)
      }
  }
}

function Spell(name, damage) {  // Spell constructor function
  this.name = name
  this.damage = damage
}

function special(name, callback) {
  this.name = name
  this.callback = callback
}

special.prototype.cb = function() {
  this.callback()
}

  
// functions

function randomWeapon() {
  return weapons[Math.round(Math.random()*weapons.length)]
}


// Setting Inventories

monster.inventory = randomWeapon()

if(monster.inventory === undefined) {
    monster.inventory = ironAxe
}

player.inventory = [ironSword]


// Displaying inventory
function inventory() {
    id('weapons-inventory').innerHTML = ''
    player.inventory.forEach(function(thing) {
        var p = document.createElement('td')
        id('weapons-inventory').appendChild(p)
        p.innerHTML = "<img class='spell' src='images/"+thing.type+".png'/>"
        p.addEventListener('click', function() {
            thing.use()
        });
    })
}

inventory()

// testing

