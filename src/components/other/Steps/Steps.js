import './steps.scss';

export default class Steps {
    constructor(steps, initialStep = 0) {
        this.$steps = steps;
        this.$buttonNext = this.$steps.querySelector('.js-steps-next');
        this.$buttonPrev = this.$steps.querySelector('.js-steps-prev');
        this.$stepsElement = this.$steps.querySelectorAll('.js-steps-el');
        this.$stepsShowButton = this.$steps.querySelectorAll('.js-steps-show');
        this.currentStepNumber = initialStep;

        this.init();
    }

    init() {
        this.$stepsElement.forEach((el, index) => {
            el.setAttribute('data-step-number', index);
            el.style.display = 'none';
        });
        this.$stepsShowButton.forEach((el) => {
            const stepNumber = el.getAttribute('data-show-step');
            el.addEventListener('click', this.showStep.bind(this, stepNumber));
        });
        this.showStep(this.currentStepNumber);
        this.$buttonPrev?.addEventListener('click', this.showPrevStep.bind(this));
        this.$buttonNext?.addEventListener('click', this.showNextStep.bind(this));
    }

    showStep(stepNumber) {
        if (this.isStepAvailable(stepNumber)) {
            const $targetStep = this.$steps.querySelector(`[data-step-number="${stepNumber}"]`);

            this.$stepsElement.forEach((el) => {
                el.classList.remove('js-active-step');
                el.style.display = 'none';
                el.style.opacity = 0;
                el.style.transform = 'translate(-30px, 0)';
            });

            this.currentStepNumber = stepNumber;
            $targetStep.style.removeProperty('display');
            let display = window.getComputedStyle($targetStep).display;
            display = 'block';
            $targetStep.style.display = display;
            $targetStep.style.opacity = 1;
            $targetStep.style.transform = 'translate(0, 0)';
            $targetStep.classList.add('js-active-step');
        }
    }

    showNextStep() {
        console.log(888, this.$buttonNext);
        if (this.isStepAvailable(this.currentStepNumber + 1)) {
            this.showStep(this.currentStepNumber + 1);
        }
    }

    showPrevStep() {
        if (this.isStepAvailable(this.currentStepNumber - 1)) {
            this.showStep(this.currentStepNumber - 1);
        }
    }

    isStepAvailable(stepNumber) {
        return !!this.$steps.querySelector(`[data-step-number="${stepNumber}"]`);
    }
}
