//! Функции
const getTitle = (tag, className, text) => {
	const title = document.createElement(tag);
	title.classList.add(className);
	title.textContent = text;

	return title;
};

const getWrap = (className) => {
	const div = document.createElement('div');
	div.classList.add(className);

	return div;
};

const getLabel = (className) => {
	const label = document.createElement('label');
	label.classList.add(className);

	return label;
};

const getInput = (className, type, placeholder) => {
	const input = document.createElement('input');
	input.classList.add(className);
	input.type = type;
	input.placeholder = placeholder;

	return input;
};

const getSpan = (className, text) => {
	const span = document.createElement('span');
	span.classList.add(className);
	span.textContent = text;

	return span;
};

const getButton = (className, text) => {
	const button = document.createElement('button');
	button.classList.add(className);
	button.textContent = text;

	return button;
};

const modal = (surname, name, age, email) => {
	const modal = getWrap('modal'),
		modalOverlay = getWrap('modal-overlay');

	const img = document.createElement('img');
	img.classList.add('modal-img');
	img.src = 'img/done.png';

	const text = document.createElement('p');
	text.classList.add('modal-text');
	text.innerHTML = `
    Ваши данные:<br>
    <br>
    Фамилия и имя: "${surname} ${name}"<br>
    <br>
    Возраст: "${age}"<br>
    <br>
    Почта: "${email}"<br>
    <br>
    Вы успешно зарегистрированы!<br>
  `;

	const closeBtn = getButton('modal-close');

	modal.onclick = (e) => {
		if (e.target === modal || e.target === closeBtn) {
			modal.remove();
		}
	};

	modalOverlay.append(img, text, closeBtn);
	modal.append(modalOverlay);
	document.body.append(modal);

	return modal;
};

//! Создание главной обертки
const mainBox = getWrap('box');

//! Создание заголовка
const mainTitle = getTitle('h1', 'main-title', 'Регистрация');

//! Создание полей ввода
//! ---> Фамилия
const surnameWrapper = getWrap('box__field-wrap'),
	surnameInput = getInput('box__input', 'text', 'Фамилия'),
	surnameErrorLabel = getLabel('error-field');

surnameWrapper.append(surnameInput, surnameErrorLabel);
//! ---> Имя
const nameWrapper = getWrap('box__field-wrap'),
	nameInput = getInput('box__input', 'text', 'Имя'),
	nameErrorLabel = getLabel('error-field');

nameWrapper.append(nameInput, nameErrorLabel);
//! ---> Возраст
const ageWrapper = getWrap('box__field-wrap'),
	ageInput = getInput('box__input', 'number', 'Возраст'),
	ageErrorLabel = getLabel('error-field');

ageWrapper.append(ageInput, ageErrorLabel);
//! ---> Почта
const emailWrapper = getWrap('box__field-wrap'),
	emailInput = getInput('box__input', 'email', 'Почта'),
	emailErrorLabel = getLabel('error-field');

emailWrapper.append(emailInput, emailErrorLabel);
//! ---> Пароль
const passwordWrapper = getWrap('box__field-wrap'),
	passwordLabel = getLabel('box__label'),
	passwordInput = getInput('box__input', 'password', 'Пароль'),
	passwordBtn = getButton('btn-invisible'),
	passwordErrorLabel = getLabel('error-field');

passwordBtn.onclick = () => {
	if (passwordInput.type === 'password') {
		passwordBtn.classList.add('btn-visible');
		passwordInput.type = 'text';
	} else {
		passwordBtn.classList.remove('btn-visible');
		passwordInput.type = 'password';
	}
};

passwordLabel.append(passwordInput, passwordBtn);
passwordWrapper.append(passwordLabel, passwordErrorLabel);
//! ---> Пользовательское соглашение
const conditionWrapper = getWrap('box__field-wrap'),
	conditionLabel = getLabel('box__label-check'),
	conditionInput = getInput('box__label-input', 'checkbox', 'checkbox'),
	conditionText = getSpan('box__label-span', 'Пользовательское соглашение'),
	conditionErrorLabel = getLabel('error-field');

conditionLabel.append(conditionInput, conditionText);
conditionWrapper.append(conditionLabel, conditionErrorLabel);

