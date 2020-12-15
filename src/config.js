export const {
  MONGODB_URI,
  SESSION_SECRET,
  PORT = 8080,
  COOKIE_MAX_AGE_MS = 4 * 60 * 60 * 1000,
  NODE_ENV: ENV,
  OKTA_ISSUER,
  OKTA_SIGN_ON_URL,
  OKTA_CERT,
  MONGODB_SESSIONS_URI,
} = process.env;

export const ADMINS = process.env.ADMINS?.split(';');

export const IS_PRODUCTION = ENV === 'production';

export const APP_NAME = 'stp-charity-auction';

export const CORS = {
  origin: '*',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

export const HELMET_DIRECTIVES = {
  'script-src': ["'self'", "'unsafe-inline'", 'unpkg.com', 'cdnjs.cloudflare.com'],
  'img-src': ["'self'", 'schibsted.pl'],
};

export const MORGAN_CONFIG = 'common';

export const STATIC_CACHE_TIME = '4h';

export const APP_URL = IS_PRODUCTION
  ? 'https://stp-charity-auction.herokuapp.com'
  : `http://localhost:${PORT}`;
export const API_PATH = '/api/v1';
export const AUCTION_WITH_ID = `/auctions/:auctionId`;
export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const CALLBACK_PATH = `${LOGIN_PATH}/callback`;
export const PROTECT_REDIRECT_PATH = `${IS_PRODUCTION ? API_PATH.slice(1) : API_PATH}${LOGIN_PATH}`;

export const SAML_CONFIG = {
  cert: OKTA_CERT,
  issuer: OKTA_ISSUER,
  entryPoint: OKTA_SIGN_ON_URL,
  path: `${API_PATH}${CALLBACK_PATH}`,
};
