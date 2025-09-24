const formValidate = (formId) => {
  const form = document.getElementById(formId);
  if (!form) {
    return;
  }

  const validators = {
    text: {
      validator: (value) => /^[A-Za-zА-Яа-яЁё\s-]{3,15}$/.test(value),
      errorMessage:
        'Ім’я повинно містити 3–15 букв (латиниця або кирилиця), пробіли або дефіси.',
    },
    email: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: 'Email має бути у форматі username@example.com',
    },
    textarea: {
      validator: (value) => value.trim().length >= 10,
      errorMessage: 'Повідомлення повинно містити щонайменше 10 символів.',
    },
  };

  const inputs = Array.from(form.querySelectorAll('input, textarea'));

  const showError = (input, message) => {
    input.classList.remove('valid');
    input.classList.add('invalid');
    const errorId = input.getAttribute('aria-describedby');
    if (!errorId) {
      return;
    }
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  };

  const clearError = (input) => {
    input.classList.remove('invalid');
    input.classList.add('valid');
    const errorId = input.getAttribute('aria-describedby');
    if (!errorId) {
      return;
    }
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  };

  const clearAllErrors = () => {
    form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
    form
      .querySelectorAll('.invalid, .valid')
      .forEach((el) => el.classList.remove('invalid', 'valid'));
  };

  inputs.forEach((input) => {
    const type =
      input.tagName.toLowerCase() === 'textarea' ? 'textarea' : input.type;
    const rules = validators[type];
    if (!rules) {
      return;
    }

    input.addEventListener('input', () => {
      if (rules.validator(input.value.trim())) {
        clearError(input);
      } else {
        showError(input, rules.errorMessage);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();

    let isValid = true;

    inputs.forEach((input) => {
      const type =
        input.tagName.toLowerCase() === 'textarea' ? 'textarea' : input.type;
      const rules = validators[type];
      if (!rules) {
        return;
      }

      if (!rules.validator(input.value.trim())) {
        showError(input, rules.errorMessage);
        isValid = false;
      }
    });

    if (isValid) {
      const params = new URLSearchParams();
      inputs.forEach((input) => {
        if (!input.disabled && input.type !== 'hidden' && input.name) {
          params.append(input.name, input.value.trim());
        }
      });

      form.reset();

      const baseUrl =
        form.action && form.action.trim() && form.action !== '#'
          ? form.action
          : window.location.href.split('?')[0];

      window.location.href = `${baseUrl}?${params.toString()}`;
    }
  });
};

export { formValidate };
