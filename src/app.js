import bodyParser from 'body-parser';
import compression from 'compression';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

import {
  API_PATH,
  COOKIE_MAX_AGE_MS,
  CORS,
  HELMET_DIRECTIVES,
  IS_PRODUCTION,
  MORGAN_CONFIG,
  PORT,
  SESSION_SECRET,
  STATIC_CACHE_TIME,
} from './config.js';
import connectDB from './database/connector.js';
import router from './routes/router.js';
import passport, { protect } from './utils/passport.js';
import { createSocket } from './utils/socket.js';

connectDB();

const MongoStore = connectMongo(session);
const app = express();

if (IS_PRODUCTION) {
  app.set('trust proxy', 1);
}

app.set('port', PORT);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: { maxAge: COOKIE_MAX_AGE_MS, secure: IS_PRODUCTION },
    resave: IS_PRODUCTION,
    saveUninitialized: IS_PRODUCTION,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions',
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan(MORGAN_CONFIG));
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      ...HELMET_DIRECTIVES,
    },
  }),
);
app.use(cors(CORS));
app.use(API_PATH, router());

// Front-End
app.get('/', protect);
app.use(express.static(path.join(path.resolve(), '/public'), { maxAge: STATIC_CACHE_TIME }));
app.use(favicon(path.join(path.resolve(), '/public', 'favicon.ico')));

// Run Server
const server = app.listen(PORT);
createSocket(server);
