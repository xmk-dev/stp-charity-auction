import passport from 'passport';
import { Strategy } from 'passport-saml';

import { APP_URL, PROTECT_REDIRECT_PATH, SAML_CONFIG } from '../config.js';
import User from '../database/models/user.js';

passport.serializeUser(({ nameID, _id }, done) => done(undefined, nameID || _id));

passport.deserializeUser((id, done) => User.findById(id, done));

passport.use(
  'saml',
  new Strategy(SAML_CONFIG, async ({ nameID }, done) => {
    let user;
    if (!(await User.findById(nameID))) {
      user = await User.create({ _id: nameID });
    }

    console.log('\n\nUSER:\n', user, '\n\n');
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
