import { bid, create, findAll, findOne, update } from '../controllers/auctions-controller.js';
import adminRestricted from '../middlewares/admin-restricted.js';
import asyncErrorHandler from '../middlewares/async-error-handler.js';

const BASE_PATH = '/auctions';
const ID_PATH_PARAM = '/:auctionId';
const ADMIN_PATH = '/admin';

export default (router) => {
  router.get(`${BASE_PATH}${ID_PATH_PARAM}`, asyncErrorHandler(findOne));

  router.get(`${ADMIN_PATH}${BASE_PATH}`, adminRestricted, asyncErrorHandler(findAll));

  router.get(
    `${ADMIN_PATH}${BASE_PATH}${ID_PATH_PARAM}`,
    adminRestricted,
    asyncErrorHandler(update),
  );

  router.post(`${ADMIN_PATH}${BASE_PATH}`, adminRestricted, asyncErrorHandler(create));

  router.post(`${BASE_PATH}${ID_PATH_PARAM}`, asyncErrorHandler(bid));
};
