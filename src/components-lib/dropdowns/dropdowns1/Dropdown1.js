import './dropdown1.scss';
import { dropdownToggle } from '../../../utils/utils';

export default class Dropdown {
	constructor($dropdown) {
		this.$dropdown = $dropdown;
		this.$dropdownList = this.$dropdown.querySelector('.js-dropdown1-list');

		this.init();
	}

	init() {
		const $titles = this.$dropdownList.querySelectorAll('.js-dropdown1__title');

		$titles.forEach(($title) => {
			if ($title.parentElement.classList.contains('active')) {
				this.changeVisibility($title, false);
			}
			$title.addEventListener('click', this.changeVisibility.bind(this, $title));
		});
	}

	changeVisibility($title, changeActive = true) {
		const $dropdownItem = $title.parentElement;
		const $dropdownContent = $dropdownItem.querySelector('.js-dropdown1__content');

		changeActive && $dropdownItem.classList.toggle('active');
		dropdownToggle($dropdownContent);
	}
}
