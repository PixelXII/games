game.move = function() {
  var actionElement = document.getElementById('input');
    if(value.inlcudes('move') || value.includes('walk') || value.includes('step')) {
		if(action.charAt(6) != ' ') {
			var five = action.charAt(5)+action.charAt(6);
        } else {
        	var five = action.charAt(5);
        }
		
        console.log('You move ' + five + ' steps ' + direction + '.');
	}
}

function doAction() {
  actionElement.submit;
  var action = actionElement.value;
  game.move()
}
