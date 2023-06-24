import connectDB from "../../../middleware/mongodb";
import { StudentSchema, StudentProgress } from "../../../models/users/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, sphere, course, lesson } = req.body

        const docExists = await StudentSchema.findOne({ user: user })
        const progressUpdate = new StudentProgress({
            sphere: sphere,
            course: course,
            lesson: lesson
        })

        if (!!docExists) {
            try {

                let doc = await StudentSchema.findOneAndUpdate(
                    { user: user },
                    { upsert: true }
                )
                if (!doc.progress) {
                    doc.progress = []
                }

                doc.progress.push(progressUpdate)

                doc.save()
                return res.status(200).send(doc)
            } catch (error) {
                return res.status(500).send(error.message)
            }
        } else if (!docExists) {
            try {
                const newStudent = new StudentSchema({
                    user: user,
                    answers: [],
                    progress: [],
                    feedback: []
                })

                newStudent.progress.push(progressUpdate)
                newStudent.save()
                return res.status(200).send(newStudent)

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