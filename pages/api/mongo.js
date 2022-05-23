import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db('school')
    const answers = db.collection('answers-test')

    const result = await answers.insertOne(data)
    console.log(result)
    client.close()
  }
}