// global

var consuul = consul.create(new Element('div', document.body), '650', 'calc(100%-30)', 'black', '#0097a7', '#1565c0', '#ffffff')
var ti = consuul.title(`<img src="assets/ark.png" width='20' height='20' style="padding-right:6px;">Arkeus`)
ti.style.borderBottomStyle = 'double'
var inputstyle = consul.input(parse, true)
inputstyle.id = 'ie'
inputstyle.style.width = '100%'
consul.emphasis('You are in the tutorial. To skip the tutorial, type "skip tutorial"')
consul.dialogue('If you\'re new to this game, or text games in general, you should complete the tutorial.')
consul.log('First, try "look" or "look around"')
document.body.style.height = null
var Player = {
    location: 'tutorial-start',
    hp: 50,
    maxhp: 50,
    weapon: SteelSword,
    inventory: [],
    quests: [],
    inCombat: false,
    gold: new Gold(500)
}

Game.combatElement = document.getElementById('ie')

function firstandsecond(v) {
     return v.split(' ')[0] + ' ' + v.split(' ')[1]
}
consul.special = function(v) {
     a = consul.log(v)
     a.style.textShadow = '3px 2px 0px purple'
     a.style.color = 'pink'
}

// main handler

function parse(val) {
     if(val.toLowerCase().includes('ree')) {
                 consul.special("BATTLE CRY")
                 setTimeout(() => {
                      consul.special("REEEEEEEEEEEEEEEEEE")
                 }, 24000)
                 return false;
            }
     if(val.toLowerCase().includes('pikachu')) {
          consul.special('PIKACHU GO')
          if(Player.inCombat) {
               Game.location.opponent.hp -= 50
               if(Game.location.opponent.hp < 0) {
                    Game.location.opponent.hp = 0;
                    Player.inCombat = false
                    Game.location.opponent.dead = true;
                    consul.info('The ' + Game.location.opponent.name + ' is dead.')
               }
          }
          return false;
     }
        val = clean(val.toLowerCase())
        if(commands.includes(first(val)) || val == 'skip tutorial' || firstandsecond(val) == 'talk to') {
            if(val.includes('help')) {
                consul.log('> '+val)
                Game.help(rest(val))
                return false;
            } else if(val == 'inventory') {
                Game.inventory()
                return false;
            } else if(first(val) === 'inspect') {
                Game.inspect(rest(val).replace(/undefined/g, ''))
                return false;
            } else if(first(val) == 'equip') {
                 Game.equip(rest(val))
                 return false;
            } else if(first(val) == 'weapon') {
                 Game.currentWeapon()
                 return false;
            }
          consul.log('> '+val)
            if(Player.location === 'tutorial-start') {
                tutorialStart(val)
            } else if(Player.location === 'rockpile') {
                tutorialPile(val)
            } else if(Player.location === 'mine') {
                tutorialMine(val)
            } else if(Player.location === 'chamber') {
                tutorialChamber(val)
            } else if(Player.location === 'second-tunnel') {
                sTunnel(val)
            } else if(Player.location === 'shrine') {
                shrineTutorial(val)
            } else if(Player.location === 'nw-saeur') {
                nwS(val)
            } else if(Player.location == 'outskirts') {
                 outskirts(val)
            } else if(Player.location == 'barties') {
                 barties(val)
            } else if(Player.location == 'barties-bar') {
                 bBar(val)
            } else if(Player.location == 'barties-inn') {
                 bInn(val)
            } else if(Player.location == 'barties-hall-end') {
                 hEnd(val)
            } else if(Player.location == 'barties-room') {
                 jRoom(val)
            } else if(Player.location == 'bridge') {
                 junct(val)
            } else if(Player.location == 'jFarm') {
                 jFarm(val)
            } else if(Player.location == 'jFarm-field') {
                 jField(val)
            } else if(Player.location == 'jFarm-hole') {
                 jFarmhole(val)
            } else if(Player.location == 'jFarm-nest') {
                 jFarmnest(val)
            }
        } else {
            if(val !== '') {
                consul.error('"'+val + '"'+' is not a command. Type "help" for a list of commands.')
            }
        }
}

// intervals

const health = setInterval(function() {
     if(Player.hp > Player.maxhp) {
          Player.hp = Player.maxhp
     }
}, 20)
