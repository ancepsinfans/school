import { getAllLessons } from "../../../lib/fetchAllLessons";

const handler = async (req, res) => {

    if (req.method === 'GET') {

        try {
            const fs = require('fs')
            let lessons = await getAllLessons(fs, false)
            return res.status(200).json({ success: true, data: lessons })
        } catch (error) {

            return res.status(500).send(error.message)
        }
    } else {
        res.status(422).send('method not supported')
    }
}

export default handler