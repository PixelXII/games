var monster, monstername, monstertype;
var water = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain']
var fire = ['Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon']
var earth = ['Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse']
var air = ['Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function castSpell(spell, targ) {
  let d = spell.damage
  let n = spell.name
  
  targ.health -= d
}

function fromImg(img) {
  var opp, fin;
  opp = img.src
  fin = opp.slice(opp.indexOf('alagaesia/'), opp.length)[1]
  fin = fin.slice(fin.indexOf('/')+1)
  
  console.log(fin)
}
  
  
function Spell(name, damage, img) {
  this.name = name
  this.spellType = type
  this.damage = damage
  
  document.getElementById('tb').innerHTML = document.getElementById('tb').innerHTML + '<td> <img class=\'spell\' src="'+img+'" onclick="castSpell('+this.spellType+', '+this.damage+')"> </td>'
}
