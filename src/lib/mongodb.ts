import { MongoClient, Db } from "mongodb";

/**
 * Cached MongoDB client. Each Lambda invocation reuses the same module
 * scope between warm requests, so we keep a single MongoClient at module
 * level instead of opening a new connection pool every time. The `global`
 * trick in dev survives Next's HMR module re-evaluation.
 */

const uri = process.env.MONGODB_URI ?? "";
const dbName = process.env.MONGODB_DB || "portfolio";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let _productionClient: MongoClient | undefined;

function getClient(): MongoClient {
  if (!uri) throw new Error("MONGODB_URI environment variable is not set.");

  if (process.env.NODE_ENV !== "production") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri);
    }
    return global._mongoClient;
  }

  if (!_productionClient) {
    _productionClient = new MongoClient(uri);
  }
  return _productionClient;
}

export async function getDb(): Promise<Db> {
  const client = getClient();
  await client.connect();
  return client.db(dbName);
}

/**
 * Promise-returning client for `@auth/mongodb-adapter`. The adapter wants
 * a Promise<MongoClient>, not a getter. We resolve it once and reuse.
 */
export const clientPromise: Promise<MongoClient> = (async () => {
  const client = getClient();
  await client.connect();
  return client;
})();
