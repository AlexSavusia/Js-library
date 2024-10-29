import './radioButton.scss';
import Cell from '../Cell';

export default class RadioButton extends Cell {
	constructor($cell, options) {
		super($cell);
		this.$radioButton = this.$cell.querySelector('.js-radiobutton');
		this.$inputs = this.$radioButton.querySelectorAll('.js-radiobutton-input');
		this.$checkedInput;

		//Общие для всех элементов форм переменные
		this.currentValue = '';
		this.startValue = '';
		this.onChange = options?.onChange;
		this.init();
	}

	init() {
		this.$inputs.forEach((input) => {
			input.addEventListener('change', this.changeStatus.bind(this));
			this.getCheckedInput();
		});
		this.startValue = this.currentValue;
	}

	changeStatus() {
		this.removeErrorStatus();
		this.getCheckedInput();
		this.onChange ? this.onChange() : null;
	}

	getCheckedInput() {
		this.$inputs.forEach((input) => {
			input.checked && (this.$checkedInput = input);
		});
		this.currentValue = this.$checkedInput && this.$checkedInput.value;
	}

	//Общие для всех элементов форм методы
	addElementValue(value) {
		this.$inputs.forEach((input) => {
			if (input.value === String(value)) {
				this.currentValue = input.value;
				input.checked = true;
			}
		});
	}

	clearValue() {
		this.$inputs.forEach((input) => {
			input.checked = false;
			this.currentValue = '';
		});
	}

	clearOnStartValue() {
		if (this.startValue) {
			this.$inputs.forEach((input) => {
				if (input.value === this.startValue) {
					this.currentValue = input.value;
					input.checked = true;
				}
			});
		} else {
			this.clearValue();
		}
	}

	isInputChanged() {
		return !(this.startValue === this.currentValue);
	}

	isInputError(showError = false) {
		const isError = this.isRequired ? !this.$checkedInput : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
