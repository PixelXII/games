var baller = new Image()
var canvas = document.getElementById('canvas');
canvas.appendChild(baller)

var i = 1
function displayImage() {
  while(i<10) {
    baller.src = i+'.png'
    i++
  }
}

setInterval(function(){ displayImage() }, 100)
