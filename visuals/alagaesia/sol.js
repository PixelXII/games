var monster, monstername, monstertype;
var enemies = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain', 'Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon', 'Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse', 'Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Player

var player = {
  level: 1,
  health: 30,
  mana: 30,
  toth: 30,
  totm: 30,
  exp: 0,
  levelUp: function() {
    player.level++;
    displayConf('You Leveled Up! <br> You\'re level ' + this.level + ' now!', 'O K', function() { nextBattle(false) }, 'disabled', null)
    clearInterval(displayhealth)
    player.toth = player.toth + Math.floor(0.20*player.toth)
    player.totm = player.totm + Math.floor(0.16*player.totm)
    player.health = player.toth
    player.mana = player.totm
  },
  die: function() {
    clearInterval(regen)
    document.getElementById('playerdata').style.display = 'none'
    document.getElementById('monsterdata').style.display = 'none'
    if(player.mana >= 15) {
      document.getElementById('conftext').innerHTML = "You died! <br> You can cast Resurrect for " + Math.round(player.totm/2) + " mana."
      document.getElementById('yes').addEventListener('click', function() {
        resurrect.cb()
      });
      document.getElementById('no').addEventListener('click', function() {
        location.reload()
      });
    } else {
      document.getElementById('yes').innerHTML = "! &nbspO K"
      document.getElementById('yes').addEventListener('click', function() {
        location.reload()
      })
      document.getElementById('conftext').innerText = "You died! <br> Resurrect costs 15 mana and you only have " + player.mana + "."
      setTimeout(function() {
        location.reload()
      }, 5000)
    }
    document.getElementById('playerlog').innerHTML = ""
    document.getElementById('monsterlog').innerHTML = ""
    document.getElementById('monster').style.display = 'none'
    document.getElementById('spells').style.display = 'none'
    document.getElementById('confirmation').style.display = 'block'
  }
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
}

Spell.prototype.cast = function() {  // casts spell
  let cost = 3
  if(player.mana < cost) {
    log('player', 'You don\'t have enough mana to cast ' + this.name + '.')
    clearLog('player')
  } else {
    let d = this.damage
    let n = this.name
    player.mana = player.mana - Math.round(this.damage/2)
    if(monster.health <= 0) {
      player.exp = player.exp + monster.exp
      if(player.exp >= Math.ceil(8.7*player.level)) {
        player.levelUp()
      }
      nextBattle()
    } else {
      monster.health -= d
    }
    player.mana -= Math.round(cost/2)
    log('player', 'You cast ' + this.name + ".")
    setTimeout(function() {
      randomSpell().castByMonster()
    }, Math.round(Math.random()*5600))
  }
}


// Other functions

function displayConf(conftext, yes, ycallback, no, ncallback) {
  id('confirmation').style.display = 'block'
  id('monsterdata').style.display = 'none'
  id('playerdata').style.display = 'none'
  id('spells').style.display = 'none'
  id('monster').style.display = 'none'
  id('conftext').innerHTML = conftext
  if(no === 'disabled') {
    id('no').style.display = 'none'
  }
  id('yes').innerHTML = '!&nbsp&nbsp'+yes
  var old = document.getElementById("yes");
  var newm = old.cloneNode(true);
  old.parentNode.replaceChild(newm, old);
  id('yes').addEventListener('click', function() {
    ycallback()
  });
  if(ncallback != null) {
    id('no').addEventListener('click', function() {
      ncallback()
    });
  }
}

function log(targ, cont) {
  if(targ == 'monster') {
    document.getElementById('monsterlog').innerHTML = cont
  } else if(targ == 'player') {
    document.getElementById('playerlog').innerHTML = cont
  }
  clearLog(targ)
}

function id(targ) {
  return document.getElementById(targ)
}


function nextBattle(tim) {
  if(tim === false) {
    id('confirmation').style.display = 'block'
    id('no').style.display = 'none'
    clearLog(false)
    id('spells').style.display = 'none'
    id('monsterdata').style.display = 'none'
    id('playerdata').style.display = 'none'
    id('yes').addEventListener('click', function() {
     id('confirmation').style.display = 'none'
      id('no').style.display = 'block'
      id('spells').style.display = 'block'
      id('monster').style.display = 'block'
      id('opp').src = 'images/'+enemies[Math.floor(Math.random()*enemies.length)].toLowerCase()+'.png'
    });
    displayConf('You killed the ' + monster.name + "! <br> <br> You gained " + monster.exp + ' XP from it.', 'O K', null)
    var old = id('yes')
    var newm = old.cloneNode(true);
    old.parentNode.replaceChild(newm, old);
    cm()
  } else {
    setTimeout(function() {
      id('confirmation').style.display = 'block'
      id('no').style.display = 'none'
      clearLog(false)
      id('spells').style.display = 'none'
      id('playerlog').style.display = 'none'
      id('monsterlog').style.display = 'none'
      id("monsterdata").style.display = 'none'
      id("playerdata").style.display = 'none'
      displayConf('You killed the ' + monster.name + "! <br> <br> You gained " + monster.exp + " XP from it", 'O K', null) 
      id('yes').addEventListener('click', function() {
        id('confirmation').style.display = 'none'
        id('no').style.display = 'block'
        id('spells').style.display = 'block'
        id('monster').style.display = 'block'
        id('opp').src = 'images/'+enemies[Math.floor(Math.random()*enemies.length)].toLowerCase()+'.png'
        cm()
      });
    }, 5000)
  }
}

