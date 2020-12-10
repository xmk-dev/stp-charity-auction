import { ADMIN_PASSWORD, ADMIN_USERNAME, ADMINS } from '../config.js';

export default async (request, response, next) => {
  const [username, password] =
    Buffer.from(request.headers.authorization?.split(' ')?.[1], 'base64')
      .toString('ascii')
      .split(':') || [];

  if (
    ADMINS.includes(request.user?.nameID) ||
    (username === ADMIN_USERNAME && password === ADMIN_PASSWORD)
  ) {
    return next();
  }

  return response.set('WWW-Authenticate', 'Basic').status(401).send();
};
