import mongoose from "mongoose";
import connectDB from "../../middleware/mongodb";
import Question from "../../models/questions/Questions";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { desc, options, correct, good, bad } = req.body
        if (desc && options && correct) {
            try {
                var question = new Question({
                    desc,
                    options,
                    correct,
                    good,
                    bad
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
        const question = mongoose.model('Question', Question)
        await question.find()
    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)