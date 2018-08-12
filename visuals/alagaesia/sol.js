var monster, monstername, monstertype;
var enemies = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain', 'Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon', 'Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse', 'Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// Player

var player = {
  level: 1,
  health: 30,
  mana: 30,
  exp: 0,
  levelUp: function() {
    player.level++;
    player.health = player.health + Math.floor(0.20*player.health)
    player.mana = player.mana + Math.floor(0.16*player.mana)
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
var spells = [flames, iceBlast, sparks, squirt, firebolt, freeze, lightningBolt, waterfall, inferno, blizzard, electricStorm, hurricane]
function randomSpell() {
  return spells[Math.random()*spells.length]
}

Spell.prototype.castByMonster = function() {
  player.health -= this.damage
  return 'The ' + monstername + ' used ' + this.name + '!'
}

function nextBattle() {
  document.getElementById('opp').src = enemies[Math.random()*enemies.length]+'.png'
  cm()
}

function spellElement(spell) {
  document.getElementById('tb').innerHTML = document.getElementById('tb').innerHTML + '<img class="spell" src="'+spell+'.png" onclick="castSpell('+spell+')" title="Cast '+spell.toString().replace(/^\w/, c => c.toUpperCase())+'">'
}

function castSpell(spell) {
  let d = spell.damage
  let n = spell.name
  if(monster.health <= 0) {
    player.exp = player.exp + monster.exp
    if(player.exp >= Math.ceil(8.7*player.level)) {
      player.levelUp()
    }
    
    nextBattle()
  } else {
    monster.health -= d
  }
  randomSpell().castByMonster()
}

function fromImg(img) {
  var opp, fin;
  opp = img.src
  fin = opp.slice(opp.indexOf('alagaesia')+'alagaesia'.length+1)
  fin = fin.slice(fin[0], fin.indexOf('.'))
  
  return fin;
}

function cm() {
  monstername = fromImg(document.getElementById('opp'))
  monster = {
    name: monstername.replace(/^\w/, c => c.toUpperCase()),
    health: Math.ceil(alph.indexOf(monstername.charAt(0)) * alph.indexOf(monstername[Math.random()*monstername.length]))+31,
    damage: Math.floor((Math.ceil(alph.indexOf(Math.floor(monstername.length/2)))+16)/2),
    exp: Math.floor(Math.random()*monstername.length/2)+Math.floor(Math.random()*15)
  }
}

cm()
  
  
function Spell(name, damage) {
  this.name = name
  this.damage = damage
  this.imgSrc = this.name.toLowerCase()
}
