'use strict';

// import { scrollUp } from './modules/scrollUp';
import Header from './modules/Header';
import { formSubmit } from './modules/formSabmit';
// import headerFon from './modules/headerFon';
// import spollers from './modules/spollers';
// import { DateUpdater } from './modules/DateUpdater';
// import { counterAnimation } from './modules/counterAnimation';
// import { formValidate } from './modules/formValidate';

window.addEventListener('DOMContentLoaded', () => {
  // scrollUp();
  new Header();
  const form = document.getElementById('form');
  formSubmit(form, 'assets/server.php');
  // headerFon();
  // spollers();
  // new DateUpdater('.date', { useIntl: false, lang: 'ru' });
  // counterAnimation();
});
