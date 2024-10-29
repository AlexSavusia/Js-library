import { isEmailError, isPasswordError, isTextError } from '../../../utils/validation';
import Cell from '../Cell';
import './cellInput.scss';

export default class CellInput extends Cell {
    constructor($cell, options) {
        super($cell);
        this.$input = this.$cell.querySelector('.js-cell-input');
        this.inputType = this.$input.getAttribute('data-input-type');

        //Общие для всех элементов форм переменные
        this.startValue = this.$input.value;
        this.currentValue = this.$input.value;
        this.onChange = options?.onChange;

        this.init();
    }

    init() {
        this.$input.addEventListener('input', this.changesInput.bind(this));
        this.$input.addEventListener('focus', this.focusInput.bind(this));
        this.$input.addEventListener('blur', this.blurInput.bind(this));
        this.$input.addEventListener('input', () => this.isInputError(true));
    }

    changesInput() {
        this.removeErrorStatus();
        this.currentValue = this.$input.value;
        this.onChange ? this.onChange() : null;
    }

    focusInput() {
        this.$cell.classList.add('js-focus');
    }

    blurInput() {
        this.$cell.classList.remove('js-focus');
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
        const getStatus = () => {
            switch (this.inputType) {
                case 'email':
                    return isEmailError(this.$input, this.$errorMessage);
                case 'password':
                    return isPasswordError(this.$input);
                default:
                    return isTextError(this.$input);
            }
        };
        const isError = this.isRequired ? getStatus() : this.isRequired;

        if (showError && isError && this.isRequired) {
            this.errorStatus();
        }

        return isError;
    }
}
