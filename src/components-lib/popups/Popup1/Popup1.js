import { blockBody, unBlockBody } from '../../../utils/utils';
import './popup1.scss';

export default class Popup1 {
    constructor(popup) {
        this.$popup = popup;
        this.$popupClose = this.$popup.querySelector('.js-popup1-close');
        this.$showPopupButtons = document.querySelectorAll('.js-show-popup1');
        this.popupName = this.$popup.getAttribute('id');
        this.init();
    }

    init() {
        this.$popupClose.addEventListener('click', this.closePopup.bind(this));
        this.$popup.addEventListener('mousedown', this.closingByDarkArea.bind(this));
        document.addEventListener('keydown', this.closingByEsc.bind(this));

        if (this.$showPopupButtons) {
            this.$showPopupButtons.forEach((button) => {
                const buttonName = button.getAttribute('data-show-popup');

                if (buttonName === this.popupName) {
                    button.addEventListener('click', this.showPopup.bind(this));
                }
            });
        }
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
        !e.target.closest('.js-popup1-content') ? this.closePopup() : null;
    }

    closingByEsc(e) {
        e.keyCode === 27 ? this.closePopup() : null;
    }
}
