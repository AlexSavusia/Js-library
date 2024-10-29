import Inputmask from 'inputmask';
import CellInput from '../CellInput/CellInput';

export default class CellInputMask extends CellInput {
	constructor($cell, options) {
		super($cell, options);
		this.mask;
		this.maskActionType();
	}

	maskActionType() {
		switch (this.inputType) {
			case 'phone':
				this.mask = new Inputmask('+7 (999) 999-99-99', { showMaskOnHover: false }).mask(this.$input);
				break;
			case 'code':
				this.mask = new Inputmask('999 999', { showMaskOnHover: false }).mask(this.$input);
				break;
			case 'passport':
				this.mask = new Inputmask('9999 999999', { showMaskOnHover: false }).mask(this.$input);
				break;
			case 'percent':
				this.mask = new Inputmask('9{1,3}', { showMaskOnHover: false }).mask(this.$input);
				break;
			case 'snils':
				this.mask = new Inputmask('999-999-999 99', { showMaskOnHover: false }).mask(this.$input);
				break;
			case 'divivsion-code':
				this.mask = new Inputmask('999-999', { showMaskOnHover: false }).mask(this.$input);
				break;
			//Серия паспорта
			case 'four-numbers':
				this.mask = new Inputmask('9', { showMaskOnHover: false, repeat: 4 }).mask(this.$input);
				break;
			//Номер паспорта
			case 'six-numbers':
				this.mask = new Inputmask('9', { showMaskOnHover: false, repeat: 6 }).mask(this.$input);
				break;
			//БИК
			case 'nine-numbers':
				this.mask = new Inputmask('9', { showMaskOnHover: false, repeat: 9 }).mask(this.$input);
				break;
			//ИНН
			case 'ten-numbers':
				this.mask = new Inputmask('9', { showMaskOnHover: false, repeat: 10 }).mask(this.$input);
				break;
			//Счет и корсчет
			case 'twenty-numbers':
				this.mask = new Inputmask('9', { showMaskOnHover: false, repeat: 20 }).mask(this.$input);
				break;
			case 'sum': {
				const options = {
					showMaskOnHover: false,
					groupSeparator: ' ',
					rightAlign: false,
					digits: 2,
					suffix: ' ₽',
				};

				this.mask = new Inputmask('currency', options).mask(this.$input);
				break;
			}
			// case 'sumPay':
			//     this.mask = new Inputmask('9{1,20}[.9{1,2}]', { showMaskOnHover: false, greedy: false }).mask(this.$input);
			//     break;

			default:
				console.error('Не нашел тип маски в data-input-type');
		}
	}

	isInputChanged() {
		return !(this.startValue === this.mask.unmaskedvalue());
	}

	//Общие для всех элементов форм методы
	isInputError(showError = false) {
		const isError = this.isRequired ? !this.mask.isComplete() : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
