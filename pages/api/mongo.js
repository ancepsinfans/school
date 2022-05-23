import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://ancepsinfans:ifBfw32bCX5HKpVi@cluster0.pqdli.mongodb.net/school?retryWrites=true&w=majority");
    const db = client.db('school');
    const answers = db.collection('answers-test');

    const result = await answers.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'data transfer successful' });
  }
}