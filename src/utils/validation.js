export const isEmailError = (el, errorBlock) => {
    const regRus = /^[а-яё.]+@[а-яё-]+\.[a-яё]{2,10}$/i;

	if (el.value === '') {
		errorBlock.innerHTML = 'Заполните поле';
		return true;
	}

	if (regRus.test(el.value)) {
		errorBlock.innerHTML = 'Email должен быть на английском';
		return true;
	}

	errorBlock.innerHTML = 'Указан неверный email';

	const reg = /^[a-z-._0-9]+@[a-z-._0-9]+\.[a-z0-9]{2,10}$/i;
	return !reg.test(el.value);
};

export const isPasswordError = (el) => {
    // console.log(555, el.value >= 3);
    return el.value <= 3;
};

export const isTextError = (el) => {
    return el.value <= 3;
};
