import mongoose from 'mongoose';

import { MONGODB_URI } from '../config.js';

export default async () => {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.error('Could not connect to the database. Exiting now...', error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit();
  }
};
