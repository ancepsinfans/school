import connectDB from "../../../middleware/mongodb";
import { StudentFeedback, StudentSchema } from "../../../models/users/User";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, id, sphere, course, lesson } = req.body
    if (user) {
      try {
        const feedback = new StudentFeedback({
          answer: answer,
          id: id,
          sphere: sphere,
          course: course,
          lesson: lesson,
        })

        let doc = await StudentSchema.findOneAndUpdate(
          { user: user },
          { upsert: true }
        )

        if (!doc.feedback) {
          doc.feedback = []
        }

        doc.feedback.push(feedback)

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