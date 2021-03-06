// Variables & functions

var monster, monstername, monstertype, player, playername = playerdata.name;
var enemies = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain', 'Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon', 'Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse', 'Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Player

player = {
  level: 1,
  health: 30,
  mana: 30,
  toth: 30,
  totm: 30,
  exp: 0,
  die: function() {
    clearInterval(regen)
    document.getElementById('playerdata').style.display = 'none'
    document.getElementById('monsterdata').style.display = 'none'
    id('weapons-inventory').style.display = 'none'
    if(player.mana >= 15) {
      displayConf(playername + " died! <br> They can cast Resurrect for " + Math.round(player.totm/2) + " mana.", "O K", function() {
        resurrect.cb()
      }, "N O", function() {
        location.reload()
      })
    } else {
      document.getElementById('yes').innerHTML = "! &nbspO K"
      document.getElementById('yes').addEventListener('click', function() {
        location.reload()
      })
      displayConf(playername + " died! <br> <br> Resurrect costs 15 mana and they only have " + player.mana + ".", "O K", function() {
        location.reload()
      }, null)
    }
    document.getElementById('playerlog').innerHTML = ""
    document.getElementById('monsterlog').innerHTML = ""
    document.getElementById('monster').style.display = 'none'
    document.getElementById('spells').style.display = 'none'
    document.getElementById('confirmation').style.display = 'block'
  }
}

// Other functions

function displayConf(conftext, yes, ycallback, no, ncallback) {
  id('confirmation').style.display = 'block'
  id('monsterdata').style.display = 'none'
  id('playerdata').style.display = 'none'
  id('spells').style.display = 'none'
  id('weapons-inventory').style.display = 'none'
  id('monster').style.display = 'none'
  id('conftext').innerHTML = conftext
  if(no === 'disabled') {
    id('no').style.display = 'none'
  }
  id('yes').innerHTML = '!&nbsp'+yes
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


function nextBattle() {
    setTimeout(function() {
      id('confirmation').style.display = 'block'
      id('no').style.display = 'none'
      clearLog(false)
      id('spells').style.display = 'none'
      id('playerlog').style.display = 'none'
      id('monsterlog').style.display = 'none'
      id('weapons-inventory').style.display = 'none'
      id("monsterdata").style.display = 'none'
      id("playerdata").style.display = 'none'
      var old = id('yes')
      var newm = old.cloneNode(true);
      old.parentNode.replaceChild(newm, old);
      displayConf('You killed the ' + monster.name + "! <br> <br> "+playername+" gained " + monster.exp + " XP from it", 'O K', function() {
        id('confirmation').style.display = 'none'
        id('no').style.display = 'block'
        id('weapons-inventory').style.display = 'block'
        id('monsterdata').style.display = 'block'
        id('playerdata').style.display = 'block'
        id('spells').style.display = 'block'
        id('monster').style.display = 'block'
        id('opp').src = 'images/'+enemies[Math.floor(Math.random()*enemies.length)].toLowerCase()+'.png'
        cm()
      }, null)
      player.exp += monster.exp
      if(player.exp >= 30) {
        player.levelUp()
      } else if(player.exp >= 60) {
        player.levelUp()
      } else if(player.exp >= 90) {
        player.levelUp()
      } else if(player.exp >= 120) {
        player.levelUp()
      } else if(player.exp >= 150) {
        player.levelUp()
      } else if(player.exp >= 180) {
        player.levelUp()
      } else if(player.exp >= 220) {
        player.levelUp()
      } else if(player.exp >= 250) {
        player.levelUp()
      } else if(player.exp >= 280) {
        player.levelUp()
      } else if(player.exp >= 320) {
        player.levelUp()
      } else if(player.exp >= 350) {
        player.levelUp()
      } else if(player.exp >= 380) {
        player.levelUp()
      } else if(player.exp >= 400) {
        player.levelUp()
      } else if(player.exp >= 450) {
        player.levelUp()
      } else if(player.exp >= 480) {
        player.levelUp()
      } else if(player.exp >= 520) {
        player.levelUp()
      } else if(player.exp >= 550) {
        player.levelUp()
      } else if(player.exp >= 600) {
        player.levelUp()
      } else if(player.exp >= 625) {
        player.levelUp()
      } else if(player.exp >= 700) {
        player.levelUp()
      } else if(player.exp >= 775) {
        player.levelUp()
      } else if(player.exp >= 800) {
        player.levelUp()
      } else if(player.exp >= 850) {
        player.levelUp()
      } else if(player.exp >= 900) {
        player.levelUp()
      } else if(player.exp >= 1000) {
        id('playerlog').style.fontSize = '96'
        id('monsterlog').style.display = 'none'
        id('monsterdata').style.display = 'none'
        id('playerdata').style.display = 'none'
        id('spells').style.dislplay = 'none'
        id('monster').style.display = 'none'
        displayConf('that\'s what i call dedication', 'RELOAD', function() { location.reload() }, null)
      }
    }, 5000)
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
  startRegen()
  dhp()
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
  id('mlabel').innerText = monster.name + ":"
  id('mname').innerText = monster.name
  id('playerlabel').innerText = playerdata.name + ": "
}

cm()


// Setting intervals

var MaHe = setInterval(function() {
  if(player.health > player.toth) {
    player.health = player.toth
  }
  if(player.mana > player.totm) {
    player.mana = player.totm
  }
}, 10)

var died = setInterval(function() {
  if(player.health === 0) {
    player.die()
  }
  if(monster.health === 0) {
    monster.health = 1
    id('monsterhealth').innerHTML = '0/'+monster.mana
    clearInterval(displayHealth)
    clearInterval(regen)
    id('monsterdata').style.display = 'none'
    id('playerdata').style.display = 'none'
    id('spells').style.display = 'none'
    clearLog(false)
    nextBattle()
  }
}, 50)

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
