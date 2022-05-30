import Link from "next/link";
import React from "react";
import MCQuiz from "../components/MCQuiz";
import TextInput from "../components/TextInput";
import { useUser } from '@auth0/nextjs-auth0'
import connectMongo from "../middleware/connectMongo";
import Question from "../models/questions/Questions";
import NavBarController from '../components/NavBar'


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
const Quiz = ({ qs }) => {
    const { user } = useUser()
    return (
        <>
            <NavBarController type={'other'} />


            <div>

                {qs.map((e, idx) => {
                    return (
                        <div key={`${idx}_${e}`}>
                            <MCQuiz
                                user={user ? user.name : 'unregistered'}
                                question={qs}
                                questionNumber={idx}
                            />
                            <TextInput
                                user={user ? user.name : 'unregistered'}
                                question={qs}
                                questionNumber={idx} />
                        </div>
                    )
                })}

            </div>
        </>
    )
};

export default Quiz;
