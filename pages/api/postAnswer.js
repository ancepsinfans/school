import connectDB from "../../middleware/mongodb";
import QuizAnswer from "../../models/answer/quizAnswer";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, correct, type, attempt } = req.body
    if (user && answer && correct) {
      try {
        var quizAnswer = new QuizAnswer({
          user,
          answer,
          correct,
          type,
          attempt
        })

        var answercreated = await quizAnswer.save()
        return res.status(200).send(answercreated)
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