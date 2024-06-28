import { Client } from 'pg';

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5433,
    user: 'mario',
    password: 'admin123',
    database: 'my_store',
  });
  await client.connect();
  return client;
}

export default getConnection;
