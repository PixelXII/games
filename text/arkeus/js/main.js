// global
var consuul = consul.create(new Element('div', document.body), '650', 'calc(100%-30)', 'black', '#0097a7', '#1565c0', '#ffffff')
var ti = consuul.title(`<img alt="logo"src="https://cdn.jsdelivr.net/gh/PixelXII/games/text/arkeus/assets/ark.png" width='20' height='20' style="padding-right:6px;">Arkeus<span style="font-size:18px; float:right; margin-right:8px; margin-top:4px;" class="setting" id="mute">Mute</span>`)
var style = document.createElement('style')
document.body.appendChild(style)
style.innerHTML = `.setting {text-decoration:underline; cursor:pointer;} .setting:hover {text-decoration:none;}`
document.getElementById('mute').addEventListener('click', () => {
     if(Game.muted) {
          Game.unmute()
          document.getElementById('mute').innerHTML = 'Mute'
     } else {
          Game.mute()
          document.getElementById('mute').innerHTML = 'Unmute'
     }
})
var questtest = {
     name:'questtest',
     desc:'questtest desc',
     reward: function() {
          console.warn('questtest reward')
     },
     id: 'quest'
}
var Player = {
    opponent: false,
    previous: undefined,
    inventory: [],
    hp: 50,
    day: true,
    maxhp: 50,
    location: 'north-rivergate',
    quests: [],
    weapon: SteelSword,
    inCombat: false,
    gold: new Gold(150)
};
document.body.style.padding = 0;
document.body.style.margin = 0;
var inputstyle = consul.input(main, true)
inputstyle.id = 'ie'
inputstyle.style.width = '100%'
ti.style.borderBottomStyle = 'double'
document.querySelector('.consul-element').style.height = window.innerHeight - inputstyle.height - 110;
window.onresize = function() {
     document.querySelector('.consul-element').style.height = window.innerHeight - inputstyle.height - 110;
     document.querySelector('.consul-element').style.width = window.innerWidth - 40;
}
Game.init = function() {
    consul.dialogue('You are standing on a small trail, just outside the village of Rivergate.')
    consul.log('The game will save your progress locally, and clearing the cache will reset your game.')
}
Game.init()
document.body.style.height = null

Game.combatElement = document.getElementById('ie')
Game.localSave = true;

function firstandsecond(v) {
     return v.split(' ')[0] + ' ' + v.split(' ')[1]
}
consul.special = function(v) {
     a = consul.log(v)
     a.style.textShadow = '3px 2px 0px purple'
     a.style.color = 'pink'
}

// main handler
Player.previous = 'north-rivergate'

function main(val) {
     Player.quests.forEach(function(e) {
          e = questString(e)
     })
    localStorage.arkeus_save = JSON.stringify(Player)
     if(first(val) === '/dev') {
          switch(second(val)) {
               case 'loc':
                    consul.info(Player.location)
                    break;
               case 'tp':
                    Player.location = third(val)
                    consul.special(`teleported to ${third(val)}`)
                    break;
              case 'version':
                  consul.info(navigator.appVersion)
                  break;
               case 'push':
                    Player.inventory.push(eval(capitalClean(third(val))))
                    consul.info("pushed " + eval(capitalClean(third(val))+'.name'))
                    break;
               case 'ev':
                    var a = eval(third(val))
                    if(a instanceof Item || a instanceof Quest || a instanceof Shop || a instanceof Person || a instanceof Container || a instanceof Weapon) {
                         a = JSON.stringify(a)
                    }
                    consul.info(a)
                    break;
               case 'clear':
                    localStorage.clear()
                    consul.info('cleared')
                    break;
          }
          return false;
     }
     if(Player.hp <= 0) {
          Game.combatElement.disabled = true
          consul.log(Game.placeholder)
          consul.clear()
          consul.special(`You died.`)
          setTimeout(function() {
               localStorage.clear()
               location.reload()
          }, 4000)
     }
     a = val
        val = clean(val.toLowerCase())
        if(commands.includes(first(val))) {
             consul.log(Game.placeholder)
             consul.log(`> ${val}`)
            switch(Player.location) {
               case 'north-rivergate':
                    nRiver(val)
                    break;
               case undefined:
                    nRiver(val)    
                    break;
               case 'rivergate.outskirts':
                    Rivergate.outskirts(val)
                    break;
               case 'rivergate.town':
                    Rivergate.town(val)
                    break;
               case 'rivergate.market':
                    Rivergate.market(val)
                    break;
               case 'rivergate.alley':
                    Rivergate.alley(val)
                    break;
               case 'rivergate.edge':
                    Rivergate.edge(val)
                    break;
               case 'forest.begin-road':
                    forest.beginning(val)
                    break;
               case 'rivergate.inn':
                    Rivergate.inn(val)
                    break;
               case 'forest.hut':
                    forest.hut(val)
                    break;
               case 'valley.beginning':
                    valley.beginning(val)
                    break;
               case 'valley.lake':
                    valley.lake(val)
                    break;
               case 'valley.actualLake':
                    valley.actualLake(val)
                    break;
               case 'valley.forest':
                    valley.forest(val)
                    break;
               case 'valley.field':
                    valley.field(val)
                    break;
               case 'valley.shed':
                    valley.shed(val)
                    break;
               case 'valley.ridge':
                    valley.ridge(val)
                    break;
                case 'valley.moutainTop':
                    valley.mountainTop(val)
                    break;
                case 'acosa.farmland':
                    acosa.farmland(val)
                    break;
                case 'acosa.mainRoad':
                    acosa.mainRoad(val)
                    break;
                case 'acosa.gates':
                    acosa.cityGates(val)
                    break;
                case 'acosa.cityentrance':
                    acosa.entrance(val)
                    break;
                case 'acosa.tavern':
                    acosa.tavern(val)
                    break;
                case 'acosa.potions':
                    acosa.potions(val)
                    break;
                case 'acosa.bank':
                    acosa.bank(val)
                    break;
               default:
                    consul.log(Game.placeholder)
                    consul.special('You have reached a place that is undeveloped. <br> <br> There is no handler for this area, so you have been moved back to your previous location.')
                    Player.location = Player.previous
                    break;
            }
        } else {
            if(val !== '') {
                consul.error('"'+a + '"'+' is not a command. Type "help" for a list of commands.')
            }
        }
}
