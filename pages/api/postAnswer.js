import connectDB from "../../middleware/mongodb";
import { StudentAnswers, StudentSchema } from "../../models/users/User";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, correct, type, attempt, id, sphere } = req.body
    if (user) {
      try {
        const quizAnswer = new StudentAnswers({
          answer: answer,
          correct: correct,
          type: type,
          attempt: attempt,
          id: id,
          sphere: sphere
        })

        let doc = await StudentSchema.findOneAndUpdate(
          { user: user },
          { upsert: true }
        )

        if (!doc.answers) {
          doc.answers = []
        }

        doc.answers.push(quizAnswer)

        doc.save()

        return res.status(200).send(doc)
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