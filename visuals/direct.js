var output = "<h2 class='tajawal'>Options:</h2> <br> [select one] <br> <br> caving <br> <br> forest"
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var command;
var noteElem = document.getElementById('note');
setInterval(printOut(output), 100)

function printOut(mess, mess2) {
  outElement.innerHTML = mess
  if(mess2 != null) {
	  out2.innerHTML = mess2;
  }
}

function doAction() {
	command = inElement.value;
	inElement.value = ''
	if(command == 'caving' || command == 'cave') {
 	     location = './caving/'
	} else if(command == 'forest' || command == 'Forest') {
		location = './forest/'
	} else {
		printOut('there is only one game right now <br> <br> <br> <h1>check back later</h1>')
	}
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});
