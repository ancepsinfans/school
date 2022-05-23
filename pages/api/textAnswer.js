import connectDB from "../../middleware/mongodb";
import TextAnswer from "../../models/textAnswer";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, correct } = req.body
    if (user && answer && correct) {
      try {
        var textAnswer = new TextAnswer({
          user,
          answer,
          correct
        })

        var answercreated = await textAnswer.save()
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