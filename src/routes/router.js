import { Router } from 'express';

import auctionsRouter from './auctions-router.js';
import authRouter from './auth-router.js';
import healthRouter from './health-router.js';

export default () => {
  const router = Router();

  authRouter(router);
  healthRouter(router);
  auctionsRouter(router);

  return router;
};
