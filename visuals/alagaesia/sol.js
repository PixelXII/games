var monster, monstername, monstertype;
var enemies = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain', 'Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon', 'Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse', 'Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

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


function castSpell(spell) {
  let d = spell.damage
  let n = spell.name
  
  monster.health -= d
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
  
  
function Spell(name, damage) {
  this.name = name
  this.damage = damage
  this.imgSrc = this.name.toLowerCase()
}
