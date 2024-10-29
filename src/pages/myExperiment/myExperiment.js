import './myExperiment.scss';
import Form from '../../components-in-dev/form1/Form';
import Api from '../../requests/Api';

(function () {
	const forms = document.querySelectorAll('.js-form');
	const $testButton = document.querySelector('.js-form-ex');
	let formsCollection = {};

	const $Request = new Api();

	forms.forEach(($form) => {
		const formName = $form.getAttribute('data-name');
		const elementsList = $form.querySelectorAll('.js-cell');
		const $Form = new Form($form, submitForm);


		elementsList.forEach(($el) => {
			// const elName = $el.getAttribute('data-name');
			// const elClassName = $el.getAttribute('data-class');
			$Form.addFormElement($el, {
				onChange: changeInput.bind(this, formName),
			});
		});

		formsCollection[formName] = $Form;
	});

	// const exampleFormElements = formsCollection.Example.formElements;

	$testButton.addEventListener('click', onTestFunc);

	function onTestFunc() {
		// formsCollection.Example.showFormError('Ошибка');
		formsCollection.Example.formElements.Address.clearValue();
	}

	function changeInput(formName) {
		formsCollection[formName].isFormErrorVisible && formsCollection[formName].hideFormError();
	}

	function submitForm() {
		const formData = new FormData(this.$form);
		$Request.sendTest(formData).then((res) => {
			console.log(res);
		});
	}
})();
