import React from "react";
import MCQuiz from "../components/MC/MCQuiz/MCQuiz";
import questions from '../components/questions/test'
import TextInput from "../components/TextInput/TextInput";



const Quiz = () => {

    return (
        <>
            <h2><a href='/'>&larr; Go back</a></h2>


            {questions.map((e, idx) => {
                return (
                    <>
                        <MCQuiz
                            question={questions}
                            questionNumber={idx}
                        />
                        <TextInput
                            question={questions}
                            questionNumber={idx} />
                    </>
                )
            })}

        </>
    )
};

export default Quiz;
