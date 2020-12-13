import passport from 'passport';
import { Strategy } from 'passport-saml';

import { APP_URL, PROTECT_REDIRECT_PATH, SAML_CONFIG } from '../config.js';

const users = [];

const findUserById = (id) => users.find(({ nameID }) => nameID === id);

passport.serializeUser(({ nameID }, done) => done(undefined, nameID));

passport.deserializeUser((nameID, done) => done(undefined, findUserById(nameID)));

passport.use(
  'saml',
  new Strategy(SAML_CONFIG, (user, done) => {
    if (!findUserById(user.nameID)) {
      users.push(user);
    }

    return done(undefined, user);
  }),
);

export const protect = (request, response, next) =>
  request.isAuthenticated() ? next() : response.redirect(PROTECT_REDIRECT_PATH);

export const authenticate = passport.authenticate('saml', {
  failureRedirect: `${APP_URL}/`,
  failureFlash: true,
});

export default passport;
