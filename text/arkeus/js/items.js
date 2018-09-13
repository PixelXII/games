function cleanUp(s) {
    return s.toLowerCase().replace(/ /g, '-')
}
function Item(name, desc, value) {
    this.name = name
    this.desc = desc
    if(value === undefined) {
         this.value = 0
    } else {
         this.value = value
    }
}

Item.prototype.eat = function() {
    if(this.edible === false) {
        consul.error('The ' + this.name.toLowerCase() + ' is not edible.')
        return false;
    } else {
        if(Player.inventory.includes(this)) {
            consul.log('You eat the ' + this.name.toLowerCase())
            if(this.buffs !== undefined) {
                 this.buffs()
            }
        } else {
            consul.error('There is no ' + this.name.toLowerCase() + ' to eat.')
        }
    }
}

Item.prototype.chug = function() {
     if(this.drink === false) {
        consul.error('The ' + this.name.toLowerCase() + ' is not drinkable.')
        return false;
    } else {
        if(Player.inventory.includes(this)) {
            consul.log('You drink the ' + this.name.toLowerCase())
            if(this.buffs !== undefined) {
                 this.buffs()
            }
        } else {
            consul.error('There is no ' + this.name.toLowerCase() + ' to drink.')
        }
    }
}

function Gold(amount) {
    this.amount = amount
    return this.amount
}

Gold.prototype.spend = function(amount) {
     if(Player.gold.amount < amount) {
          return false;
     } else {
          this.amount -= amount
          return this.amount
     }
}

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
     if(this.items.includes(item) === false) {
          consul.error('The store does not have a '+item.name.toLowerCase())
     } else {
          if(Player.gold.spend(item.value) == false) {
               consul.error('You don\'t have enough gold to buy the '+item.name)
               return false;
          } else {
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
          consul.log('You sell the '+item.name.toLowerCase()+' to '+this.shopkeeper)
          Player.gold.amount += item.value
          Player.inventory.splice(Player.inventory.indexOf(item), 1)
          this.items.push(item)
          this.costs.push(item.value)
     }
}

var Rock = new Item('rock', "It's a rock.")
var Stick = new Item('stick', 'Just a small twig, a large branch.')
var Acorn = new Item('acorn', 'It\'s from an oak tree')
var Pickaxe = new Item('pickaxe', 'The pickaxe is rusty and worn with use.', 15)
var Gold;
var Stone = new Item('stone', 'It shimmers with an ethereal light.', 10)
var Branch = new Item('branch', 'It fell off a tree.')

var HealingTea = new Item('healing tea', 'A warm tea. You are not sure what it is made of.', 20)
var HealingPotion = new Item('healing potion', 'A potion of healing. The label says: "You don\'t want to know what\'s in it.', 25)
var Ale = new Item('ale', 'It\'s classic ale.', 10)
var Beer = new Item('beer', 'It\'s classic beer.', 15)
var Wine = new Item('wine', 'It\'s your average wine.', 20)
