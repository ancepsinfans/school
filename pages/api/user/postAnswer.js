import ifDocExists from "../../../middleware/ifDocExists";
import connectDB from "../../../middleware/mongodb";
import { StudentAnswers, StudentSchema } from "../../../models/users/User";
ifDocExists

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { user, answer, correct, type, attempt, id, sphere, course, lesson } = req.body

    const quizAnswer = new StudentAnswers({
      answer: answer,
      correct: correct,
      type: type,
      attempt: attempt,
      id: id,
      sphere: sphere,
      course: course,
      lesson: lesson
    })

    const result = ifDocExists(user, 'answers', quizAnswer, StudentSchema, res)
    return result


  } else {
    res.status(422).send('method not supported')
  }
}

export default connectDB(handler)