const formValidate = () => {
  const form = document.getElementById('form');

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const textareaInput = document.getElementById('userTextarea');

  const validators = {
    userName: () => /^[A-Za-zА-Яа-яЁё\s-]{3,15}$/.test(nameInput.value.trim()),
    userEmail: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()),
    userTextarea: () => textareaInput.value.trim().length >= 10,
  };

  const errorMessages = {
    userName:
      'Ім’я повинно містити 3–15 букв (латиниця або кирилиця), пробіли або дефіси.',
    userEmail: 'Email має бути у форматі username@example.com',
    userTextarea: 'Повідомлення повинно містити щонайменше 10 символів.',
  };

  [nameInput, emailInput, textareaInput].forEach((input) => {
    const fieldKey =
      input.id === 'userName'
        ? 'userName'
        : input.id === 'userEmail'
          ? 'userEmail'
          : 'userTextarea';
    const errorId = input.id + 'Error';
    input.addEventListener('input', () =>
      handleValidation(input, errorId, fieldKey),
    );
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (!validators.userName()) {
      showError(nameInput, 'nameError', errorMessages.userName);
      isValid = false;
    }
    if (!validators.userEmail()) {
      showError(emailInput, 'emailError', errorMessages.userEmail);
      isValid = false;
    }
    if (!validators.userTextarea()) {
      showError(textareaInput, 'textareaError', errorMessages.userTextarea);
      isValid = false;
    }

    if (isValid) {
      alert('Форма успішно відправлена!');
      form.reset();
      clearErrors();
    }
  });

  function handleValidation(input, errorId, fieldKey) {
    validators[fieldKey]()
      ? clearFieldError(input, errorId)
      : showError(input, errorId, errorMessages[fieldKey]);
  }

  function showError(input, errorId, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearFieldError(input, errorId) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
    form
      .querySelectorAll('.invalid, .valid')
      .forEach((el) => el.classList.remove('invalid', 'valid'));
  }
};

export { formValidate };
