this.addEventListener('click', function(event) {
  if(event.button == 0 && event.shiftKey == false)
    postMessage('left-click');
 
  if(event.button == 2 || (event.button == 0 && event.shiftKey == true))
    postMessage('right-click');
    event.preventDefault();
}, true);
