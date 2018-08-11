var monster, monstername, monstertype;
var enemies = ['Piranha', 'Shark', 'Mutant Turtle', 'Pirate', 'Pirate Captain', 'Fire Atronach', 'Firebeetle', 'Flametongue', 'Dragon', 'Elf', 'Spriggan', 'Demented Flower', 'Dwarf', 'Dwarf King', 'Rockmouse', 'Storm Atronach', 'Air Elemental', 'Cloud Elf', 'Sunbird']
var alph = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function castSpell(spell, targ) {
  let d = spell.damage
  let n = spell.name
  
  targ.health -= d
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
    damage: Math.ceil(alph.indexOf(Math.floor(monstername.length/2)))+16,
    exp: Math.ceil(alph.indexOf(alph.toString().replace(/,/g, '').charAt(Math.ceil(monstername.length/Math.random()*6)))+Math.random()*Math.floor(monstername.length/7))*16
  }
}
  
  
function Spell(name, damage, img) {
  this.name = name
  this.spellType = type
  this.damage = damage
  
  document.getElementById('tb').innerHTML = document.getElementById('tb').innerHTML + '<td> <img class=\'spell\' src="'+img+'" onclick="castSpell('+this.spellType+', '+this.damage+')"> </td>'
}
