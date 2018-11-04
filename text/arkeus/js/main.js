// global
var consuul = consul.create(new Element('div', document.body), '650', 'calc(100%-30)', 'black', '#0097a7', '#1565c0', '#ffffff')
var ti = consuul.title(`<img alt="logo"src="assets/ark.png" width='20' height='20' style="padding-right:6px;">Arkeus<span style="font-size:18px; float:right; margin-right:8px; margin-top:4px;" class="setting" id="mute">Mute</span>`)
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
    consul.log('The local save feature is enabled.').style.fontSize = '20px'
    consul.log(`Please note that the local save feature cannot save in combat situatios.`).style.fontSize = '14px'
}
document.body.style.height = null
Player.location = 'north-rivergate'
Player.maxhp = 50
Player.hp = Player.maxhp;
Player.weapon = SteelSword

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
          }
          return false;
     }
     if(val.toLowerCase().includes('ree')) {
                 consul.special("BATTLE CRY")
                 setTimeout(() => {
                      consul.special("REEEEEEEEEEEEEEEEEE")
                 }, 24000)
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
     if(val.toLowerCase().includes('pikachu')) {
          consul.special('PIKACHU GO')
          if(Player.inCombat) {
               Game.location.opponent.hp -= 50
               if(Game.location.opponent.hp < 0) {
                    Game.location.opponent.hp = 0;
                    Player.inCombat = false
                    Game.location.opponent.dead = true;
                    consul.info(`The ${Game.location.opponent.name} is dead.`)
               }
          }
          return false;
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

// intervals

const health = setInterval(function() {
     if(Player.hp > Player.maxhp) {
          Player.hp = Player.maxhp
     }
}, 20)
