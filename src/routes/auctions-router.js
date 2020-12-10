import { bid, create, findAll, findOne, update } from '../controllers/auctions-controller.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';
import { basicAuth, protect } from '../middlewares/auth.js';

const BASE_PATH = '/auctions';
const ID_PATH_PARAM = '/:auctionId';
const ADMIN_PATH = '/admin';

export default (router) => {
  router.post(`${BASE_PATH}`, basicAuth, asyncErrorHandler(create));

  router.get(`${BASE_PATH}`, protect, asyncErrorHandler(findAll));

  router.get(`${BASE_PATH}${ID_PATH_PARAM}`, protect, asyncErrorHandler(findOne));

  router.post(`${BASE_PATH}${ID_PATH_PARAM}`, protect, asyncErrorHandler(bid));

  router.get(`${ADMIN_PATH}${BASE_PATH}${ID_PATH_PARAM}`, basicAuth, asyncErrorHandler(update));
};
