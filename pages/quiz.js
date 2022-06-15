import React from "react";
import MCQuiz from "../components/MCQuiz";
import TextInput from "../components/TextInput";
import { useUser } from '@auth0/nextjs-auth0'
import connectMongo from "../middleware/connectMongo";
import Question from "../models/questions/Questions";
import MainContainer from "../components/MainContainer";
import useQuestion from "../lib/fetchQuestion";


export const getStaticProps = async () => {
    try {
        await connectMongo()

        const qs = await Question.find({})

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


const Quiz = ({ qs }) => {
    const { user } = useUser()

    return (
        <MainContainer
            titleText='Quiz Sandbox'
            noFlex={true}
        >
            {qs.map((e, idx) => {
                return (
                    <div key={`${idx}_${e}`}>
                        <MCQuiz
                            user={user ? user.email : 'unregistered'}
                            question={qs}
                            questionNumber={idx}
                        />
                        <TextInput
                            user={user ? user.email : 'unregistered'}
                            question={qs}
                            questionNumber={idx} />
                    </div>
                )
            })}
        </MainContainer>
    )
};

export default Quiz;
