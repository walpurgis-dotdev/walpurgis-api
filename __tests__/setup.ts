import * as matchers from 'jest-extended';
import createOrGetConnection from '../src/db';

expect.extend(matchers);

global.structuredClone = (v) => JSON.parse(JSON.stringify(v));

const cleanDatabase = async (): Promise<void> => {
  const con = await createOrGetConnection();
  for (const entity of con.entityMetadatas) {
    const repository = con.getRepository(entity.name);
    if (repository.metadata.tableType === 'view') continue;
    await repository.query(`DELETE
                            FROM "${entity.tableName}";`);

    for (const column of entity.primaryColumns) {
      if (column.generationStrategy === 'increment') {
        await repository.query(
          `ALTER SEQUENCE ${entity.tableName}_${column.databaseName}_seq RESTART WITH 1`,
        );
      }
    }
  }
};

beforeEach(cleanDatabase);
