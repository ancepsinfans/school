
export default async function ifDocExists(user, type, update, schema, res) {
    const docExists = await schema.findOne({ user: user })

    if (!!docExists) {
        try {

            let doc = await schema.findOneAndUpdate(
                { user: user },
                { upsert: true }
            )
            if (!doc[type]) {
                doc[type] = []
            }

            doc[type].push(update)
            doc.save()
            return res.status(200).send(doc)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    } else {
        try {
            const newStudent = new schema({
                user: user,
                answers: [],
                progress: [],
                feedback: [],
                vocab: []
            })

            newStudent[type].push(update)
            newStudent.save()
            return res.status(200).send(newStudent)
        } catch (error) {
            return res.status(500).send(error.message)
        }
    }
}