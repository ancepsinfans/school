import connectDB from "../../middleware/mongodb";
import StudentProgress from "../../models/progress/Progress";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, sphere, page } = req.body
        if (user) {
            try {
                var studentProgress = new StudentProgress({
                    user,
                    sphere,
                    page,
                })

                var progresscreated = await studentProgress.save()
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