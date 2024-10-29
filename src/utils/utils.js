//Плавно скрывает элемент
export const dropdownUp = (el, duration = 300) => {
	//Определяем свойства для анимации, задаем длительность, вычисляем высоту блока
	el.style.transitionProperty = 'height, margin, padding';
	el.style.transitionDuration = duration + 'ms';
	el.style.height = el.offsetHeight + 'px';
	el.offsetHeight;

	//Сбрасываем все значения на 0 и скрываем блок
	el.style.overflow = 'hidden';
	el.style.height = 0;
	el.style.paddingTop = 0;
	el.style.paddingBottom = 0;
	el.style.marginTop = 0;
	el.style.marginBottom = 0;

	//По окончанию анимации удаляем блок и удаляем все добавленные инлайн свойства и класс о процессе анимации
	window.setTimeout(() => {
		el.style.display = 'none';
		el.style.removeProperty('height');
		el.style.removeProperty('padding-top');
		el.style.removeProperty('padding-bottom');
		el.style.removeProperty('margin-top');
		el.style.removeProperty('margin-bottom');
		el.style.removeProperty('overflow');
		el.style.removeProperty('transition-duration');
		el.style.removeProperty('transition-property');
	}, duration);
};

//Плавно показывает элемент
export const dropdownDown = (el, duration = 300) => {
	//Проверяем скрыт блок или нет и показываем его
	const isVisibleBefore = window.getComputedStyle(el).display;
	el.style.removeProperty('display');
	let display = window.getComputedStyle(el).display;

	if (display === 'none') {
		display = 'block';
	}
	el.style.display = display;

	if (isVisibleBefore === 'none') {
		//Определяем высоту на которую будет анимироваться блок
		let height = el.offsetHeight;

		//Делаем блок скрытым и задаем начальные свойства
		el.style.height = 0;
		el.style.paddingTop = 0;
		el.style.paddingBottom = 0;
		el.style.marginTop = 0;
		el.style.marginBottom = 0;
		el.style.overflow = 'hidden';
		el.offsetHeight;

		//Определяем, что анимируем и на какую высоту
		el.style.transitionProperty = 'height, margin, padding';
		el.style.transitionDuration = duration + 'ms';
		el.style.height = height + 'px';

		//Возвращаем заданные значения в css для отступов
		el.style.removeProperty('padding-top');
		el.style.removeProperty('padding-bottom');
		el.style.removeProperty('margin-top');
		el.style.removeProperty('margin-bottom');

		//Удаляем оставшиеся свойства после анимации
		window.setTimeout(() => {
			el.style.removeProperty('height');
			el.style.removeProperty('overflow');
			el.style.removeProperty('transition-duration');
			el.style.removeProperty('transition-property');
		}, duration);
	}
};

//Плавно переключает видимость элемента
export const dropdownToggle = (el, duration = 300) => {
	if (window.getComputedStyle(el).display === 'none') {
		return dropdownDown(el, duration);
	} else {
		return dropdownUp(el, duration);
	}
};

//Блокируем body с удалением скролла
export const blockBody = () => {
	const body = document.body;
	const blockPaddingValue = window.innerWidth - body.clientWidth + 'px';

	body.style.overflow = 'hidden';
	body.style.paddingRight = blockPaddingValue;
};

//Разблокирует body
export const unBlockBody = () => {
	const body = document.body;

	//Разблокируем боди после окончания анимации
	setTimeout(function () {
		body.style.overflow = 'visible';
		body.style.paddingRight = '0';
	}, 500);
};

//Преобразует дату из маски формата dd.mm.yyyy в формат ISO yyyy-mm-dd или yyyy/mm/dd
export const convertsDateToIsoFormat = (date, separator = '-') => {
	let newDate;
	newDate = date.split('.').reverse().join(separator);

	return newDate;
};

export const fadeIn = (el, timeout, display) => {
	el.style.opacity = 0;
	el.style.display = display || 'block';
	el.style.transition = `opacity ${timeout}ms`;
	setTimeout(() => {
		el.style.opacity = 1;
	}, 10);
};

export const fadeOut = (el, timeout) => {
	el.style.opacity = 1;
	el.style.transition = `opacity ${timeout}ms`;
	el.style.opacity = 0;

	setTimeout(() => {
		el.style.display = 'none';
	}, timeout);
};
