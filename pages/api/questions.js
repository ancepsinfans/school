import mongoose from "mongoose";
import connectDB from "../../middleware/mongodb";
import Question from "../../models/questions/Questions";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { desc, options, correct, good, bad, sphere } = req.body
        if (desc && options && correct) {
            try {
                var question = new Question({
                    desc: desc,
                    options: options,
                    correct: correct,
                    sphere: sphere,
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
    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)