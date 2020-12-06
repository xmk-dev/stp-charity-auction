const BASE_PATH = '/health';

export default (router) => {
  router.get(`${BASE_PATH}`, (_, response) => response.send('OK'));
};
