var output;
var action;
var aElement = document.getElementById('input');

function printOut(mess) {
  aElement.innerHTML = mess
}

function doAction() {
  aElement.submit;
  console.log('done');
  action = document.getElementById('input').value;
  setInterval(printOut(action), 100)
}
