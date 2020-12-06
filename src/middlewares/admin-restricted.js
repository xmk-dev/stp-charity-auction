import { ADMIN_PASSWORD, ADMIN_USERNAME, ADMINS } from '../config.js';

export default async (request, response, next) => {
  // TODO: get email from Okta;
  const email = 'usersemailfromcookie?';

  const [username, password] =
    Buffer.from(request.headers.authorization?.split(' ')?.[1], 'base64')
      .toString('ascii')
      .split(':') || [];

  console.log('\n\nHERE:', username, password);
  console.log('SHOULD BE:', ADMIN_USERNAME, ADMIN_PASSWORD);

  if (ADMINS.includes(email) || (username === ADMIN_USERNAME && password === ADMIN_PASSWORD)) {
    return next();
  }

  return response.set('WWW-Authenticate', 'Basic').status(401).send();
};
