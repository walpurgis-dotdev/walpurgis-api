import { readFileSync } from 'fs';
import createOrGetConnection from '../src/db';
import { DataSource } from 'typeorm';
import { UserStats } from '../src/entity';

// Function to import entity from JSON file
const importEntity = async (
  con: DataSource,
  name: string,
  options: { conflictPaths?: string[] } = {},
): Promise<void> => {
  console.log(`importing ${name}`);
  const entities = JSON.parse(readFileSync(`./seeds/${name}.json`).toString());
  const repository = con.getRepository(name);
  // Batch insert with dirty hack
  for (let i = 0; i < entities.length; i += 1000) {
    if (options.conflictPaths) {
      await repository.upsert(
        entities.slice(i, i + 1000),
        options.conflictPaths,
      );
    } else {
      await repository.insert(entities.slice(i, i + 1000));
    }
  }
};

// Array of views to refresh
const viewsToRefresh = [UserStats];

const start = async (): Promise<void> => {
  const con = await createOrGetConnection();
  await importEntity(con, 'User');

  // Refresh materialized views
  await con.transaction(async (manager) => {
    for (const viewToRefresh of viewsToRefresh) {
      await manager.query(
        `REFRESH MATERIALIZED VIEW ${con.getRepository(viewToRefresh).metadata.tableName}`,
      );
    }
  });
};

start()
  .then(() => {
    console.log('done');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(-1);
  });
