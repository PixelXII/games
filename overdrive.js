var output;
var action;
function printOut(mess) {
  aElement.innerHTML = mess
}
var aElement = document.getElementById('input');
function doAction() {
  aElement.submit;
  action = document.getElementById('input').value;
  setInterval(printOut(action), 100)
}
