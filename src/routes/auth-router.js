import { APP_URL, CALLBACK_PATH, LOGIN_PATH, LOGOUT_PATH } from '../config.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';
import redirect from '../middlewares/redirect.js';
import { authenticate } from '../utils/passport.js';

export default (router) => {
  router.get(`${LOGIN_PATH}`, authenticate, asyncErrorHandler(redirect(`${APP_URL}/`)));

  router.post(`${CALLBACK_PATH}`, authenticate, asyncErrorHandler(redirect(`${APP_URL}/`)));

  router.get(
    `${LOGOUT_PATH}`,
    asyncErrorHandler((request) => {
      request.session.destroy();
      redirect(APP_URL);
    }),
  );
};
