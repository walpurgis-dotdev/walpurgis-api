/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import { parseArgs } from 'node:util';
import api from '../src';

async function run(positionals: string[]) {
  switch (positionals[0]) {
    case 'api':
      const app = await api();
      await app.listen({
        port: parseInt(process.env.PORT) || 3000,
        host: '0.0.0.0',
      });
      break;
    default:
      console.log('unknown command');
      process.exit();
      break;
  }
}

const { positionals } = parseArgs({
  allowPositionals: true,
});

run(positionals).catch((err) => {
  console.error(err);
  process.exit(1);
});
