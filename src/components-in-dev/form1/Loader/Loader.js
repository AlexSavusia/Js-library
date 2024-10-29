import './loader.scss';
import Cell from '../Cell';

export default class Loader extends Cell {
	constructor($cell, options) {
		super($cell);
		this.$loader = this.$cell.querySelector('.js-loader');
		this.$input = this.$loader.querySelector('.js-loader-input');
		this.$filesList = this.$loader.querySelector('.js-loader-files-list');
		this.$addFilesButton = this.$loader.querySelector('.js-loader-add-file');
		this.clickInput = this.clickInput.bind(this);
		this.rightExtensions = options?.rightExtensions ? options.rightExtensions : ['pdf', 'jpeg', 'jpg', 'png'];
		this.maxNumber = options?.maxNumber ? options.maxNumber : 5;
		this.maxSize = options?.maxSize ? options.maxSize : 5;

		//Общие для всех элементов форм переменные
		this.startValue = [];
		this.currentValue = [];
		this.addsFilesAction = options?.onChange;
		this.init();
	}

	init() {
		this.$addFilesButton.addEventListener('click', this.clickInput);
		this.$input.addEventListener('change', this.changeFiles.bind(this));
	}

	clickInput() {
		this.$input.click();
	}

	//При выборе файлов, добавит их в массив файлов
	changeFiles(e) {
		const status = this.checkFiles(Array.from(e.target.files));

		if (status.error) {
			this.errorStatus(status.errorMessage);
		} else {
			this.currentValue = this.currentValue.length > 0 ? this.currentValue.concat(Array.from(e.target.files)) : Array.from(e.target.files);
			this.addsFilesToList();
			this.removeErrorStatus();
			this.addsFilesAction ? this.addsFilesAction() : null;
		}
	}

	//Удаление отображения файлов из dom
	removeFile(currentFileName) {
		this.currentValue = this.currentValue.filter((file) => file.name !== currentFileName);
		this.addsFilesToList();
	}

	//Добавление отображения файлов в dom
	addsFilesToList() {
		this.$filesList.innerHTML = '';

		this.currentValue.forEach((file) => {
			this.$filesList.insertAdjacentHTML(
				'beforeend',
				`
						<button class="loader__button loader__button--file js-loader-remove-file" type="button">
							<div class="loader__button-flex">
								<div class="loader__button-el js-loader-button-text">${file.name}</div>
								<svg class="loader__button-el loader__button-el--close-icon" width="20" height="20">
									<use href="/assets/sprite.svg#loader-close"></use>
								</svg>
							</div>
						</button>
					`
			);
		});

		const $filesButton = this.$loader.querySelectorAll('.js-loader-remove-file');

		$filesButton.forEach((fileButton) => {
			fileButton.addEventListener('click', (evt) => {
				evt.stopPropagation();
				const targetName = fileButton.querySelector('.js-loader-button-text').textContent;
				this.removeFile(targetName);
			});
		});
	}

	//Проверка файлов на заданные параметры
	checkFiles(files) {
		let error;
		let errorMessage = '';
		let currentFilesName = [];

		//Формируем массив имен файлов для проверки одинаковых названий
		if (this.currentValue.length > 0) {
			this.currentValue.forEach((currentFile) => {
				currentFilesName.push(currentFile.name);
			});
		}

		files.forEach((file) => {
			const fileSize = file.size;
			const fileExtension = file.name.split('.').pop();

			if (fileSize > this.maxSize * 1000000) {
				error = true;
				errorMessage = `Размер файлов должен быть не больше ${this.maxSize} Мб`;

				return;
			}

			if (!this.rightExtensions.includes(fileExtension)) {
				error = true;
				errorMessage = `Файл должен быть формата ${this.rightExtensions.join(', ')}`;

				return;
			}

			if (currentFilesName.includes(file.name)) {
				error = true;
				errorMessage = `Файл уже был добавлен`;

				return;
			}
		});

		if (this.currentValue.length >= this.maxNumber) {
			error = true;
			errorMessage = `Кол-во файлов не может быть больше ${this.maxNumber}`;
		}

		return {
			error: error,
			errorMessage: errorMessage,
		};
	}

	addElementValue(files) {
		this.currentValue = files;
	}

	clearValue() {
		this.currentValue = [];
	}

	clearOnStartValue() {
		this.currentValue = this.startValue;
	}

	isInputChanged() {
		return this.currentValue.length > 0;
	}

	isInputError(showError = false) {
		const isError = this.isRequired ? this.currentValue.length === 0 : this.isRequired;

		if (showError && isError) {
			this.errorStatus('Добавьте файл');
		}

		return isError;
	}
}
