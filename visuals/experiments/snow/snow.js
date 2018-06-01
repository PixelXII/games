/* var baller = new Image()
var canvas = document.getElementById('canvas');
var ball = document.getElementById('baller');

var i = 1
function displayImage() {
  while(i<10) {
    baller.src = i+'.png'
    i++
  }
}

setInterval(function(){ displayImage() }, 100) */
window.onload = function() {
  var slideIndex = 0;
  var x = document.getElementsByClassName("mySlides");
  var y = x[slideIndex-1]
  var i;
  function skooch() {
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
      }
      slideIndex++;
      if (slideIndex >= x.length) {slideIndex = 1} 
      y.style.display = "block"; 
  }
  setInterval(skooch, 500);
  skooch();
}
