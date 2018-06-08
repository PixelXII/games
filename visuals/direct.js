var output = "<i>Please note this is still in development and there is only one option right now.</i> <br> <br> <strong>experiments</strong>"
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
	if(command == 'experiment' || command == 'Experiment') {
 	     location = './experiments/'
	} else {
		printOut('this is still in development. <br> <br> <br> <h1>check back later</h1>')
	}
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});
