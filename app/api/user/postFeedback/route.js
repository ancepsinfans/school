import { ifDocExists, connectDB } from "@/middleware";
import { StudentFeedback, StudentSchema } from "@/models/users/User";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const body = await req.json()

    const { user, answer, sphere, course, id, lesson } = body
    try {
      const feedback = new StudentFeedback({
        answer: answer,
        sphere: sphere,
        id: id,
        course: course,
        lesson: lesson,
      })

      const result = ifDocExists(user, 'feedback', feedback, StudentSchema)
      return NextResponse.json(result, { status: 200 })

    } catch (error) {

      return NextResponse.json(error.message, { status: 500 })
    }

  } else {
    return NextResponse.json('method not supported', { status: 422 })
  }
}

const wrappedHandler = connectDB(handler)

export { wrappedHandler as POST }