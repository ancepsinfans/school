import mongoose from "mongoose";
import connectDB from "../../middleware/mongodb";
import Question from "../../models/questions/Questions";
import connectMongo from '../../middleware/connectMongo'

const handler = async (req, res) => {


    if (req.method === 'POST') {
        const { desc, options, correct, good, bad, id, sphere } = req.body
        if (desc && options && correct) {
            try {
                var question = new Question({
                    desc: desc,
                    options: options,
                    correct: correct,
                    sphere: sphere,
                    id: id,
                    good: good,
                    bad: bad
                })

                var questioncreated = await question.save()
                return res.status(200).send(questioncreated)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        } else {
            res.status(422).send('data_incomplete')
        }
    } else if (req.method === 'GET') {
        const {
            query: { sphere, id },
        } = req
        try {
            await connectMongo()
            const qs = await Question.find({ sphere: sphere, id: id })

            return res.status(200).json({ success: true, data: qs })
        } catch (error) {

            return res.status(500).send(error.message)
        }
    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)