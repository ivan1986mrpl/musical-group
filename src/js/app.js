'use strict';

import { scrollUp } from './modules/scrollUp';
import headerFon from './modules/headerFon';
import Header from './modules/Header';
import pageNavigation from './modules/page-navigation';
import popup from './modules/popup';
import { formValidate } from './modules/formValidate';

window.addEventListener('DOMContentLoaded', () => {
  scrollUp();
  new Header();
  headerFon();
  pageNavigation();
  formValidate('form');
  formValidate('form-popup');
  popup();
});
