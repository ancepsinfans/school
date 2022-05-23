import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // Connect to cluster
    let client = new MongoClient(uri);
    await client.connect();
    let db = client.db();

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

export async function withMongo(fn) {
    const conn = await connectToDatabase()
    return await fn(conn.db)
}