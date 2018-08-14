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
    clearInterval(displayhealth)
    player.toth = player.toth + Math.floor(0.20*player.toth)
    player.totm = player.totm + Math.floor(0.16*player.totm)
    player.health = player.toth
    player.mana = player.totm
  },
  die: function() {
    document.getElementById('conftext').innerHTML = "You died! <br> You can cast Resurrect for " + Math.round(player.totm/2) + " mana."
    document.getElementById('yes').addEventListener('click', function() {
      resurrect.cb()
    });
    document.getElementById('no').addEventListener('click', function() {
      if(confirm('Are you sure you don\'t want to spend ' + Math.round(player.totm/2) + ' mana to resurrect?')) {
        location.reload()
      }
    });
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
   document.getElementById('monster').style.display = 'block'
    document.getElementById('spells').style.display = 'block'
    document.getElementById('confirmation').style.display = 'none'
  
  nextBattle()
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
  player.health -= this.damage
  if(monstername.includes('%20')) {
    document.getElementById('monsterlog').innerText = 'The ' + monstername.replace('%20', ' ') + ' used ' + this.name + '!'
    clearLog('monster')
  } else {
    document.getElementById('monsterlog').innerText = 'The ' + monstername + ' used ' + this.name + '!'
    clearLog('monster')
  }
  document.getElementById('spells').style.display = 'block'
}

Spell.prototype.cast = function() {  // casts spell
  let cost = Math.round(this.damage*0.75)
  document.getElementById('spells').style.display = 'none'
  if(player.mana < cost) {
    document.getElementById('playerlog').innerText = 'You don\'t have enough mana to cast ' + this.name + '.'
    clearLog('player')
    randomSpell().castByMonster()
  } else {
    let d = this.damage
    let n = this.name
    player.mana -= Math.round(this.damage/2)
    if(monster.health <= 0) {
      player.exp = player.exp + monster.exp
      if(player.exp >= Math.ceil(8.7*player.level)) {
        player.levelUp()
      }
      nextBattle()
    } else {
      monster.health -= d
    }
    player.mana -= cost
    setTimeout(function() {
      randomSpell().castByMonster()
    }, Math.round(Math.random()*5600))
  }
}


// Other functions


function nextBattle() {
  setTimeout(function() {
    document.getElementById('confirmation').style.display = 'block'
    document.getElementById('no').style.display = 'none'
    document.getElementById('spells').style.display = 'none'
    document.getElementById('monster').style.display = 'none'
    document.getElementById('conftext').innerHTML = 'Are you ready for the next battle?'
    document.getElementById('yes').addEventListener('click', function() {
      document.getElementById('confirmation').style.display = 'none'
      document.getElementById('no').style.display = 'block'
      document.getElementById('spells').style.display = 'block'
      document.getElementById('monster').style.display = 'block'
      document.getElementById('opp').src = 'images/'+enemies[Math.floor(Math.random()*enemies.length)].toLowerCase()+'.png'
      cm()
    });
  }, 5000)
}

function clearLog(p) {
  if(p === 'player') {
    setTimeout(function() { document.getElementById('playerlog').innerHTML = '' }, 3000)
  } else if(p === 'monster') {
    setTimeout(function() { document.getElementById('monsterlog').innerHTML = '' }, 3000)
  }
}

function spellElement(spell) {  // creates spell element
  document.getElementById('t1').innerHTML = document.getElementById('t1').innerHTML + '<img class="spell" src="images/'+spell+'.png" onclick="castSpell('+spell+')" title="Cast '+spell.toString().replace(/^\w/, c => c.toUpperCase())+'">'
}

function fromImg(img) {  // Gets image name from src, excluding the extension
  var opp, fin;
  opp = img.src
  fin = opp.slice(opp.indexOf('images/')+'images/'.length+1)
  fin = fin.slice(fin[0], fin.indexOf('.'))
  
  return fin;
}

function cm() {  // creates monster with random stats generated from name
  monstername = fromImg(document.getElementById('opp'))
  monster = {
    name: monstername.replace(/^\w/, c => c.toUpperCase()),
    health: Math.ceil(alph.indexOf(monstername.charAt(0)) * alph.indexOf(monstername[Math.random()*monstername.length]))+31,
    damage: Math.floor((Math.ceil(alph.indexOf(Math.floor(monstername.length/2)))+16)/2),
    exp: Math.floor(Math.random()*monstername.length/2)+Math.floor(Math.random()*15)
  }
  if(monster.name.includes('%20')) {
    monster.name = monster.name.replace('%20', ' ')
  }
  document.getElementById('mlabel').innerText = monster.name + "'s Health: "
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
    player.health = Math.round(player.toth/2)
  }
  if(player.mana > player.totm) {
    player.mana = Math.round(player.totm/2)
  }
}, 100)

var died = setInterval(function() {
  if(player.health <= 0) {
    player.die()
  }
}, 10)


// Getting the numbers to the document (using document.write()!!)


var playerhealth = document.getElementById('playerhealth')
var monsterhealth = document.getElementById('monsterhealth')
var displayhealth, leveledspells;
function dhp() {  // d isplay  h it  p oints
  displayHealth = setInterval(function() {
    if(monster.health < 0) {
      monster.health = 0
    } else if(player.health < 0) {
      player.health = 0
    }
    playerhealth.innerText = player.health
    monsterhealth.innerText = monster.health
  }, 10)
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



