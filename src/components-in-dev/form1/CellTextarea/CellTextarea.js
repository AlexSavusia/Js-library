import { isTextError } from '../../../utils/validation';
import Cell from '../Cell';
import './cellTextarea.scss';

export default class CellTextarea extends Cell {
	constructor($cell, options) {
		super($cell);
		this.$input = this.$cell.querySelector('.js-cell-input');

		//Общие для всех элементов форм переменные
		this.startValue = this.$input.value;
		this.currentValue = this.$input.value;
		this.onChange = options?.onChange;

		this.init();
	}

	init() {
		this.$input.addEventListener('input', this.changesInput.bind(this));
	}

	changesInput() {
		this.removeErrorStatus();
		this.currentValue = this.$input.value;
		this.onChange ? this.onChange() : null;
	}

	//Общие для всех элементов форм методы
	addElementValue(value) {
		this.$input.value = value;
		this.currentValue = this.$input.value;
	}

	clearValue() {
		this.$input.value = '';
		this.currentValue = this.$input.value;
	}

	clearOnStartValue() {
		this.$input.value = this.startValue;
		this.currentValue = this.$input.value;
	}

	isInputChanged() {
		return !(this.startValue === this.$input.value);
	}

	isInputError(showError = false) {
		const isError = this.isRequired ? isTextError(this.$input) : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
