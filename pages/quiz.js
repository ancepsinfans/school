import React from "react";
import styles from '../styles/Question.module.css'
import constants from "../styles/constants";
import MCButton from "../components/MC/MCButton/MCButton";


const questions = [
    {
        desc: "How many days are in a week?",
        options: [1, 2, 3, 4, 5, 7, 8],
        correct: 7,
    },
];

const Quiz = () => {
    const [answer1, setAnswer1] = React.useState('');
    const [attempts, setAttempts] = React.useState(0)

    const renderFeedback = (data) => {
        if (data === questions[0].correct) {
            return 'yes!'
        } else if (data === '') {
            return ''
        } else {
            return 'nopers'
        }

    }

    const parentOnClick = (ans) => {
        setAnswer1(ans)
        setAttempts(attempts + 1)
    }

    return (
        <div className={styles.question}>
            <h2>{questions[0].desc}</h2>
            <ol>
                {questions[0].options.map((ans) => {
                    return (
                        <li className={`${styles.questionItem}`}>
                            <MCButton
                                ans={ans}
                                correct={questions[0].correct}
                                onClick={() => parentOnClick(ans)}
                                name={ans}
                            />
                        </li>
                    )
                })}
            </ol>
            <span>{renderFeedback(answer1)}</span>
            <br />
            <p>attempts: {attempts}</p>
        </div>
    )
};

export default Quiz;
