function first(str) {
    return str.split(' ')[0]
}
function second(str) {
    if(str.includes(' ') === false) {
        return false;
    }
    return str.split(' ')[1]
}
function third(str) {
    if(str.includes(' ') === false) {
        return false;
    }
    return str.split(' ')[2]
}
function clean(str) {
    return str.replace(/undefined/g, '')
}
function capitalize(e, o = undefined) {
    e = e.split('')
    if(o === false) {
        e[0] = e[0].toLowerCase()
    } else {
        e[0] = e[0].toUpperCase()
    }
    e = e.toString().replace(/,/g, '')
    return e
}
function rest(e) {
    if(e.split(' ').length === 1) {
        return undefined;
    } else {
        return e.replace(first(e)+' ', '')
    }
}
function capitalClean(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, "")
}

function Item(name, desc, value) {
    this.name = name
    this.desc = desc
    this.value = value
}

function Person(name, sex, dialogue) {
    this.name = name
    this.sex = sex
    this.dialogue = dialogue
}

Person.prototype.talkto = function() {
    const j = Math.round(Math.random()*this.dialogue.length)
    if(this.dialogue === undefined) {
        consul.dialogue(this.dialogue[0])
    } else {
        consul.dialogue(this.dialogue[j])
    }
}

consul.combat = function(e) {
    consul.log("combat :: " + e).style.color = '#ef6c00'
}

consul.dialogue = function(e) {
    consul.log(e).style.color = '#ec407a'
}

consul.hp = function(e) {
    consul.info(e)
}

var commands = ['move', 'look', 'attack', 'take', 'inspect', 'drop', 'inventory', 'items', 'equip', 'weapon', 'quickheal', 'help', 'skip tutorial', 'buy', 'sell', 'wares', 'balance']
var mdirections = ['forward', 'back', 'left', 'right']
var ldirections = ['forward', 'back', 'left', 'right', 'up', 'down']

var Game = {
     shops: {},
     location: {
          items: [],
          shop: undefined
     },
     placeholder: '_______________________'
};

Game.look = function(e) {
    if(e === undefined) {
        e = 'around'
    } else {
        e = clean(e)
    }
    consul.log('_______________________')
    if(e == 'left') {
        consul.log('You look '+e)
        consul.log(this.lookLeft)
    } else if(e == 'right') {
        consul.log('You look '+e)
        consul.log(this.lookRight)
    } else if(e == 'down') {
        consul.log('You look '+e)
        consul.log(this.lookDown)
    } else if(e == 'up') {
        consul.log('You look '+e)
        consul.log(this.lookUp)
    } else if(e == 'forward') {
        consul.log('You look '+e)
        consul.log(this.lookForward)
    } else if(e == 'back') {
        consul.log('You look '+e)
        consul.log(this.lookBack)
    } else if(e == 'around' || e == false) {
        consul.log(this.lookLeft)
        consul.log(this.lookRight)
        consul.log(this.lookForward)
        consul.log(this.lookBack)
    } else {
        consul.error('You cannot look in that direction.')
        consul.error('usage: look <direction> (left, right, forward, back, up, down)')
    }
}

Game.move = function(e) {
    if(mdirections.includes(e) === false) {
        consul.error('You cannot move in that direction.')
        return false;
    }
    consul.log('_______________________')
    consul.log('You move ' + e)
    consul.log(eval('this.move'+capitalize(e)));
    Player.location = eval('this.'+e.toLowerCase());
    console.log(Player.location)
}

Game.equip = function(e) { // Pass in only text, no eval beforehand
    e = eval(capitalClean(e))
    var inv = Player.inventory
    if(e.type === undefined) {
         return false;
    }
    if(inv.includes(e)) {
         consul.info('You equip the '+e.name.toLowerCase()+'. The '+Player.weapon.name+' is in your inventory.')
         inv.push(Player.weapon)
         Player.weapon = e
         inv.splice(inv.indexOf(e), 1)
    } else {
         consul.error('You don\'t have a '+e.name.toLowerCase())
    }
}

Game.currentWeapon = function() {
     consul.info(Player.weapon.name.toLowerCase())
}

Game.quickheal = function() {
     consul.info('You rub some dirt on your wounds and get over it.')
     const oldhp = Player.hp
     Player.hp += Math.ceil(Player.hp * 0.23)
     console.log(Math.ceil(Player.hp * 0.23))
     if(oldhp > Player.maxhp) {
          Player.hp = Player.maxhp
          consul.info('You already have ' + Player.maxhp + ' health.')
          return false;
     } else {
          if(Player.hp > Player.maxhp) {
               Player.hp = Player.maxhp
               consul.info('You have '+Player.hp+' health out of '+Player.maxhp+'.')
               return false;
          } else {
               consul.info('You have '+Player.hp+' health out of '+Player.maxhp+'.')
          }
     }
}

