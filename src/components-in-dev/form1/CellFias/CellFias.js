import Api from '../../../requests/Api';
import { dropdownDown, dropdownUp } from '../../../utils/utils';
import CellSelect from '../CellSelect';
import './cellFias.scss';

export default class CellFias extends CellSelect {
	constructor($cell, options) {
		super($cell, options);
		this.$Request = new Api();
		this.startClientText = this.$input.value;
		this.choosenAddress;
		this.choosenNumber;
		this.fiasLevel = options?.hasStartValue ? 8 : ''; // Значение должно быть не меньше 8, что означает адрес указан вплоть до здания
		this.isChoosenItem = !!options?.hasStartValue; // Флаг для проверки выбрано значение из выпадающего списка, а не напечатанного
	}

	init() {
		this.$input.addEventListener('input', this.changesInput.bind(this));
		this.$cellSelectBody.addEventListener('click', this.choosingValue.bind(this));
		this.startValue && this.addElementValue(this.startValue);
	}

	changesInput() {
		this.removeErrorStatus();
		this.isChoosenItem = false;
		if (this.$input.value) {
			const data = {
				query: this.$input.value,
				count: 5,
			};
			this.$Request.getFiasAddress(data).then((res) => {
				this.choosenAddress = res;
				this.renderItem(res.suggestions);
			});

			this.$cellSelect.classList.add('is-active');
			dropdownDown(this.$cellSelectBody);
		} else {
			dropdownUp(this.$cellSelectBody);
		}
	}

	choosingValue(evt) {
		const targetItem = evt.target.classList.contains('js-cell-select-item') ? evt.target : evt.target.closest('.js-cell-select-item');
		const backendValue = targetItem.getAttribute('data-item-value');
		this.fiasLevel = targetItem.getAttribute('data-fias-level');
		this.addElementValue(backendValue);
		this.removeErrorStatus();
		this.toggleBody();
		this.isChoosenItem = true;
		this.selectionAction ? this.selectionAction() : null;
	}

	renderItem(data) {
		this.$cellSelectBody.innerHTML = '';
		data.forEach((address, index) => {
			this.$cellSelectBody.insertAdjacentHTML(
				'beforeend',
				`
					<div class="cell-fias__item js-cell-select-item" data-fias-level="${address.data.fias_level ?? ''}" data-item-value="${address['unrestricted_value']}" data-index="${index}">
						<span class="cell-fias__item-info js-cell-select-item-info">${address['unrestricted_value']}</span>
						<svg class="cell-fias__body-icon" width="11px" height="8px">
							<use xlink:href="#icon-cell-select-body"></use>
						</svg>
					</div>
					`
			);
		});
		this.$cellSelectItems = this.$cellSelect.querySelectorAll('.js-cell-select-item');
	}

	//Общие для всех элементов форм методы
	clearValue() {
		if (!this.startValue) {
			this.$input.value = '';
			this.currentValue = this.$input.value;
			this.$cellSelectItems.forEach((item) => item.classList.remove('is-chosen'));
		} else {
			this.addElementValue(this.startValue);
		}
	}
	isInputError(showError = false) {
		const isError = this.isRequired ? this.$input.value.length === 0 || this.fiasLevel < 8 || !this.isChoosenItem : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
