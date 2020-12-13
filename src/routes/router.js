import { Router } from 'express';

import auctionsRouter from './auctions-router.js';
import authRouter from './auth-router.js';

export default () => {
  const router = Router();

  authRouter(router);
  auctionsRouter(router);

  return router;
};
