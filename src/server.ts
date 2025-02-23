import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`\x1b[32mApp is listening on port ${config.port}\x1b[0m`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
