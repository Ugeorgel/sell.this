import 'bootstrap';
import './index.html';
import './index.css';
import './css/firstScreen.css';
import './css/secondScreen.css';
import './css/thirdScreen.css';
import './css/fourthScreen.css';
import './css/fivesScreen.css';
import './css/footer.css';
import './css/menu.css';

import initThirdScreenInteractivity from './js/thirdScreen';
import initFourthScreenInteractivity from './js/fourthScreen';
import initFivesScreenInteractivity from './js/fivesScreen';
import initMenuInteractivity from './js/menu.js';

function initScreensInteractivity() {
    initThirdScreenInteractivity()
    initFourthScreenInteractivity()
    initFivesScreenInteractivity()
    // initMenuInteractivity()
}

window.onload = function() {
    initScreensInteractivity()
}

window.onresize = function() {
    initScreensInteractivity()
}