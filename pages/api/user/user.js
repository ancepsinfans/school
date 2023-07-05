import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const isTrue = (v) => {
        return v === 'true'
    }
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

        } else if (!!req.query.distinct) {

            await client.connect(); // Connect to the MongoDB server
            const collection = client.db('school').collection('students');

            // setting up a query object and pruning invalid values
            const query = { user: req.query.ID, 'progress.sphere': req.query.sphere, 'progress.course': req.query.course};
            Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])
            
            // setting up the projection object and only keeping false values
            const projection = {feedback: isTrue(req.query.feedback), progress: isTrue(req.query.progress), answers: isTrue(req.query.answers), vocab: isTrue(req.query.vocab)}
            Object.keys(projection).map(e=>{
                if (projection[e]) {
                    delete projection[e]
                }
            })

            const results = await collection.distinct(req.query.distinct, query, {projection: projection});


            res.status(200).send(results);
        }  else if (Object.keys(req.query).includes('ID')) {

            await client.connect(); // Connect to the MongoDB server
            const collection = client.db('school').collection('students');

            // setting up a query object and pruning invalid values
            const query = { user: req.query.ID, 'progress.sphere': req.query.sphere, 'progress.course': req.query.course};
            Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])
            
            // setting up the projection object and only keeping false values
            const projection = {feedback: isTrue(req.query.feedback), progress: isTrue(req.query.progress), answers: isTrue(req.query.answers), vocab: isTrue(req.query.vocab)}
            Object.keys(projection).map(e=>{
                if (projection[e]) {
                    delete projection[e]
                }
            })

            const results = await collection.find(query, {projection: projection}).toArray();

            res.status(200).send(results[0]);

}
    }
}