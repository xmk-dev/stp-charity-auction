import passport from 'passport';
import { Strategy } from 'passport-saml';

import { APP_URL, PROTECT_REDIRECT_PATH, SAML_CONFIG } from '../config.js';
// import User from '../database/models/user.js';

// const users = [];

// const findUserById = (id) => users.find(({ nameID }) => nameID === id);

// passport.serializeUser(({ nameID }, done) => done(undefined, nameID));

// passport.deserializeUser((nameID, done) => done(undefined, findUserById(nameID)));

// User.findOneAndUpdate({ _id: nameID }, { upsert: true }, done)

passport.use('saml', new Strategy(SAML_CONFIG, ({ nameID }, done) => done(undefined, { nameID })));

export const protect = (request, response, next) =>
  request.isAuthenticated() ? next() : response.redirect(PROTECT_REDIRECT_PATH);

export const authenticate = passport.authenticate('saml', {
  failureRedirect: `${APP_URL}/`,
  failureFlash: true,
});

export default passport;