function clearLog(p) {
  if(p === 'player') {
    setTimeout(function() { document.getElementById('playerlog').innerHTML = '' }, 3000)
  } else if(p === 'monster') {
    setTimeout(function() { document.getElementById('monsterlog').innerHTML = '' }, 3000)
  } else if(p === false) {
    id('playerlog').innerHTML = ''
    id('monsterlog').innerHTML = ''
  }
}

function spellElement(spell) {  // creates spell element
  document.getElementById('t1').innerHTML = document.getElementById('t1').innerHTML + '<img class="spell" src="images/'+spell+'.png" onclick="castSpell('+spell+')" title="Cast '+spell.toString().replace(/^\w/, c => c.toUpperCase())+'">'
}

function fromImg(img) {  // Gets image name from src, excluding the extension
  var opp, fin;
  opp = img.src
  fin = opp.slice(opp.indexOf('images')+'images'.length+1)
  fin = fin.slice(fin[0], fin.indexOf('.'))
  
  return fin;
}

function cm() {  // creates monster with random stats generated from name
  monstername = fromImg(document.getElementById('opp'))
  monster = {
    name: monstername.replace(/^\w/, c => c.toUpperCase()),
    health: Math.ceil(alph.indexOf(monstername.charAt(0)) * alph.indexOf(monstername[Math.random()*monstername.length]))+31,
    damage: Math.ceil(alph.indexOf(monstername.charAt(Math.round(Math.random()*player.level))+18)),
    exp: Math.floor(Math.random()*monstername.length/2)+Math.floor(Math.random()*15)
  }
  monster.mana = monster.health+Math.round(Math.random()*player.level)
  monster.totm = monster.mana
  monster.toth = monster.health
  if(monster.name.includes('%20')) {
    monster.name = monster.name.replace('%20', ' ')
  }
  document.getElementById('mlabel').innerText = monster.name + ":"
  document.getElementById('mname').innerText = monster.name
}

cm()
  
  
// Constructors
  
  
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


// Setting intervals

var MaHe = setInterval(function() {
  if(player.health > player.toth) {
    player.health = player.toth
  }
  if(player.mana > player.totm) {
    player.mana = player.totm
  }
}, 5)

var died = setInterval(function() {
  if(player.health <= 0) {
    player.die()
  }
}, 10)

var monsterdied = setInterval(function() {
  if(monster.health <= 0) {
    nextBattle(false)
  }
}, 5)

var regen;
function startRegen() {  // regenerates a certain percentage of mana & health per second
  regen = setInterval(function() {
    if(player.health != player.toth) {
      player.health++
    }
    if(player.mana != player.totm) {
      player.mana++
    }
    if(monster.health != monster.toth) {
      monster.health++
    }
    if(monster.mana != monster.totm) {
      monster.mana++
    }
  }, 8000)
}

startRegen()


// Getting the numbers to the document (using document.write()!!)


var playerhealth = document.getElementById('playerhealth')
var monsterhealth = document.getElementById('monsterhealth')
var displayhealth, leveledspells;
function dhp() {  // d isplay  h it  p oints
  displayHealth = setInterval(function() {
    if(monster.health < 0) {
      monster.health = 0
      nextBattle()
    } else if(player.health < 0) {
      player.health = 0
      player.die()
    }
    if(player.mana < 0) {
      player.mana = 0;
    } else if(monster.mana < 0 ) {
      monster.mana = 0
    }
    
    playerhealth.innerText = player.health + "/" + player.mana
    monsterhealth.innerText = monster.health + "/" + monster.mana
  }, 5)
}

dhp()


leveledspells = setInterval(function() {
  if(player.level <= 7) {
    document.getElementById('t1').style.display = 'block'
  } else if(player.level > 7 && player.level <= 14) {
    document.getElementById('t1').style.display = 'block'
    document.getElementById('t2').style.display = 'block'
  } else {
    document.getElementById('t1').style.display = 'block'
    document.getElementById('t2').style.display = 'block'
    document.getElementById('t3').style.display = 'block'
  }
}, 10)