Game.take = function(e) {
    e = eval(capitalClean(e))
    if(Game.location.items.includes(e)) {
        items = Game.location.items
        consul.log("You take the " + e.name)
        var item = eval(capitalClean(e.name) + ' = new Item("'+e.name+'", "'+e.desc+'", '+e.value+')')
        console.log(item)
        Game.location.items.splice(items.indexOf(e), 1)
        Player.inventory.push(item)
    } else {
        consul.error('You don\'t see a ' + e.name)
        return false;
    }
}

Game.shops.open = function() {
     var s = Game.location.shop
     if(s !== undefined) {
          s.open()
     } else {
          consul.error('There is no shop here.')
          return false;
     }
}

Game.shops.purchase = function(item) {
     console.log(item)
     var s = Game.location.shop
     if(s !== undefined) {
          s.purchase(item)
     } else {
          consul.error('There is no shop here.')
          return false;
     }
}

Game.shops.sell = function(item) {
     item = eval(capitalClean(item))
     console.log(item)
     var s = Game.location.shop
     if(s !== undefined) {
          s.sell(item)
     } else {
          consul.error('There is no shop here.')
          return false;
     }
}

Game.drop = function(e) { // e instanceof Item
    e = eval(capitalClean(e))
    if(Player.inventory.includes(e)) {
        Game.location.items.push(e)
        e.dropped = true
        Player.inventory.splice(Player.inventory.indexOf(e), 1)
        consul.info('You drop the ' + e.name + ' on the ground.')
    } else {
        consul.error('You don\'t have a ' + e.name)
    }
}

Game.inventory = function() {
    if(Player.inventory.length === 0) {
        consul.warning('You are not carrying anything')
        return false;
    }
    consul.log('inventory: ').style.color = '#e91e63'
    var t;
    Player.inventory.forEach(function(i) {
        i = eval(i)
        if(Player.inventory.indexOf(i) === Player.inventory.lastIndexOf()) {
            t += clean(clean(i.name))
        } else {
            t += clean(clean(i.name)) + ', '
        }
    })
    consul.shadow(t.replace(/undefined/g, ''))
}



Game.combat = function(opp, input) {
    if(opp.dead === true) {
        return false;
    } else {
    Player.weapon.use(opp)
        if(opp.hp <= 0) {
            opp.hp = 0;
            Player.inCombat = false;
            opp.dead = true
            input.disabled = false
            input.focus()
            consul.hp('You killed the ' + opp.name.toLowerCase())
            Game.location.items.push(opp.weapon)
            return false;
        } else {
            input.disabled = true
            consul.hp('The '+ opp.name.toLowerCase() + ' has ' + opp.hp + ' health left.')
        }
        setTimeout(function() {
            if(opp.hp !== 0) {
                opp.weapon.mUse(opp)
            } else {
                if(Player.hp <= 0) {
                    Player.hp = 0
                    consul.log(Game.placeholder)
                    consul.error('YOU DIED')
                    input.disabled = false
                    input.focus()
                    Player.inCombat = false
                } else {
                    consul.hp('You have ' + Player.hp + ' health left.')
                }
            }
            input.disabled = false
            input.focus()
        }, Math.random()*3400+840)
    }
}

Game.items = function() {
    if(Game.location.items instanceof Array) {
        if(Game.location.items.length > 0) {
            var i;
            Game.location.items.forEach(function(k) {
                if(k.dropped === true) {
                     if(k.name[0] == 'a' || k.name[0] == 'e' || k.name[0] == 'i' || k.name[0] == 'o' || k.name[0] == 'u') {
                          i += 'an '+k.name.toLowerCase().replace('undefined', '') + ' (dropped), '
                     } else {
                         i += 'a '+k.name.toLowerCase().replace('undefined', '') + ' (dropped), '
                     }
                } else {
                    if(k.name[0] == 'a' || k.name[0] == 'e' || k.name[0] == 'i' || k.name[0] == 'o' || k.name[0] == 'u') {
                         i += 'an '+k.name.toLowerCase().replace('undefined', '') + ', '
                    } else {
                         i += 'a '+k.name.toLowerCase().replace('undefined', '') + ', '
                    }
                }
            })
            consul.log(Game.placeholder)
            consul.emphasis('You scrounge the area.')
            consul.info('You find: ')
            consul.info(clean(i))
        } else {
            consul.log(Game.placeholder)
            consul.emphasis('You scrounge the area.')
            consul.info('You find nothing.')
        }
    }
    return false;
}

