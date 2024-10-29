import './dropdowns.scss';
import Dropdown from "../../components-lib/dropdowns/dropdowns1";


(function () {
	const dropdowns1 = document.querySelectorAll('.js-dropdown1');
	let dropdowns1Collection = {}

	dropdowns1.forEach(($dropdown) => {
		const dropdownName = $dropdown.getAttribute('data-name');

		dropdowns1Collection[dropdownName] = new Dropdown($dropdown)
	})
})();
