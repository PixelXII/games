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
function cleanUp(s) {
    return s.toLowerCase().replace(/ /g, '-')
}

// Quests

function Quest(name, desc, reward) {
     this.name = name
     this.desc = desc
     this.reward = reward
}
Quest.prototype.initiate = function() {
     Player.quests.push(this)
     consul.log(Game.placeholder)
     consul.dialogue('You initiated the quest "'+this.name+'".')
     consul.info(this.desc)
}
Quest.prototype.resolve = function() {
     Player.quests.splice(Player.quests.indexOf(this), 1)
     consul.log(Game.placeholder)
     consul.dialogue('You resolved the quest "'+this.name+'".')
     this.reward()
}

// Items

function Item(name, desc, value, edible, buffs = undefined) {
    this.name = name
    this.desc = desc
    if(buffs !== undefined) {
         this.buffs = buffs
    }
    if(value === undefined) {
         this.value = 0
    } else {
         this.value = value
    }
    this.edible = edible
}
Item.prototype.eat = function() {
    if(this.edible === false) {
        consul.error('The ' + this.name.toLowerCase() + ' is not edible.')
        return false;
    } else {
        if(Player.inventory.includes(this)) {
            consul.log('You consume the ' + this.name.toLowerCase())
            Player.inventory.splice(Player.inventory.indexOf(this), 1)
            this.buffs()
        } else {
            consul.error('You don\'t have a ' + this.name.toLowerCase() + ' to consume.')
        }
    }
}

// Containers

function Container(name, contents) {
     this.name = name
     this.contents = contents
     this.contentString = ''
     this.contents.forEach((e) => {
          if(this.contents.indexOf(e) == this.contents.length-1) {
               this.contentString += "and " + e.name.toLowerCase()
          } else {
               this.contentString += e.name + ', '
          }
     })
}

Container.prototype.lookInside = function() {
     if(Game.location.items.includes(this)) {
          consul.log(Game.placeholder)
          consul.emphasis('You look inside the ' + this.name)
          consul.info('You find ' + this.contentString)
     } else {
          consul.error("There is no " + this.name + " to look inside.")
          return false;
     }
}

Container.prototype.loot = function() {
     if(Game.location.items.includes(this)) {
          this.contents.forEach((e) => {
               Player.inventory.push(e)
          })
          var items = Game.location.items
          items = items.splice(items.indexOf(this), 1)
          consul.log(Game.placeholder)
          consul.info('You take everything in the ' + this.name)
     } else {
          consul.error("There is no " + this.name + " to loot.")
          return false;
     }
}

// People

function Person(name, dialogue) {
    this.name = name
    this.dialogue = dialogue
}

// Weapons

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

// Gold

function Gold(amount) {
    this.amount = amount
    this.name = 'gold'
    return this.amount
}

Gold.prototype.spend = function(amount) {
     if(Player.gold.amount < amount) {
          return false;
     } else {
          return this.amount
     }
}

// Shops

function Shop(name, shopkeeper, items, costs) {
     this.name = name
     this.shopkeeper = shopkeeper
     this.items = items
     this.costs = costs
}

Shop.prototype.open = function() {
     let i = [], c = [], that = this, res;
     this.items.forEach(function(e) {
          i.push(e.name + ' -- $')
          c.push(that.costs[that.items.indexOf(e)] + ', ')
     })
     i.forEach(function(e) {
          res += e + c[i.indexOf(e)]
     })
     consul.info(this.shopkeeper + ' shows you their wares.')
     consul.log(clean(res).replace(/, /g, "<br>"))
}

Shop.prototype.purchase = function(item) {
     item = eval(capitalClean(item))
     if(item === undefined) {
          consul.error('That is not an item.')
          return false;
     }
     if(this.items.includes(item) === false) {
          consul.error('The store does not have a '+item.name.toLowerCase())
     } else {
          if(Player.gold.spend(item.value) === false) {
               consul.error('You don\'t have enough gold to buy the '+item.name)
               return false;
          } else {
               sounds.coin.play()
               Player.gold.amount -= this.costs[this.items.indexOf(item)]
               consul.log('You purchase the '+item.name.toLowerCase()+' from '+this.shopkeeper+'\'s stock.')
               Player.inventory.push(item)
               this.items.splice(this.items.indexOf(item), 1)
          }
     }
}

