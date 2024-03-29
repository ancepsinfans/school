import { ifDocExists, connectDB } from "@/middleware";
import { StudentAnswers, StudentSchema } from "@/models/users/User";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const body = await req.json()

    const { user, answer, correct, type, attempt, id, sphere, course, lesson } = body

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
    const result = ifDocExists(user, 'answers', quizAnswer, StudentSchema)
    return NextResponse.json(result, { status: 200 })


  } else {
    return NextResponse.json('method not supported', { status: 422 })
  }
}

const wrappedHandler = connectDB(handler)
export { wrappedHandler as POST }