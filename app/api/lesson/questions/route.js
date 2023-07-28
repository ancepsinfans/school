import { connectDB } from "../../../../middleware";
import Question from "../../../../models/questions/Questions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const body = await req.json()

        try {
            var question = new Question({
                desc: body.desc,
                options: body.options,
                correct: body.correct,
                sphere: body.sphere,
                good: body.good,
                bad: body.bad,
                course: body.course,
                lesson: body.lesson
            })
            var questioncreated = await question.save()
            return NextResponse.json(questioncreated, { status: 200 })

        } catch (error) {
            return NextResponse.json(error.message, { status: 500 })

        }

    } else if (req.method === 'GET') {
        const { searchParams } = new URL(req.url);
        const params = Object.fromEntries(searchParams);
        const { sphere, id } = params

        try {

            let qs
            if (sphere && id) {
                qs = await Question.find({ sphere: sphere, _id: new ObjectId(id) })
            } else if (!sphere && !id) {
                qs = await Question.find({})
            } else if (!id) {
                qs = await Question.find({ sphere: sphere })
            } else {
                qs = await Question.find({ _id: new ObjectId(id) })
            }
            return NextResponse.json({ success: true, data: qs }, { status: 200 })
        } catch (error) {
            return NextResponse.json(error.message, { status: 500 })
        }
    } else {
        return NextResponse.json('method not supported', { status: 422 })
    }
}
const wrappedHandler = connectDB(handler)
export { wrappedHandler as POST, wrappedHandler as GET }