import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './index';
(async () => {
  try {
    console.log(resolve(__dirname, '../../migrations'));
    
    await migrate(db, { migrationsFolder: resolve(__dirname, '../../migrations'), });
    console.log('Migration successful');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
