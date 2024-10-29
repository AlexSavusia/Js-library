import './forms.scss';
import Form from '../../components-in-dev/form1/Form';

(function () {
	const forms = document.querySelectorAll('.js-form');
	let formsCollection = {};

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

	function changeInput(formName) {
		formsCollection[formName].isFormErrorVisible && formsCollection[formName].hideFormError();
	}

	function submitForm() {
		if (formsCollection.registration.formElements['Password'].currentValue === formsCollection.registration.formElements['PasswordRep'].currentValue) {
			this.$form.submit();
		} else {
			this.showFormError('Пароли не совпадают');
		}
	}
})();
