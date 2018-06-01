 function displayImage() {
    var slideIndex = 0;
    var x = document.getElementsByClassName("mySlides");
    var i = 0;
    function skooch() {
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none"; 
        }
        slideIndex++; 
        x[slideIndex-1].style.display = "block"; 
   }
   setInterval(skooch, 100);
  }
