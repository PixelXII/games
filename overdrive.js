var output;
var action;
var aElement = document.getElementById('input');
var oElement = document.getElementById('out');

function printOut(mess) {
  oElement.innerHTML = mess
}

function doAction() {
  aElement.submit;
  console.log('done');
  action = document.getElementById('input').value;
  setInterval(printOut(action), 100)
}
