import { dropdownDown, dropdownToggle, dropdownUp } from '../../../utils/utils';
import './cell.scss';

export default class Cell {
	constructor(cell) {
		this.$cell = cell;
		this.$errorMessage = this.$cell.querySelector('.js-error-message');
		this.isVisible = !this.$cell.classList.contains('js-cell-hidden');
		this.isRequired = this.isVisible ? this.$cell.getAttribute('data-required') !== 'false' : false;
	}

	errorStatus(errorMessage) {
		this.$cell.classList.add('js-cell-error');
		if (errorMessage) {
			this.$errorMessage.innerHTML = errorMessage;
		}

		dropdownDown(this.$errorMessage);
	}

	removeErrorStatus() {
		this.$cell.classList.remove('js-cell-error');
		dropdownUp(this.$errorMessage);
	}

	disabledStatus() {
		this.$cell.classList.add('js-cell-disabled');
	}

	removeDisabledStatus() {
		this.$cell.classList.remove('js-cell-disabled');
	}

	showCell(animation = true) {
		this.isRequired = this.$cell.getAttribute('data-required') !== 'false';
		this.isVisible = true;
		animation ? dropdownDown(this.$cell) : this.$cell.classList.remove('js-cell-hidden');
	}

	hideCell(animation = true) {
		this.isRequired = false;
		this.isVisible = false;
		animation ? dropdownUp(this.$cell) : this.$cell.classList.add('js-cell-hidden');
	}

	toggleVisibility(animation = true) {
		this.isVisible = !this.isVisible;
		animation ? dropdownToggle(this.$cell) : this.$cell.classList.toggle('js-cell-hidden');
		if (!this.isVisible) {
			this.isRequired = false;
		} else {
			this.isRequired = this.$cell.getAttribute('data-required') !== 'false';
		}
	}
}
