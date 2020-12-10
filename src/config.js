export const {
  MONGODB_URI,
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  SESSION_SECRET,
  PORT = 8080,
  COOKIE_MAX_AGE_MS = 4 * 60 * 60 * 1000,
  NODE_ENV: ENV,
  OKTA_ISSUER,
  OKTA_SIGN_ON_URL,
  OKTA_CERT,
} = process.env;

export const ADMINS = process.env.ADMINS?.split(';');

export const IS_PRODUCTION = ENV === 'production';

export const APP_URL = IS_PRODUCTION
  ? 'https://stp-charity-auction.herokuapp.com/'
  : `http://localhost:${PORT}`;

export const APP_NAME = 'stp-charity-auction';

export const CORS = {
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

export const API_PATH = '/api/v1/';

export const MORGAN_CONFIG = 'common';

export const STATIC_CACHE_TIME = '4h';
