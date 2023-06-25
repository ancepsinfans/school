import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI)

    if (req.method === "GET") {

        if (Object.keys(req.query).includes('email')) {
            const email = req.query.email
            try {
                await client.connect(); // Connect to the MongoDB server

                const collection = client.db('school').collection('users');
                const query = { email: email };
                const results = await collection.find(query).toArray();

                res.status(200).send(results[0]._id.toString());
            } catch (error) {
                console.error('Error executing MongoDB query', error);
                res.status(500).json({ error: 'Failed to execute the query' });
            } finally {
                await client.close(); // Close the MongoDB connection
            }

        } else {
            res.status(403).send('error')
        }
    }
}