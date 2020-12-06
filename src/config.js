export const { MONGODB_URI, PORT, ADMIN_PASSWORD, ADMIN_USERNAME } = process.env;

export const ADMINS = process.env.ADMINS?.split(';');

export const CORS = {
  origin: '*',
  methods: ['POST', 'GET'],
};

export const API_PATH = '/api/v1/';

export const MORGAN_CONFIG = 'common';

export const STATIC_CACHE_TIME = '4h';
