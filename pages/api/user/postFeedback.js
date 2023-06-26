import { ifDocExists, connectDB } from "../../../middleware";
import { StudentFeedback, StudentSchema } from "../../../models/users/User";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, sphere, course, id, lesson } = req.body
    try {
      const feedback = new StudentFeedback({
        answer: answer,
        sphere: sphere,
        id: id,
        course: course,
        lesson: lesson,
      })

      const result = ifDocExists(user, 'feedback', feedback, StudentSchema, res)
      return result

    } catch (error) {
      return res.status(500).send(error.message)
    }

  } else {
    res.status(422).send('method not supported')
  }
}

export default connectDB(handler)