import { MongoClient } from 'mongodb';
import { InvalidConfigError } from '../common/errors';
import { readConfig } from '../config/config';

const dbName = 'meowy';

/**
 * Connects to the database as specified in config and returns the client instance
 */
export default async function connectDatabase() {
  const url = readConfig('MONGO_URL');
  if (!url) throw new InvalidConfigError();

  const client = new MongoClient(url);
  await client.connect();

  return client.db(dbName);
}
