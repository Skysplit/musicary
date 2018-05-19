import { Connection } from 'typeorm';
import createConnection from '@server/database';

process.env.APP_SECRET = 'test-secret';

let connection: Connection;

beforeAll(async () => {
  if (!connection) {
    connection = await createConnection();
  }

  // Clear database before each test suite
  await connection.dropDatabase();
  await connection.runMigrations({ transaction: true });
});
