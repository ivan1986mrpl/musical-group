const formSubmit = (form, url) => {
  const nameInput = form.querySelector('#userName');
  const emailInput = form.querySelector('#userEmail');
  const textareaInput = form.querySelector('#userTextarea');

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    if (!isFormValid()) {
      return;
    }

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    form.appendChild(statusMessage);

    const message = {
      loading: 'Завантаження...',
      success: 'Форма успішно відправлена!',
      failure: 'Сталася помилка. Спробуйте ще раз.',
    };

    statusMessage.textContent = message.loading;

    const formData = new FormData(form);

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const result = await res.text();
      console.log(result);
      statusMessage.textContent = message.success;
      form.reset();
      clearErrors();
    } catch (error) {
      statusMessage.textContent = message.failure;
    } finally {
      setTimeout(() => statusMessage.remove(), 5000);
    }
  });

  function isFormValid() {
    let valid = true;
    if (!validators.userName()) {
      showError(nameInput, 'nameError', errorMessages.userName);
      valid = false;
    }
    if (!validators.userEmail()) {
      showError(emailInput, 'emailError', errorMessages.userEmail);
      valid = false;
    }
    if (!validators.userTextarea()) {
      showError(textareaInput, 'textareaError', errorMessages.userTextarea);
      valid = false;
    }
    return valid;
  }

  function handleValidation(input, errorId, fieldKey) {
    validators[fieldKey]()
      ? clearFieldError(input, errorId)
      : showError(input, errorId, errorMessages[fieldKey]);
  }

  function showError(input, errorId, message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorElement = form.querySelector('#' + errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearFieldError(input, errorId) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorElement = form.querySelector('#' + errorId);
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

export { formSubmit };
