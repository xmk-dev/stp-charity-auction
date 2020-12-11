import { AUCTION_ADMIN_PATH, AUCTION_WITH_ID, AUCTIONS_BASE_PATH } from '../config.js';
import { bid, findAll, findOne, update } from '../controllers/auctions-controller.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';
import emailAuth from '../middlewares/email-auth.js';
import { protect } from '../utils/passport.js';

export default (router) => {
  router.get(AUCTIONS_BASE_PATH, protect, asyncErrorHandler(findAll));

  router.get(AUCTION_WITH_ID, protect, asyncErrorHandler(findOne));

  router.post(AUCTION_WITH_ID, protect, asyncErrorHandler(bid));

  router.get(AUCTION_ADMIN_PATH, protect, emailAuth, asyncErrorHandler(update));
};
