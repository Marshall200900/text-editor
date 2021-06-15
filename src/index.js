import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import './index.scss';
import { Provider } from 'react-redux';
import store from './store';


const styles = `
    body {
        margin: 0;
    }
`;

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

let stylesheet = document.createElement('style');
stylesheet.innerText = styles;
document.head.appendChild(stylesheet);

root.id = 'root'
document.body.appendChild(root)
document.head.innerHTML = document.head.innerHTML + '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">';
document.head.innerHTML = document.head.innerHTML + '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>';





// Now we can render our application into it
render(<React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>, document.getElementById('root'))

var handler = document.querySelector('.handler');
var wrapper = handler.closest('.work-window');
var boxA = wrapper.querySelector('.expand-panel');
var isHandlerDragging = false;
var handlerOut = document.querySelector('.handler-out');




document.addEventListener('mousedown', function(e) {
  // If mousedown event is fired from .handler, toggle flag to true
  if (e.target === handlerOut) {
    isHandlerDragging = true;
  }
});

document.addEventListener('mousemove', function(e) {
  // Don't do anything if dragging flag is false
  if (!isHandlerDragging) {
    return false;
  }

  // Get offset
  var containerOffsetLeft = boxA.offsetLeft;

  // Get x-coordinate of pointer relative to container
  var pointerRelativeXpos = e.clientX - containerOffsetLeft;
  
  // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
  var boxAminWidth = 60;

  // Resize box A
  // * 8px is the left/right spacing between .handler and its inner pseudo-element
  // * Set flex-grow to 0 to prevent it from growing
  boxA.style.width = (Math.max(boxAminWidth, pointerRelativeXpos - 8)) + 'px';
  boxA.style.flexGrow = 0;
});

document.addEventListener('mouseup', function(e) {
  // Turn off dragging flag when user mouse is up
  isHandlerDragging = false;
});



document.addEventListener("keydown", function (e) {
  if (e.which === 123) {
    require('electron').remote.getCurrentWindow().toggleDevTools();
  } else if (e.which === 116) {
    location.reload();
  }

});