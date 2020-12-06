export default (function_) => async (request, response, next) => {
  try {
    return await function_(request, response, next);
  } catch ({ kind, name }) {
    return kind === 'ObjectId' || name === 'NotFound'
      ? response.status(404).send()
      : response.status(500).send();
  }
};
