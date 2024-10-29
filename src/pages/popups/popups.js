import './popups.scss';
import Popup1 from '../../components-lib/popups/Popup1';

(function () {
    const $popups = document.querySelectorAll('.js-popup1');

    $popups.forEach((popup) => {
        new Popup1(popup);
    });
})();
