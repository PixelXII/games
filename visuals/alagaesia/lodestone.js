var playername;
var playerdata = {}

function firstLoad() {
  var div = document.createElement('div')
  document.body.appendChild(div)
  div.id = 'startup'
  div.innerHTML = "<div align='center'> <br> <img src='images/logo.png'/> <br> <br> <br> <div id='title' class='largetext'>$GAME_NAME</div> <br> <br> <legend>What is your name?</legend> <br> <input class='input' id='playername' type='text'> <br> <br> <br> <div id='enter' class='button' style='background-color:#3f51b5; width:100px;'>!&nbsp ENTER</div><br>"
  id('main').style.display = 'none'
  id('enter').addEventListener('click', function() {
    enter()
  });
  id('playername').addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
      playername = id('playername').value
      id('playername').value = ''
      playerdata.name = playername
      enter()
    }
  });
}

function enter() {
  id('startup').style.display = 'none'
  id('main').style.display = 'block'
  id('playerlabel').innerHTML = playername + ':&nbsp';
}

firstLoad()
