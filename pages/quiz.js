import React from "react";
import MCQuiz from "../components/MC/MCQuiz/MCQuiz";
import questions from '../components/questions/test'



const Quiz = () => {

    return (
        <>
            {questions.map((e, idx) => {
                return (
                    <MCQuiz
                        question={questions}
                        questionNumber={idx + 1}
                    />
                )
            })}
        </>
    )
};

export default Quiz;
