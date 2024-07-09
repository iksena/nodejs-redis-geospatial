import get from './get/index.js';
import post from './post/index.js';
import patch from './patch/index.js';
import deleteShops from './delete/index.js';

export default [
  ...get,
  post,
  patch,
  deleteShops,
];
