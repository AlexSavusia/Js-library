import './DropDownBlockFunc.scss';

const DropDownBlockFunc = () => {
	const $dropdownsList = document.querySelectorAll('.dropdown-block');

	$dropdownsList.forEach((list) => {
		const $dropdownBox = list.querySelectorAll('.dropdown-block__box');

		$dropdownBox.forEach((box) => {
			box.addEventListener('click', changeVisibility);
		});
	});

	function changeVisibility() {
		const $dropdownItem = this.parentElement;
		const $dropdownAnswer = $dropdownItem.querySelector(
			'.dropdown-block__answer'
		);

		this.classList.toggle('dropdown-block__box--active');
		$dropdownAnswer.classList.toggle('dropdown-block__answer--active');
	}
};

export default DropDownBlockFunc;
