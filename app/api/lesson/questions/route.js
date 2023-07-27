import { connectDB } from "../../../../middleware";
import Question from "../../../../models/questions/Questions";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            var question = new Question({
                desc: req.body.desc,
                options: req.body.options,
                correct: req.body.correct,
                sphere: req.body.sphere,
                good: req.body.good,
                bad: req.body.bad,
                course: req.body.course,
                lesson: req.body.lesson
            })
            var questioncreated = await question.save()
            return NextResponse.json(questioncreated, { status: 200 })

        } catch (error) {
            return NextResponse.json(error.message, { status: 500 })

        }

    } else if (req.method === 'GET') {
        const { sphere, id } = req.query

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