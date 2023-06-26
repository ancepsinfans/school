import { ifDocExists, connectDB } from "../../../middleware";
import { StudentSchema, StudentProgress } from "../../../models/users/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, location } = req.body
        const progressUpdate = new StudentProgress({
            sphere: location.sphere,
            course: location.course,
            lesson: location.lesson
        })
        const result = ifDocExists(user, 'progress', progressUpdate, StudentSchema, res)
        return result

    } else {
        res.status(422).send('method not supported')
    }
}

export default connectDB(handler)