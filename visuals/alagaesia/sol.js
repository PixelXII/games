var monster;
var water = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain']
var fire = ['Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon']
var earth = ['Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse']
var air = ['Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function castSpell(type, damage) {
  var monstername = document.getElementById('opp').src
  monstername = monstername.split(monstername.indexOf('.'), monstername.length)
  var monstertype;
  if(water.includes(monstername)) {
    monstertype = 'water'
  } else if(fire.includes(monstername)) {
    monstertype = 'fire'
  } else if(earth.includes(monstername)) {
    monstertype = 'earth'
  } else if(air.includes(monstername)) {
    monstertype = 'air'
  }
  
  var o = monstername[0]
  var l = monstername[monstername.length]
  var health = alph.indexOf(o)+1 * alph.indexOf(l)+1
  
  
  monster = {
    name: monstername,
    type: monstertype
  }
}
  
  
function Spell(name, type, damage, img) {
  this.name = name
  this.spellType = type
  this.damage = damage
  
  document.getElementById('tb').innerHTML = document.getElementById('tb').innerHTML + '<td> <img class=\'spell\' src="'+img+'" onclick="castSpell('+this.spellType+', '+this.damage+')"> </td>'
}
