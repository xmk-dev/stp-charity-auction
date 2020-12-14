import passport from 'passport';
import { Strategy } from 'passport-saml';

import { APP_URL, PROTECT_REDIRECT_PATH, SAML_CONFIG } from '../config.js';
import User from '../database/models/user.js';

passport.serializeUser(({ nameID, _id }, done) => done(undefined, nameID || _id));

passport.deserializeUser((id, done) => User.findById(id, done));

passport.use(
  'saml',
  new Strategy(SAML_CONFIG, async ({ nameID }, done) => {
    const user = await User.findById(nameID);

    if (user) {
      return done(undefined, user);
    }

    return User.create({ _id: nameID }, done);
  }),
);

export const protect = (request, response, next) =>
  request.isAuthenticated() ? next() : response.redirect(PROTECT_REDIRECT_PATH);

export const authenticate = passport.authenticate('saml', {
  failureRedirect: `${APP_URL}/`,
  failureFlash: true,
});

export default passport;
