import './form.scss';
// import CellDatepicker from '../CellDatepicker/CellDatepicker';
import CellInputMask from '../CellInputMask/CellInputMask';
import ParamRadioButton from '../ParamRadioButton';
import CellSelect from '../CellSelect/CellSelect';
import ParamCheckbox from '../ParamCheckbox';
import CellFias from '../CellFias/CellFias';
import CellDataPicker from '../CellDatepicker/CellDatepicker';
import CellTextarea from '../CellTextarea';
import RadioButton from '../RadioButton';
// import MultiDate from '../MultiDate';
import CellInput from '../CellInput';
import { dropdownDown, dropdownUp } from '../../../utils/utils';
import Checkbox from '../Checkbox';
import Loader from '../Loader';

export default class Form {
    constructor(form, submitForm) {
        this.$form = form;
        this.$formButton = this.$form.querySelector('.js-form-button');
        this.$formError = this.$form.querySelector('.js-form-error');
        this.isFormErrorVisible = false;
        this.formElements = {};
        this.formAction = submitForm;

        this.init();
    }

    init() {
        this.$form.addEventListener('submit', this.onSubmitForm.bind(this));
    }

    onSubmitForm(e) {
        e.preventDefault();

        //Если ошибок нет, вызываем функцию отправки формы
        if (!this.checkForm(true)) {
            this.formAction ? this.formAction() : null;
        }
    }

    checkForm(showError = false) {
        let errorForm = false;
        Object.values(this.formElements).forEach(($Element) => {
            if ($Element.isInputError(showError)) {
                errorForm = true;
            }
        });

        return errorForm;
    }

    blockingFormButton() {
        this.$formButton.classList.add('disabled');
    }

    unblockingFormButton() {
        this.$formButton.classList.remove('disabled');
    }

    showFormError(message) {
        this.isFormErrorVisible = true;
        message && (this.$formError.textContent = message);
        dropdownDown(this.$formError);
    }

    hideFormError() {
        this.isFormErrorVisible = false;
        dropdownUp(this.$formError);
    }

    getFormData() {
        let formData = new FormData();

        Object.keys(this.formElements).forEach((key) => {
            // const elClassName = this.formElements[key].$cell.getAttribute('data-class');

            if (typeof this.formElements[key].currentValue === 'object') {
                this.formElements[key].currentValue.forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, this.formElements[key].currentValue);
            }
        });

        return formData;
    }

    addFormElement($el, options) {
        const elName = $el.getAttribute('data-name');
        const elClassName = $el.getAttribute('data-class');

        switch (elClassName) {
            case 'CellInput':
                this.formElements[elName] = new CellInput($el, options);
                break;
            case 'CellInputMask':
                this.formElements[elName] = new CellInputMask($el, options);
                break;
            // case 'CellDatepicker':
            //     this.formElements[elName] = new CellDatepicker($el, options);
            //     break;
            case 'CellSelect':
                this.formElements[elName] = new CellSelect($el, options);
                break;
            case 'CellFias':
                this.formElements[elName] = new CellFias($el, options);
                break;
            case 'CellDatepicker':
                this.formElements[elName] = new CellDataPicker($el, options);
                break;
            case 'CellTextarea':
                this.formElements[elName] = new CellTextarea($el, options);
                break;
            case 'Checkbox':
                this.formElements[elName] = new Checkbox($el, options);
                break;
            case 'RadioButton':
                this.formElements[elName] = new RadioButton($el, options);
                break;
            case 'ParamCheckbox':
                this.formElements[elName] = new ParamCheckbox($el, options);
                break;
            case 'ParamRadioButton':
                this.formElements[elName] = new ParamRadioButton($el, options);
                break;
            // case 'MultiDate':
            //     this.formElements[elName] = new MultiDate($el, options);
            //     break;
            case 'Loader':
                this.formElements[elName] = new Loader($el, options);
                break;
            default:
                console.error('Unknown class');
                break;
        }
    }
}
