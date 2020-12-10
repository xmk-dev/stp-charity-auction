import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

import {
  API_PATH,
  APP_NAME,
  COOKIE_MAX_AGE_MS,
  CORS,
  IS_PRODUCTION,
  MORGAN_CONFIG,
  PORT,
  SESSION_SECRET,
  STATIC_CACHE_TIME,
} from './config.js';
import connectDB from './database/connector.js';
import { protect } from './middlewares/auth.js';
import router from './routes/router.js';
import { createSocket } from './utils/socket.js';

// TODO: add helmet for security
const app = express();

if (IS_PRODUCTION) {
  app.set('trust proxy', 1);
}

app.set('port', PORT);
app.use(morgan(MORGAN_CONFIG));
app.use(cors(CORS));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(API_PATH, router());
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: { maxAge: COOKIE_MAX_AGE_MS, secure: IS_PRODUCTION },
    resave: true,
    saveUninitialized: true,
    name: APP_NAME,
  }),
);
app.use(
  protect,
  express.static(path.join(path.resolve(), '/public'), { maxAge: STATIC_CACHE_TIME }),
);
app.use(favicon(path.join(path.resolve(), '/public', 'favicon.ico')));

connectDB();

const server = app.listen(PORT);

createSocket(server);
