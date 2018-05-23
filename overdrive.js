var output;
var action;
var inElement = document.getElementById('input');
var outElement = document.getElementById('out');

function printOut(mess) {
  outElement.innerHTML = mess
}

function doAction() {
  inElement.submit;
  console.log('done');
  action = inElement.value;
  setInterval(printOut(action), 100)
}

inElement.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      doAction()
    }
});
