// global

var consuul = consul.create(new Element('div', document.body), '650', 'calc(100%-30)', 'black', '#0097a7', '#1565c0', '#ffffff')
consul.title('Arkeus')
var inputstyle = consul.input(parse, true)
inputstyle.id = 'ie'
inputstyle.style.width = 1000
consul.emphasis('You are in the tutorial. To skip the tutorial, type "skip tutorial"')
consul.log('First, try "look" or "look around"')
var Player = {
    location: 'tutorial-start',
    hp: 50,
    maxhp: 50,
    weapon: SteelSword,
    inventory: [],
    inCombat: false,
    gold: new Gold(500)
}

// main handler

function parse(val) {
        val = clean(val)
        if(commands.includes(first(val)) || val == 'skip tutorial') {
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
            } else if(first(val) == 'quickheal') {
                 Game.quickheal()
                 return false;
            } else if(first(val) == 'weapon') {
                 Game.currentWeapon()
                 return false;
            }
        
            if(Player.location === 'tutorial-start') {
                consul.log('> '+val)
                tutorialStart(val)
            } else if(Player.location === 'rockpile') {
                consul.log('> '+val)
                tutorialPile(val)
            } else if(Player.location === 'mine') {
                consul.log('> '+val)
                tutorialMine(val)
            } else if(Player.location === 'chamber') {
                consul.log('> '+val)
                tutorialChamber(val)
            } else if(Player.location === 'second-tunnel') {
                consul.log('> '+val)
                sTunnel(val)
            } else if(Player.location === 'shrine') {
                consul.log('> '+val)
                shrineTutorial(val)
            } else if(Player.location === 'nw-saeur') {
                consul.log('> '+val)
                nwS(val)
            } else if(Player.location == 'outskirts') {
                 consul.log('> '+val)
                 outskirts(val)
            } else if(Player.location == 'barties') {
                 barties(val)
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
