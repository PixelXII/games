var playername;
var playerdata = {}

function progressBar() {
  document.body.style.backgroundColor = 'white'
  function move() {
    var elem = document.getElementById("progress-main"); 
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id)
        document.body.style.backgroundImage = 'url(images/cobble.png)'
        firstLoad()
        document.getElementById('progress-shell').outerHTML = ""
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
    }
  }
  move()
}

function displayFirst() {
  var first = document.createElement('div')
  document.body.appendChild(first)
  first.id = 'bstartup'
  first.innerHTML = "<div align='center'> <br> <img src='images/fire.png' width='100' height='100'/> <br> <br> <br> <div class='title' style='font-size:36px;'>Spellfyre</div> <br> <br> <div class='button' id='play' style='background-color:#42a5f5;'>! &nbspPLAY</div> </div>"
  id('play').addEventListener('click', function() {
    id('bstartup').style.display = 'none'
    id('startup').style.display = 'block'
  });
}

function firstLoad() {
  var div = document.createElement('div')
  document.body.appendChild(div)
  div.id = 'startup'
  div.innerHTML = "<div align='center'> <br> <img src='images/logo.png'/> <br> <br> <br> <div class='title' style='font-size:36px;'>Spellfyre</div> <br> <br> <legend>What is your name?</legend> <br> <input autofocus='true' class='input' id='playername' type='text'> <br> <legend id='warn'></legend> <br> <br> <div id='enter' class='button' style='background-color:#3f51b5; width:100px;'>!&nbsp ENTER</div><br>"
  div.style.display = 'none'
  displayFirst()
  id('main').style.display = 'none'
  id('enter').addEventListener('click', function() {
    playername = id('playername').value
    id('playername').value = ''
    if(playername === '' || playername.length <= 2) {
      id('warn').style.color = 'red'
      id('warn').innerHTML = 'Please choose a longer name'
    }
    if(playername.includes('>') || playername.includes('<')) {
      id('warn').innerHTML = 'Please choose a different name'
    }
    playerdata.name = playername
    enter()
  });
  id('playername').addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
      playername = id('playername').value
      id('playername').value = ''
      if(playername === '' || playername.length <= 2) {
        id('warn').style.color = 'red'
        id('warn').innerHTML = 'Please choose a longer name'
      }
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
