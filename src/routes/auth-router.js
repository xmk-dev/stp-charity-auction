import { APP_URL, CALLBACK_PATH, LOGIN_PATH } from '../config.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';
import redirect from '../middlewares/redirect.js';
import { authenticate } from '../utils/passport.js';

export default (router) => {
  router.get(`${LOGIN_PATH}`, authenticate, asyncErrorHandler(redirect(`${APP_URL}/`)));

  router.post(`${CALLBACK_PATH}`, authenticate, asyncErrorHandler(redirect(`${APP_URL}/`)));
};
