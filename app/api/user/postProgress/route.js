import { ifDocExists, connectDB } from "../../../../middleware";
import { StudentSchema, StudentProgress } from "../../../../models/users/User";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const body = await req.json()
        const { user, location } = body

        const progressUpdate = new StudentProgress({
            sphere: location.sphere,
            course: location.course,
            lesson: location.lesson
        })
        const result = ifDocExists(user, 'progress', progressUpdate, StudentSchema, res)
        return NextResponse.json(result, { status: 200 })

    } else {
        return NextResponse.json('method not supported', { status: 422 })

    }
}

const wrappedHandler = connectDB(handler)

export { wrappedHandler as POST }