//! Создание кнопки
const regBtn = getButton('box__btn', 'Зарегистрироваться');

//! Отправка формы
regBtn.onclick = () => {
	const surnameValue = surnameInput.value,
		nameValue = nameInput.value,
		ageValue = Number(ageInput.value),
		emailValue = emailInput.value,
		passwordValue = passwordInput.value,
		conditionChecked = conditionInput.checked;

	let validationResult = false;

	//! Проверка фамилии
	surnameErrorLabel.textContent = '';
	surnameInput.style.boxShadow = '';
	if (surnameValue.length <= 1) {
		validationResult = true;
		surnameInput.style.boxShadow = '2px 2px 3px red';
		surnameErrorLabel.textContent =
			'Фамилия НЕ может состоять из одного символа';
	}
	if (surnameValue === '') {
		validationResult = true;
		surnameInput.style.boxShadow = '2px 2px 3px red';
		surnameErrorLabel.textContent = 'Введите фамилию';
	}

	//! Проверка имени
	nameErrorLabel.textContent = '';
	nameInput.style.boxShadow = '';
	if (nameValue.length <= 1) {
		validationResult = true;
		nameInput.style.boxShadow = '2px 2px 3px red';
		nameErrorLabel.textContent = 'Имя НЕ может состоять из одного символа';
	}
	if (nameValue === '') {
		validationResult = true;
		nameInput.style.boxShadow = '2px 2px 3px red';
		nameErrorLabel.textContent = 'Введите имя';
	}

	//! Проверка возраста
	ageErrorLabel.textContent = '';
	ageInput.style.boxShadow = '';
	if (ageValue <= 14) {
		validationResult = true;
		ageInput.style.boxShadow = '2px 2px 3px red';
		ageErrorLabel.textContent = 'Вы еще слишком молоды!';
	}
	if (ageValue === 0) {
		validationResult = true;
		ageInput.style.boxShadow = '2px 2px 3px red';
		ageErrorLabel.textContent = 'Введите возраст';
	}

	//! Проверка почты
	emailErrorLabel.textContent = '';
	emailInput.style.boxShadow = '';
	if (
		emailValue.length <= 2 ||
		emailValue.includes('@') === false ||
		emailValue.includes('.') === false
	) {
		validationResult = true;
		emailInput.style.boxShadow = '2px 2px 3px red';
		emailErrorLabel.textContent = 'Неверная почта';
	}
	if (emailValue === '') {
		validationResult = true;
		emailInput.style.boxShadow = '2px 2px 3px red';
		emailErrorLabel.textContent = 'Введите почту';
	}

	//! Проверка почты
	passwordErrorLabel.textContent = '';
	passwordInput.style.boxShadow = '';
	if (
		passwordValue.length <= 6 ||
		passwordValue.includes('-') === false ||
		passwordValue.includes('_') === false
	) {
		validationResult = true;
		passwordInput.style.boxShadow = '2px 2px 3px red';
		passwordErrorLabel.textContent =
			'Пароль содержит минимум 6 символов и символы "-", "_"';
	}
	if (passwordValue === '') {
		validationResult = true;
		passwordInput.style.boxShadow = '2px 2px 3px red';
		passwordErrorLabel.textContent = 'Введите пароль';
	}

	//! Проверка почты
	conditionErrorLabel.textContent = '';
	conditionInput.style.borderColor = '';
	if (conditionChecked === false) {
		validationResult = true;
		conditionInput.style.borderColor = 'red';
		conditionErrorLabel.textContent = 'Вы НЕ согласны';
	}

	//! Проверка валидности
	if (validationResult === true) {
		return;
	}

	modal(surnameValue, nameValue, ageValue, emailValue);

	surnameInput.value = '';
	nameInput.value = '';
	ageInput.value = '';
	emailInput.value = '';
	passwordInput.value = '';
	conditionInput.checked = false;
};

//! Добавление элементов на страницу
mainBox.append(
	mainTitle,
	surnameWrapper,
	nameWrapper,
	ageWrapper,
	emailWrapper,
	passwordWrapper,
	conditionWrapper,
	regBtn
);
document.body.append(mainBox);
