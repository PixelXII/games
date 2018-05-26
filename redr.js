var output = "caving <br> <br> <i style='font-size:12px;'>there's only one right now</i>"
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');
var out2 = document.getElementById('out2');
var command = inElement.value;
var noteElem = document.getElementById('note');
setInterval(printOut(output), 100)

function printOut(mess, mess2) {
  outElement.innerHTML = mess
  if(mess2 != null) {
	  out2.innerHTML = mess2;
  }
}

if(command == 'caving' || command == 'cave') {
  location = '/caving'
}
