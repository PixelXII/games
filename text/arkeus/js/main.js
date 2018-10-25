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
ti.style.borderBottomStyle = 'double'
var inputstyle = consul.input(parse, true)
inputstyle.id = 'ie'
inputstyle.style.width = '100%'
document.querySelector('.consul-element').style.height = window.innerHeight - inputstyle.height - 110;
window.onresize = function() {
     document.querySelector('.consul-element').style.height = window.innerHeight - inputstyle.height - 110;
     document.querySelector('.consul-element').style.width = window.innerWidth - 40;
}
consul.dialogue('You are standing on a small trail, just outside the village of Rivergate.')
document.body.style.height = null
var Player = {
    location: 'north-rivergate',
    hp: 50,
    maxhp: 50,
    weapon: SteelSword,
    inventory: [],
    quests: [],
    inCombat: false,
    gold: new Gold(150)
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
