import { dropdownToggle } from '../../../utils/utils';
import Cell from '../Cell';
import './cellSelect.scss';

export default class CellSelect extends Cell {
	constructor($cell, options) {
		super($cell);
		this.$cellSelect = $cell.querySelector('.js-cell-select');
		this.$cellSelectHeader = this.$cellSelect.querySelector('.js-cell-select-header');
		this.$backendInput = this.$cellSelect.querySelector('.js-cell-select-backend');
		this.$cellSelectItems = this.$cellSelect.querySelectorAll('.js-cell-select-item');
		this.$cellSelectBody = this.$cellSelect.querySelector('.js-cell-select-body');
		this.$input = this.$cellSelect.querySelector('.js-cell-input');
		this.startClientText = this.$input.value;
		this.selectData = options?.selectData || [];
		this.selectedItemIndex;

		//Общие для всех элементов форм переменные
		this.startValue = this.$backendInput.value;
		this.currentValue = this.$backendInput.value;
		this.selectionAction = options?.onChange;

		this.init();
	}

	init() {
		this.$input.addEventListener('input', this.changesInput.bind(this));
		this.$cellSelectBody.addEventListener('click', this.choosingValue.bind(this));
		this.$cellSelectHeader.addEventListener('click', this.toggleBody.bind(this));
		this.startValue && this.addElementValue(this.startValue);

		//Проверяем есть ли переданные значения или берем selectData из html
		if (this.selectData.length > 0) {
			this.renderItem(this.selectData);
		} else {
			this.$cellSelectItems.forEach(($item) => {
				const clientValue = $item.querySelector('.js-cell-select-item-info').textContent.trim();
				const backendValue = $item.getAttribute('data-item-value');

				this.selectData.push({
					clientValue,
					backendValue,
				});
			});
		}
	}

	toggleBody() {
		this.$cellSelect.classList.toggle('is-active');
		dropdownToggle(this.$cellSelectBody);
	}

	changesInput() {
		this.filteringValues(this.$input.value);
	}

	choosingValue(evt) {
		const targetItem = evt.target.classList.contains('js-cell-select-item') ? evt.target : evt.target.closest('.js-cell-select-item');
		const backendValue = targetItem.getAttribute('data-item-value');

		this.addElementValue(backendValue);
		this.removeErrorStatus();
		this.toggleBody();
		this.selectionAction ? this.selectionAction() : null;
	}

	filteringValues(str) {
		const filteredValue = this.selectData.filter((el) => {
			return el.clientValue.includes(str);
		});
		this.renderItem(filteredValue);
	}

	renderItem(data) {
		this.$cellSelectBody.innerHTML = '';
		data.forEach((item, index) => {
			this.$cellSelectBody.insertAdjacentHTML(
				'beforeend',
				`
					<div class="cell-select__item js-cell-select-item" data-item-value="${item.backendValue}" data-index="${index}">
						<span class="cell-select__item-info js-cell-select-item-info">${item.clientValue}</span>
						<svg class="cell-select__body-icon" width="11px" height="8px">
							<use xlink:href="#icon-cell-select-body"></use>
						</svg>
					</div>
					`
			);
		});
		this.$cellSelectItems = this.$cellSelect.querySelectorAll('.js-cell-select-item');
	}

	//Общие для всех элементов форм методы
	addElementValue(backendValue) {
		this.$backendInput.value = backendValue;
		this.currentValue = this.$backendInput.value;

		this.$cellSelectItems.forEach((item) => {
			const clientValue = item.querySelector('.js-cell-select-item-info').textContent.trim();
			const dataValue = item.getAttribute('data-item-value');
			const dataIndex = item.getAttribute('data-index');

			item.classList.remove('is-chosen');

			if (backendValue === dataValue) {
				this.$input.value = clientValue;
				this.selectedItemIndex = dataIndex;
				item.classList.add('is-chosen');
			}
		});
	}

	clearValue() {
		if (!this.startValue) {
			this.$backendInput.value = '';
			this.currentValue = this.$backendInput.value;
			this.$input.value = this.startClientText;
			this.$cellSelectItems.forEach((item) => item.classList.remove('is-chosen'));
		} else {
			this.addElementValue(this.startValue);
		}
		this.renderItem(this.selectData);
	}

	clearOnStartValue() {
		this.addElementValue(this.startValue);
	}

	isInputChanged() {
		return !(this.startValue === this.currentValue);
	}

	isInputError(showError = false) {
		const isError = this.isRequired ? this.$backendInput.value.length === 0 : this.isRequired;

		if (showError && isError && this.isRequired) {
			this.errorStatus();
		}

		return isError;
	}
}
