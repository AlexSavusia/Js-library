import AirDatepicker from 'air-datepicker';
import Inputmask from 'inputmask';
import 'air-datepicker/air-datepicker.css';
import CellInput from '../CellInput';
import './cellDatepicker.scss';
import { convertsDateToIsoFormat } from '../../../utils/utils';

export default class CellDatepicker extends CellInput {
    constructor($cell, options) {
        super($cell, options);
        this.datepicker = new AirDatepicker(this.$input, {
            onSelect: this.changesInput.bind(this),
            startDate: convertsDateToIsoFormat(this.$input.value),
            autoClose: true,
        });
        this.mask;
    }

    init() {
        this.mask = new Inputmask('99.99.9999', { showMaskOnHover: false }).mask(this.$input);
        // this.startCheck();
        !this.isRequired ? this.$cell.classList.add('js-no-required') : this.$cell.classList.remove('js-no-required');
        this.$input.addEventListener('input', this.changesInput.bind(this));
        this.$input.addEventListener('focus', this.focusInput.bind(this));
        this.$input.addEventListener('blur', this.blurInput.bind(this));
    }

    changesInput() {
        // !this.isInputError() ? this.successfulStatus() : this.removeSuccessfulStatus();
        // this.$input.value.length > 0 ? this.upLabel() : this.downLabel();
        this.removeErrorStatus();
        this.onChange ? this.onChange() : null;
        this.currentValue = this.$input.value;
    }

    isInputError(showError = false) {
        const isError = this.isRequired ? !this.mask.isComplete() : this.isRequired;

        if (showError && isError && this.isRequired) {
            this.errorStatus();
        }

        return isError;
    }
}
