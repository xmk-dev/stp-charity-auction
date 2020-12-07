import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

import { API_PATH, CORS, MORGAN_CONFIG, PORT, STATIC_CACHE_TIME } from './config.js';
import connectDB from './database/connector.js';
import router from './routes/router.js';
import { createSocket } from './utils/socket.js';

const app = express();

app.use(express.static(path.join(path.resolve(), '/public'), { maxAge: STATIC_CACHE_TIME }));
app.use(favicon(path.join(path.resolve(), '/public', 'favicon.ico')));
app.use(morgan(MORGAN_CONFIG));
app.use(helmet());
app.use(cors(CORS));
app.use(compression());
app.use(bodyParser.json());
app.use(API_PATH, router());
app.set('port', PORT);

connectDB();

const server = app.listen(PORT);

createSocket(server);
