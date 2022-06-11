import connectDB from "../../middleware/mongodb";
import { StudentSchema, StudentProgress } from "../../models/users/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, sphere, page } = req.body

        if (user) {
            try {
                const progressUpdate = new StudentProgress({
                    sphere: sphere,
                    page: page
                })
                const doc = await StudentSchema.findOneAndUpdate(
                    { user: user },
                    { $push: { progress: progressUpdate } },
                    { upsert: true }
                )
                console.log(doc)
                doc.save()



                return res.status(200).send(doc)
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