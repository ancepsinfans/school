import connectDB from "../../middleware/mongodb";
import StudentSchema from "../../models/users/User";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { user, sphere, page } = req.body

        if (user) {
            try {
                var progressUpdate = {
                    sphere: sphere,
                    page: page,
                    timestamp: Date.now
                }
                const progresscreated = await StudentSchema.findOneAndUpdate(
                    { user: user },
                    { $push: { progress: progressUpdate } },
                    {
                        upsert: true,
                        new: false,
                    }
                )
                console.log('does this print?')
                console.log(ddd)
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