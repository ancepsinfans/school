import Link from "next/link";
import React from "react";
import MCQuiz from "../components/MC/MCQuiz/MCQuiz";
import questions from '../components/questions/test'
import TextInput from "../components/TextInput/TextInput";
import { useUser } from '@auth0/nextjs-auth0'


const Quiz = () => {
    const { user } = useUser()
    return (
        <>
            <h2><Link href='/'>&larr; Go back</Link></h2>


            {questions.map((e, idx) => {
                return (
                    <div key={`${idx}_${e}`}>
                        <MCQuiz
                            user={user ? user.name : 'unregistered'}
                            question={questions}
                            questionNumber={idx}
                        />
                        <TextInput
                            user={user ? user.name : 'unregistered'}
                            question={questions}
                            questionNumber={idx} />
                    </div>
                )
            })}

        </>
    )
};

export default Quiz;
