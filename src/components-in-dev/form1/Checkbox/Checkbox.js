import './сheckbox.scss';
import Cell from '../Cell';

export default class Checkbox extends Cell {
	constructor($cell, options) {
		super($cell);
		this.$input = this.$cell.querySelector('.js-cell-input');

		//Общие для всех элементов форм переменные
		this.startValue = this.$input.checked;
		this.currentValue = this.startValue;
		this.onChange = options?.onChange;

		this.init();
	}

	init() {
		this.$input.addEventListener('change', this.changesInput.bind(this));
	}

	changesInput() {
		this.removeErrorStatus();
		this.currentValue = this.$input.checked;
		this.onChange ? this.onChange() : null;
	}

	//Общие для всех элементов форм методы
	addElementValue(value) {
		this.$input.checked = value;
		this.currentValue = this.$input.checked;
	}

	clearValue() {
		this.$input.checked = false;
		this.currentValue = this.$input.checked;
	}

	clearOnStartValue() {
		this.$input.checked = this.startValue;
		this.currentValue = this.$input.checked;
	}

	isInputChanged() {
		return !(this.startValue === this.$input.checked);
	}

	isInputError(showError = false) {
		const isError = this.isRequired ? !this.$input.checked : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
