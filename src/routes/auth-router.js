import { APP_URL } from '../config.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';
import { authenticate } from '../middlewares/auth.js';
import redirect from '../middlewares/redirect.js';

const LOGIN_PATH = '/login';
const LOGOUT_PATH = '/logout';
const CALLBACK_PATH = `${LOGIN_PATH}/callback`;

export default (router) => {
  router.get(`${LOGIN_PATH}`, authenticate, asyncErrorHandler(redirect(APP_URL)));

  router.post(`${CALLBACK_PATH}`, authenticate, asyncErrorHandler(redirect(APP_URL)));

  router.get(
    `${LOGOUT_PATH}`,
    asyncErrorHandler((request) => {
      request.session.destroy();
      redirect(APP_URL);
    }),
  );
};
