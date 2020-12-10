import passport from 'passport';
import { Strategy } from 'passport-saml';

import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
  ADMINS,
  APP_URL,
  OKTA_CERT,
  OKTA_ISSUER,
  OKTA_SIGN_ON_URL,
} from '../config.js';

const SAML_CONFIG = {
  cert: OKTA_CERT,
  issuer: OKTA_ISSUER,
  entryPoint: OKTA_SIGN_ON_URL,
  path: `${APP_URL}/login/callback`,
};

const users = [];

const findUserByEmail = (email) => users.find((u) => u.email === email);

passport.serializeUser((user, done) => done(undefined, user.email));

passport.deserializeUser((email, done) => done(undefined, findUserByEmail(email)));

passport.use(
  new Strategy(SAML_CONFIG, (user, done) => {
    if (!findUserByEmail(user.email)) {
      users.push(user);
    }

    return done(undefined, user);
  }),
);

export const protect = (request, response, next) =>
  request.isAuthenticated() ? next() : response.redirect(`${APP_URL}/login`);

export const authenticate = passport.authenticate('saml', {
  failureRedirect: '/',
  failureFlash: true,
});

export const basicAuth = async (request, response, next) => {
  const [username, password] =
    Buffer.from(request.headers.authorization?.split(' ')?.[1], 'base64')
      .toString('ascii')
      .split(':') || [];

  if (
    ADMINS.includes(request.user?.email) ||
    (username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
  ) {
    return next();
  }

  return response.set('WWW-Authenticate', 'Basic').status(401).send();
};
