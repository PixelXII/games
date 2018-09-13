function Weapon(type, name, damage, desc) {
    this.damage = damage
    this.desc = desc
    this.name = name
    this.type = type
    return this
}

Weapon.prototype.use = function(target) {
    let dmg = parseInt(Math.round((Math.random()*3)+this.damage))
    if(dmg > target.hp) {
        target.hp = 0;
    } else {
        target.hp -= dmg
    }
    if(target.hp < 0) {
        target.hp = 0
    }
    consul.combat('You did ' + dmg + ' damage to the ' + target.name.toLowerCase())
}

Weapon.prototype.mUse = function(user) {
    let dmg = parseInt(Math.round((Math.random()*3)+this.damage))
    if(dmg > Player.hp) {
        Player.health = 0
    } else {
        Player.hp -= dmg
    }
    consul.combat('The ' + user.name + ' did ' + dmg + ' damage.')
    consul.hp('You have ' + Player.hp + ' health left.')
}

var sword = 'sword'
var mace = 'mace'
var axe = 'axe'
var spear = 'spear'

var IronSword = new Weapon(sword, 'Iron Sword', 13, 'A simple iron sword.')
var SteelSword = new Weapon(sword, "Steel Sword", 15, 'A simple steel sword.')
var AdamantineSword = new Weapon(sword, "Adamantine Sword", 16, 'The adamantine in the sword glows with a soft red light.')
var IronMace = new Weapon(mace, "Iron Mace", 17, 'A simple iron mace.')
var SteelMace = new Weapon(mace, "Steel Mace", 11, 'A simple steel mace.')
var EbonyMace = new Weapon(mace, "Ebony Mace", 12, 'This mace seems to absorb all light around it.')
var WoodAxe = new Weapon(axe, "Wooden War Axe", 14, 'A primitive war axe.')
var IronAxe = new Weapon(axe, "Iron War Axe", 12, 'A simple iron war axe.')
var SteelAxe = new Weapon(axe, "Steel War Axe", 12, 'A simple steel war axe.')
var IronSpear = new Weapon(spear, 'Iron Spear', 11, 'A simple iron spear.')
var SteelSpear = new Weapon(spear, 'Steel Spear', 13, 'A simple steel spear.')
var OrichalcumSpear = new Weapon(spear, 'Orichalcum Spear', 15, 'The orichalcum in the spear gives off a light without color.')

var CleodianDagger = new Weapon('dagger', 'Cleodian Dagger', 20, 'Whoever wielded this dagger last must have had immense strength, as the dagger is very heavy.')
var RoransHammer = new Weapon('hammer', 'Roran\'s Hammer', 19, 'The hammer looks like a blacksmith\'s hammer.')
var NocriteKatana = new Weapon('katana', 'Nocrite Katana', 22, 'The katana gleams in the light of the sun, giving off a warm glow.')
var StiraothsStaff = new Weapon(sword, "Stiraoth's Quarterstaff", 21, 'The previous owner of this staff was either very rich or had a lot of skill with woodcarving, because the staff has many intricate carvings. Some depict stories of battles, and others are just designs.')
