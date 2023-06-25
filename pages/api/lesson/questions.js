import connectDB from "../../../middleware/mongodb";
import Question from "../../../models/questions/Questions";

import { ObjectId } from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            var question = new Question({
                desc: req.body.desc,
                options: req.body.options,
                correct: req.body.correct,
                sphere: req.body.sphere,
                good: req.body.good,
                bad: req.body.bad,
                course: req.body.course,
                lesson: req.body.lesson
            })
            var questioncreated = await question.save()
            return res.status(200).send(questioncreated)
        } catch (error) {
            return res.status(500).send(error.message)
        }

    } else if (req.method === 'GET') {
        const {
            query: { sphere, id },
        } = req
        try {

            let qs
            if (sphere && id) {
                qs = await Question.find({ sphere: sphere, _id: new ObjectId(id) })
            } else if (!sphere && !id) {
                qs = await Question.find({})
            } else if (!id) {
                qs = await Question.find({ sphere: sphere })
            } else {
                qs = await Question.find({ _id: new ObjectId(id) })
            }
            return res.status(200).json({ success: true, data: qs })
        } catch (error) {

            return res.status(500).send(error.message)
        }
    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)