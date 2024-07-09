import getEmployees from './get/index.js';
import postEmployees from './post/index.js';
import patchEmployees from './patch/index.js';
import login from './login/index.js';

export default [
  getEmployees,
  postEmployees,
  patchEmployees,
  ...login,
];