Shop.prototype.sell = function(item) {
     if(Player.inventory.includes(item) === false) {
          consul.error('You don\'t have a '+item.name.toLowerCase()+' to sell.')
     } else {
          sounds.coin.play()
          consul.log('You sell the '+item.name.toLowerCase()+' to '+this.shopkeeper)
          Player.gold.amount += item.value
          Player.inventory.splice(Player.inventory.indexOf(item), 1)
          this.items.push(item)
          this.costs.push(item.value)
     }
}

// Custom consul commands

consul.combat = function(e) {
    consul.log("combat :: " + e).style.color = '#ef6c00'
}

consul.dialogue = function(e) {
    consul.log(e).style.color = '#ec407a'
}

consul.hp = function(e) {
    consul.info(e)
}

consul.quest = function(e) {
     consul.dialogue('NEW QUEST!  > ' + e)
}

// Arrays

var commands = ['move', 'look', 'attack', 'take', 'inspect', 'drop', 'inventory', 'consume', 'items', 'equip', 'weapon', 'help', 'health', 'journal', 'talk to', 'loot', 'skip tutorial', 'buy', 'sell', 'wares', 'balance']
var mdirections = ['forward', 'back', 'left', 'right']
var ldirections = ['forward', 'back', 'left', 'right', 'up', 'down']

// Main game object

var Game = {
     shops: {},
     containers: {},
     location: {
          items: [],
          shop: undefined,
          person: undefined,
          opponent: undefined
     },
     placeholder: '_______________________',
     combatElement: undefined,
     muted: false
};

Game.mute = function() {
     sounds.coin.volume = 0;
     sounds.atk.volume = 0;
     sounds.consume.volume = 0;
     sounds.equip.volume = 0;
     Game.muted = true
}

Game.unmute = function() {
     sounds.coin.volume = 1
     sounds.atk.volume = 1
     sounds.consume.volume = 1
     sounds.equip.volume = 1
     Game.muted = false
}

Game.reset = function() {
     Game.moveRight = ''
     Game.moveLeft = ''
     Game.moveForward = ''
     Game.moveBack = ''
     Game.right = Player.location
     Game.left = Player.location
     Game.forward = Player.location
     Game.back = Player.location
     Game.location.opponent = undefined
     Game.location.items = []
     Game.location.person = undefined
     Game.location.shop = undefined
}

// Game functions

