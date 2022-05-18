import React from "react";
import styles from '../styles/Question.module.css'
import constants from "../styles/constants";

const questions = [
    {
        desc: "How many days are in a week?",
        options: [1, 2, 3, 4, 5, 7, 8],
        correct: 7,
    },
];

const Quiz = () => {
    const [answer1, setAnswer1] = React.useState('');
    const [btnColor, setBtnColor] = React.useState(constants.accentBrown)

    const renderFeedback = (data) => {
        if (data === questions[0].correct) {
            return 'yes!'
        } else if (data === '') {
            return ''
        } else {
            return 'nopers'
        }

    }

    function clickHandler(ans) {

        if (ans === questions[0].correct) {
            setBtnColor(constants.accentBlue)
            setAnswer1(ans)
        } else {
            setBtnColor(constants.accentRed)
            setAnswer1(ans)
        }

    }

    return (
        <div className={styles.question}>
            <h2>{questions[0].desc}</h2>
            <ol>
                {questions[0].options.map(ans => {
                    return (<li className={styles.questionItem}><button id={ans} style={{ backgroundColor: btnColor }} className={styles.answerButton} onClick={() => clickHandler(ans)}>{ans}</button></li>)
                })}
            </ol>
            <p>{renderFeedback(answer1)}</p>
        </div>
    )
};

export default Quiz;
