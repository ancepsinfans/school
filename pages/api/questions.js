import connectDB from "../../middleware/mongodb";
import Question from "../../models/questions/Questions";
import dbConnect from "../../middleware/dbConnect";

export default async function handler(req, res) {
    await dbConnect()
    switch (req.method) {
        case 'GET':
            try {
                const qs = await Question.find({})
                res.status(200).json({ data: qs })
            }
            catch (error) {
                res.status(400).send('oops')
            }
            break
        case 'POST':
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
                res.status(400).send('nope')
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }

}

