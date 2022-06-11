import connectDB from "../../middleware/mongodb";
import StudentProgress from "../../models/progress/Progress";
import StudentSchema from "../../models/users/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, sphere, page } = req.body
        const filter = { user: user }
        if (user) {
            try {
                var studentSchema = new StudentSchema({
                    user: user,
                    progress: [{
                        sphere: sphere,
                        page: page,
                    }]
                })

                var progresscreated = await studentProgress.findOneAndUpdate(
                    filter,
                    studentSchema,
                    {
                        new: true,
                        upsert: true,
                    })
                return res.status(200).send(progresscreated)
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