Game.look = function(e) {
     if(second(e) == 'inside') {
          Game.containers.lookInside(third(e))
          return false;
     } else {
          e = second(e)
     }
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

Game.health = function() {
     if(Player.hp > Player.maxhp) {
          Player.hp = Player.maxhp
     }
     consul.info('You have '+Player.hp+' health out of '+Player.maxhp)
}

Game.move = function(e) {
    if(mdirections.includes(e) === false) {
        consul.error('You cannot move in that direction.')
        return false;
    }
    if(eval('Game.move'+capitalize(e)) === '') {
         return false;
    }
    consul.log('_______________________')
    consul.log('You move ' + e)
    consul.log(eval('this.move'+capitalize(e)));
    Player.location = eval('this.'+e.toLowerCase());
}

Game.equip = function(e) { // Pass in only text, no eval beforehand
    e = eval(capitalClean(e))
    var inv = Player.inventory
    sounds.equip.play()
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

Game.journal = function() {
     consul.log(Game.placeholder)
     consul.dialogue('Quests:')
     if(Player.quests.length > 0) {
          Player.quests.forEach(function(e) {
               consul.info('"'+e.name+'"')
          });
     } else {
          consul.info('You have no active quests.')
     }
     consul.log(Game.placeholder)
}

Game.currentWeapon = function() {
     consul.info('Your current weapon is a '+Player.weapon.name.toLowerCase())
}

Game.quickheal = function() {
     consul.info('You rub some dirt on your wounds and get over it.')
     const oldhp = Player.hp
     Player.hp += 1
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

Game.consume = function(e) { // pass string
     e = eval(capitalClean(e))
     console.log(e)
     sounds.consume.play()
     e.eat()
}

Game.take = function(e) {
    e = eval(capitalClean(e))
    if(Game.location.items.includes(e)) {
        if(e instanceof Container) {
             e.loot()
             return false;
        }
        items = Game.location.items
        consul.log("You take the " + e.name)
        var item = eval(capitalClean(e.name) + ' = new Item("'+e.name+'", "'+e.desc+'", '+e.value+', '+e.edible+', '+e.buffs+')')
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



Game.combat = function(input) {
     var opp = Game.location.opponent
     var g = Game.combatElement
     if(opp === undefined) {
          consul.error('There is nothing to fight here.')
          Player.inCombat = false;
          return false;
     }
    if(opp.dead === true) {
        return false;
    } else {
    Player.weapon.use(opp)
        if(opp.hp <= 0) {
            opp.hp = 0;
            sounds.atk.play()
            Player.inCombat = false;
            opp.dead = true
            input.disabled = false
            input.focus()
            consul.hp('You killed the ' + opp.name.toLowerCase())
            if(opp.weapon.type !== 'natural') {
               Game.location.items.push(opp.weapon)
               eval('var ' + capitalClean(opp.name) + ' = new Container('+opp.name+"'s body"+', ['+new Gold(Math.round(Math.random()*opp.hp*0.8))+', '+opp.weapon+'])')
            }
            if(opp.weapon.type === 'natural') {
               eval('var ' + capitalClean(opp.name) + ' = new Container("one", [Acorn])')
            }
            return false;
        } else {
             sounds.atk.play()
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

Game.monsterCombat = function() {
     opp = Game.location.opponent
     if(opp === undefined) {
          return false;
     }
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
}

Game.items = function() {
    if(Game.location.items instanceof Array) {
        if(Game.location.items.length > 0) {
            var i = '', a = '';
            Game.location.items.forEach(function(k) {
                 if(k instanceof Container) {
                      if(k.name[0] == 'a' || k.name[0] == 'e' || k.name[0] == 'i' || k.name[0] == 'o' || k.name[0] == 'u') {
                           a += 'an ' + k.name + ', '
                      } else {
                         a += 'a '+k.name + ', '
                      }
                } else {
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
                }
            })
            consul.log(Game.placeholder)
            consul.emphasis('You scrounge the area.')
            consul.info('You find: ')
            consul.info(clean(i))
            consul.info(a)
        } else {
            consul.log(Game.placeholder)
            consul.emphasis('You scrounge the area.')
            consul.info('You find nothing.')
        }
    }
    return false;
}

Game.containers.loot = function(e) {
     e = eval(capitalClean(e))
     console.log(e)
     e.loot()
}

Game.containers.lookInside = function(e) {
     e = eval(capitalClean(e))
     console.log(e)
     e.lookInside()
}

Game.talk = function(val) {
     person = Game.location.person
     if(person === undefined) {
          consul.error('You don\'t see anyone around.')
          return false;
     }
     if(person instanceof Person) {
          if(val.toLowerCase() == person.name.toLowerCase()) {
               consul.log(Game.placeholder)
               person.dialogue.call()
          } else {
               consul.error('You don\'t see anyone named '+capitalize(val))
          }
     } else {
          consul.log('That is not a person.')
     }
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

Game.parse = function(val) {
          if(first(val) == 'move') {
               Game.move(second(val))
          } else if(first(val) == 'look') {
               Game.look(val)
          } else if(first(val) == 'items') {
               Game.items()
          } else if(val == 'attack') {
               Player.inCombat = true
               Game.combat(Game.combatElement)
          } else if(first(val) == 'take') {
               Game.take(rest(val))
          } else if(first(val) == 'drop') {
               Game.drop(rest(val))
          } else if(val === 'balance') {
               Game.balance()
          } else if(first(val) == 'consume') {
               Game.consume(rest(val))
          } else if(val == 'journal') {
               Game.journal()
          } else if(first(val) == 'talk' && second(val) == 'to') {
               if(Game.location.person !== null || Game.location.person !== undefined) {
                    Game.talk(third(val))
               } else {
                    consul.error('There is nobody here.')
               }
          } else if(first(val) == 'health') {
               Game.health()
          } else if(first(val) == 'loot') {
               Game.containers.loot(rest(val))
          } else if(first(val) == 'look' && second(val) == 'inside') {
               
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

Game.auto = function(val) {
     if(Player.inCombat === false || val === 'attack') {
          Game.parse(val)
     } else {
          if(first(val) == 'move') {
               consul.error('You cannot retreat from this battle.')
          } else {
               Game.parse(val)
               consul.log(Game.placeholder)
               Game.monsterCombat()
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
                      consul.header('<br>Shop commands: ')
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
            consul.emphasis('Usage: consume [item]')
            consul.hp('You consume the item. Item should to be edible, otherwise you might die.')
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
        } else if(cmd === 'journal') {
             consul.emphasis('Usage: journal')
             consul.info('Displays your active quests.')
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
        } else if(cmd === 'talk to') {
             consul.emphasis('Usage: talk to [person]')
             consul.info('Starts a conversation with the nearest person.')
        }
    }
}
