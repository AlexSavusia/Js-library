import './DropdownBlockClass.scss';

export default class DropdownBlockClass {
	constructor(dropdownList) {
		this.$dropdownList = document.querySelector(dropdownList);
		this.$dropdownBox = this.$dropdownList.querySelectorAll(
			'.dropdown-block__box'
		);

		this.init();
	}

	init() {
		this.$dropdownBox.forEach((box) => {
			box.addEventListener('click', this.changeVisibility);
		});
	}

	changeVisibility() {
		const $dropdownItem = this.parentElement;
		const $dropdownAnswer = $dropdownItem.querySelector(
			'.dropdown-block__answer'
		);

		this.classList.toggle('dropdown-block__box--active');
		$dropdownAnswer.classList.toggle('dropdown-block__answer--active');
	}
}
