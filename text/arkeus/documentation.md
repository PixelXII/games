# game.js documentation

  ### Quests
  
  ````javascript
  var quest = new Quest("questname", "questdescription", function() { console.log('QUESTREWARD') })
  quest.initiate()
  quest.resolve()
  ````
  
  ### Items
  
  ```javascript
  var Item = new Item('itemname', 'itemdescription', parseInt(itemvalue), itemedible[true/false], function() { console.log('itembuffs') })
  Item.eat()
  ````
  
  
