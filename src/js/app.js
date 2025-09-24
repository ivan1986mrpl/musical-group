'use strict';

import { scrollUp } from './modules/scrollUp';
import Header from './modules/Header';
import popup from './modules/popup';
import { formValidate } from './modules/formValidate';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  new Header();
  formValidate('form');
  formValidate('form-popup');
  popup();
});
