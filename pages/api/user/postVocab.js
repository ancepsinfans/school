import connectDB from "../../../middleware/mongodb";
import { StudentSchema, StudentVocab } from "../../../models/users/User";
import ifDocExists from "../../../middleware/ifDocExists";

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
        return result

    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)