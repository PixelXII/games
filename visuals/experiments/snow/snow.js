var baller = new Image()
var canvas = document.getElementById('canvas');
canvas.appendChild(baller)

var i = 1
function displayImage() {
  for(i<10) {
    baller.src = i+'.png'
    i++
  }
}

setInterval(function(){ displayImage() }, 100)
