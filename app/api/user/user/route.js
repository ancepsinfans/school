import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
    const isTrue = (v) => {
        return v === 'true'
    }
    const client = new MongoClient(process.env.MONGODB_URI)

    if (req.method === "GET") {
        const { searchParams } = new URL(req.url);
        const params = Object.fromEntries(searchParams);

        if (Object.keys(params).includes('email')) {

            const email = params.email
            try {
                await client.connect(); // Connect to the MongoDB server

                const collection = client.db('school').collection('users');
                const query = { email: email };
                const results = await collection.find(query).toArray();
                return NextResponse.json(results[0]._id.toString(), { status: 200 })

            } catch (error) {
                console.error('Error executing MongoDB query', error);
                return NextResponse.json('failed to execute the query', { status: 500 })

            } finally {
                await client.close(); // Close the MongoDB connection
            }

        } else if (!!params.distinct) {

            await client.connect(); // Connect to the MongoDB server
            const collection = client.db('school').collection('students');

            // setting up a query object and pruning invalid values
            const query = { user: params.ID, 'progress.sphere': params.sphere, 'progress.course': params.course };
            Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])

            // setting up the projection object and only keeping false values
            const projection = { feedback: isTrue(params.feedback), progress: isTrue(params.progress), answers: isTrue(params.answers), vocab: isTrue(params.vocab) }
            Object.keys(projection).map(e => {
                if (projection[e]) {
                    delete projection[e]
                }
            })
            let results
            try {
                results = await collection.distinct(params.distinct, query, { projection: projection });
            } catch (error) {
                console.log({ error })
                results = null
            }

            return NextResponse.json(results, { status: 200 })


        } else if (!!params.vocab) {
            await client.connect(); // Connect to the MongoDB server
            const collection = client.db('school').collection('students');

            let results
            try {

                const documents = await collection.aggregate([
                    {
                        $match: {
                            user: params.ID
                        }
                    },
                    {
                        $unwind: "$vocab"
                    },
                    {
                        $group: {
                            _id: "$vocab.term.term",
                            vocab: { $first: "$vocab" }
                        }
                    },
                    {
                        $replaceRoot: {
                            newRoot: "$vocab"
                        }
                    }
                ])

                results = await documents.toArray()
            } catch (error) {
                console.log({ error })

            }
            return NextResponse.json(results, { status: 200 })
        } else if (Object.keys(params).includes('ID')) {

            await client.connect(); // Connect to the MongoDB server
            const collection = client.db('school').collection('students');

            // setting up a query object and pruning invalid values
            const query = { user: params.ID, 'progress.sphere': params.sphere, 'progress.course': params.course };
            Object.keys(query).forEach((k) => query[k] == undefined && delete query[k])

            // setting up the projection object and only keeping false values
            const projection = { feedback: isTrue(params.feedback), progress: isTrue(params.progress), answers: isTrue(params.answers), vocab: isTrue(params.vocab) }
            Object.keys(projection).map(e => {
                if (projection[e]) {
                    delete projection[e]
                }
            })

            const results = await collection.find(query, { projection: projection }).toArray();

            return NextResponse.json(results[0], { status: 200 })

        }
    }
}