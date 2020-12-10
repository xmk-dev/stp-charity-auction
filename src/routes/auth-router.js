import asyncErrorHandler from '../middlewares/async-error-handler.js';
import { authenticate } from '../middlewares/auth';

const LOGIN_PATH = '/login';
const CALLBACK_PATH = `${LOGIN_PATH}/callback`;

export default (router) => {
  router.get(`${LOGIN_PATH}`, authenticate, asyncErrorHandler());

  router.post(`${CALLBACK_PATH}`, authenticate, asyncErrorHandler());
};
