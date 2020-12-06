import { Router } from 'express';

import auctionsRouter from './auctions-router.js';
import healthRouter from './health-router.js';

export default () => {
  const router = Router();

  healthRouter(router);
  auctionsRouter(router);

  return router;
};