Game.balance = function() {
     if(Player.gold.amount < 0) {
          Player.gold.amount = 0;
          consul.info('You have no gold.')
     } else {
          consul.info('You have G '+Player.gold.amount)
     }
}

Game.inspect = function(cmd) {
    var q;
    cmd = eval(capitalClean(cmd))
    console.log(cmd.desc)
    if(cmd instanceof Item === false) {
        consul.error('You cannot inspect that.')
        return false;
    } else {
        if(Player.inventory.includes(cmd)) {
            q = cmd.desc
        }
        consul.log(Game.placeholder)
        consul.emphasis('You inspect the ' + cmd.name)
        consul.info(q)
    }
}

Game.auto = function(val) {
     if(first(val) == 'move') {
          Game.move(second(val))
     } else if(first(val) == 'look') {
          Game.look(second(val))
     } else if(first(val) == 'items') {
          Game.items()
     } else if(first(val) == 'take') {
          Game.take(rest(val))
     } else if(first(val) == 'drop') {
          Game.drop(rest(val))
     } else if(val === 'balance') {
          Game.balance()
     }
     if(Game.location.shop !== undefined || Game.location.shop !== null) {
          if(first(val) == 'wares') {
               Game.shops.open()
          } else if(first(val) == 'sell') {
               Game.shops.sell(rest(val))
          } else if(first(val) == 'buy') {
               Game.shops.purchase(rest(val))
          }
     }
}

Game.help = function(cmd) {
    if(commands.includes(cmd) === false && cmd !== undefined) {
        consul.error('"'+cmd + '" is not a command. We cannot help you.')
        return false;
    }
    if(cmd === undefined || cmd === 'commands') {
        consul.header('Commands List: ')
        consul.log(Game.placeholder).fontSize = '18px'
        commands.forEach(function(e) {
            if(e !== 'skip tutorial') {
                 if(e === 'buy') {
                      consul.header('Shop commands: ')
                      consul.log(Game.placeholder)
                 }
                consul.info(e)
            }
        });
        consul.emphasis('You can get help on a specific command by typing "help [command]"')
    } else {
        if(cmd === 'move') {
            consul.emphasis('Usage: move [direction](left, right, forward, back)')
            consul.hp('Moves you in specified direction.')
        } else if(cmd === 'items') {
            consul.emphasis('Usage: items')
            consul.hp('Displays all items in the area that you can interact with.')
        } else if(cmd === 'look') {
            consul.emphasis('Usage: look [direction](left, right, up, down, forward, back, around)')
            consul.hp('Describes surroundings in specified direction. "around" or just "look" displays all directions.')
        } else if(cmd === 'attack') {
            consul.emphasis('Usage: attack')
            consul.hp('Attacks opponent in area.')
        } else if(cmd === 'take') {
            consul.emphasis('Usage: take [item]')
            consul.hp('Adds an item to your inventory.')
        } else if(cmd === 'drop') {
            consul.emphasis('Usage: drop [item]')
            consul.hp('Removes item from your inventory.')
        } else if(cmd === 'eat') {
            consul.emphasis('Usage: eat [item]')
            consul.hp('You eat the item. Item should to be edible, otherwise you might die.')
        } else if(cmd === 'inspect') {
            consul.emphasis('Usage: inspect [item]')
            consul.hp('You take a closer look at specified item.')
        } else if(cmd === 'inventory') {
            consul.emphasis('Usage: inventory')
            consul.hp('Displays all contents of inventory.')
        } else if(cmd === 'help') {
            consul.hp('....really?')
        } else if(cmd === 'equip') {
             consul.emphasis('Usage: equip [weapon]')
             consul.info('Weapon must be in your inentory. Sends old weapon to your inventory.')
        } else if(cmd === 'quickheal') {
             consul.emphasis('Usage: quickheal')
             consul.info('Heals a small portion of your health.')
        } else if(cmd === 'weapon') {
             consul.emphasis('Usage: weapon')
             consul.info('Displays currently equipped weapon.')
        } else if(cmd === 'buy') {
             consul.emphasis('Usage: buy [item]')
             consul.info('Allows you to purchase an item from a shop.')
        } else if(cmd === 'sell') {
             consul.emphasis('Usage: sell [item]')
             consul.info('Sells item for its universal value.')
        } else if(cmd === 'wares') {
             consul.emphasis('Usage: wares')
             consul.info('Displays the wares of a vendor.')
        } else if(cmd === 'balance') {
             consul.emphasis('Usage: balance')
             consul.info('Displays your balance in gold.')
        }
    }
}
