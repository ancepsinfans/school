import connectMongo from "../middleware/connectMongo";
import Question from "../models/questions/Questions";

export const getServerSideProps = async () => {
    try {
        await connectMongo()

        const qs = await Question.find()

        return {
            props: {
                qs: JSON.parse(JSON.stringify(qs))
            }
        }
    } catch (error) {
        console.log(error)
        return {
            notFound: true
        }
    }
}

export default function GetQ({ qs }) {
    return (
        <ul>
            {qs.map((q) => (
                <li key={q._id}>{q.correct}</li>
            ))}
        </ul>
    )
}