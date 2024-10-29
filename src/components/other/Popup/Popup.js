import { blockBody, unBlockBody } from '../../../utils/utils';
import './popup.scss';

export default class Popup {
    constructor(popup) {
        this.$popup = popup;
        this.$popupClose = this.$popup.querySelector('.js-popup-close');
        // this.$popupContent = this.$popup.querySelectorAll('.js-popup-content');
        this.init();
    }

    init() {
        this.$popupClose.addEventListener('click', this.closePopup.bind(this));
        this.$popup.addEventListener('mousedown', this.closingByDarkArea.bind(this));
        document.addEventListener('keydown', this.closingByEsc.bind(this));
    }

    showPopup() {
        blockBody();
        this.$popup.classList.add('is-active');
    }

    closePopup() {
        unBlockBody();
        this.$popup.classList.remove('is-active');
    }

    closingByDarkArea(e) {
        !e.target.closest('.js-popup-content') ? this.closePopup() : null;
    }

    closingByEsc(e) {
        e.keyCode === 27 ? this.closePopup() : null;
    }
}
