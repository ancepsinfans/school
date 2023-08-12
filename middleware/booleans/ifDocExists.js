
export default async function ifDocExists(user, type, update, schema) {
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
            return { status: 200 }

        } catch (error) {
            return { status: 500 }
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
            return { status: 200 }

        } catch (error) {
            return { status: 500 }
        }

    }
}