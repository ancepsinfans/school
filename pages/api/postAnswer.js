import connectDB from "../../middleware/mongodb";
import Answer from "../../models/answer/Answer";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, ans, correct, type, attempt } = req.body
    if (user && ans && correct) {
      try {
        var answer = new Answer({
          user,
          ans,
          correct,
          type,
          attempt
        })

        var answercreated = await answer.save()
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