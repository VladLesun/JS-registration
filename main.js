//! Создание кнопки
const getButton = (text, className) => {
	const button = document.createElement('button');
	button.classList.add(className);
	button.textContent = text;

	return button;
};

//! Создание input
const getInput = (className, type, name, placeholder) => {
	const input = document.createElement('input');
	input.classList.add(className);
	input.type = type;
	input.name = name;
	input.placeholder = placeholder;

	return input;
};

//! Создание label
const getLabel = (className) => {
	const label = document.createElement('label');
	label.classList.add(className);

	return label;
};

//! Создание wrapper
const getWrap = (className) => {
	const wrap = document.createElement('div');
	wrap.classList.add(className);

	return wrap;
};

//! Создание заголовка
const title = document.createElement('h1');
title.classList.add('main-title');
title.textContent = 'Регистрация';

//! Создание блока регистрации
const box = document.createElement('div');
box.classList.add('box');

//! Создание полей ввода
const surnameWrapper = getWrap('box__field-wrap'),
	surnameInput = getInput('box__input', 'text', 'surname', 'Фамилия'),
	surnameErrorLabel = getLabel('error-field');
surnameWrapper.append(surnameInput, surnameErrorLabel);

const nameWrapper = getWrap('box__field-wrap'),
	nameInput = getInput('box__input', 'text', 'name', 'Имя'),
	nameErrorLabel = getLabel('error-field');
nameWrapper.append(nameInput, nameErrorLabel);

const ageWrapper = getWrap('box__field-wrap'),
	ageInput = getInput('box__input', 'number', 'age', 'Возраст'),
	ageErrorLabel = getLabel('error-field');
ageWrapper.append(ageInput, ageErrorLabel);

const emailWrapper = getWrap('box__field-wrap'),
	emailInput = getInput('box__input', 'email', 'email', 'Почта'),
	emailErrorLabel = getLabel('error-field');
emailWrapper.append(emailInput, emailErrorLabel);

const passwordWrapper = getWrap('box__field-wrap'),
	passwordInput = getInput('box__input', 'password', 'password', 'Пароль'),
	passwordErrorLabel = getLabel('error-field');
passwordWrapper.append(passwordInput, passwordErrorLabel);

//! Создание поля соглашения с условиями
const conditionWrap = getWrap('box__field-wrap'),
	label = getLabel('box__label-check'),
	labelInput = getInput('box__label-input', 'checkbox', 'checkbox', 'checkbox'),
	labelSpan = document.createElement('span'),
	conditionErrorLabel = getLabel('error-field');

labelSpan.classList.add('box__label-span');
labelSpan.textContent = 'Соглашение с условиями';

label.append(labelInput, labelSpan);
conditionWrap.append(label, conditionErrorLabel);

//! Создание кнопки регистрации
const regBtn = getButton('Регистрация', 'box__btn');

regBtn.onclick = () => {
	const surnameValue = surnameInput.value,
		nameValue = nameInput.value,
		ageValue = Number(ageInput.value),
		emailValue = emailInput.value,
		passwordValue = passwordInput.value,
		labelValue = labelInput.checked;

	let validationResult = false;

	//! Проверка фамилии
	surnameErrorLabel.textContent = '';
	if (surnameValue.length <= 1) {
		surnameErrorLabel.textContent =
			'Фамилия не может состоять из одного символа';
		validationResult = true;
	}
	if (surnameValue === '') {
		surnameErrorLabel.textContent = 'Введите фамилию';
		validationResult = true;
	}

	//! Проверка имени
	nameErrorLabel.textContent = '';
	if (nameValue.length <= 1) {
		nameErrorLabel.textContent = 'Имя не может состоять из одного символа';
		validationResult = true;
	}
	if (nameValue === '') {
		nameErrorLabel.textContent = 'Введите имя';
		validationResult = true;
	}

	//! Проверка возраста
	ageErrorLabel.textContent = '';
	if (ageValue <= 14) {
		ageErrorLabel.textContent = `Ваш возраст ${ageValue}, вы еще слишком молоды`;
		validationResult = true;
	}
	if (ageValue === 0) {
		ageErrorLabel.textContent = 'Введите возраст';
		validationResult = true;
	}

	//! Проверка почты
	emailErrorLabel.textContent = '';
	if (
		emailValue.length <= 1 ||
		emailValue.includes('@') === false ||
		emailValue.includes('.') === false
	) {
		emailErrorLabel.textContent = 'Неверная почта';
		validationResult = true;
	}
	if (emailValue === '') {
		emailErrorLabel.textContent = 'Введите почту';
		validationResult = true;
	}

	//! Проверка пароля
	passwordErrorLabel.textContent = '';
	if (
		passwordValue.length <= 6 ||
		passwordValue.includes('-') === false ||
		passwordValue.includes('_') === false
	) {
		passwordErrorLabel.textContent = 'Небезопасный пароль';
		validationResult = true;
	}
	if (passwordValue === '') {
		passwordErrorLabel.textContent = 'Введите пароль';
		validationResult = true;
	}

	//! Проверка соглашения условия
	conditionErrorLabel.textContent = '';
	if (labelValue === false) {
		conditionErrorLabel.textContent =
			'Вам необходимо принять соглашение с условиями';
		validationResult = true;
	}

	if (validationResult === true) {
		return;
	}

	alert(`
          Регистрация выполнена успешно!
          Спасибо за регистрацию!
          Ваши данные:
          Фамилия, имя: ${surnameValue} ${nameValue}
          Возраст: ${ageValue} лет
          Email: ${emailValue}
        `);

	surnameInput.value = '';
	nameInput.value = '';
	ageInput.value = '';
	emailInput.value = '';
	passwordInput.value = '';
	labelInput.checked = false;
};

//! Добавление элементов на страницу
box.append(
	title,
	surnameWrapper,
	nameWrapper,
	ageWrapper,
	emailWrapper,
	passwordWrapper,
	conditionWrap,
	regBtn
);
document.body.append(box);
