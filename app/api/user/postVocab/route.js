import { ifDocExists, connectDB } from "../../../../middleware";
import { StudentSchema, StudentVocab } from "../../../../models/users/User";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, term, sphere, course, lesson } = req.body

        const vocabUpdate = new StudentVocab({
            sphere: sphere,
            course: course,
            lesson: lesson,
            term: term
        })
        const result = ifDocExists(user, 'vocab', vocabUpdate, StudentSchema, res)
        return NextResponse.json(result, { status: 200 })

    } else {
        return NextResponse.json('method not supported', { status: 422 })
    }
}

const wrappedHandler = connectDB(handler)

export { wrappedHandler as POST }