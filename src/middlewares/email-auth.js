import { ADMINS } from '../config.js';

export default async (request, response, next) => {
  if (ADMINS.includes(request.user?.nameID)) {
    return next();
  }

  return response.set('WWW-Authenticate', 'Basic').status(401).send();
};
