import React from "react";
import styles from '../../../styles/Question.module.css'
import uuid from 'react-uuid'
import constants from "../../../styles/constants";


const MCQuiz = (props) => {
  const [answer, setAnswer] = React.useState('');
  const [attempts, setAttempts] = React.useState(0)

  const renderFeedback = (data) => {
    if (data === props.question[props.questionNumber].correct) {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.good : 'Yes!')
    } else if (data === '') {
      return ''
    } else {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.bad : 'negatory')
    }
  }



  return (
    <div className={styles.question}>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <ol>
        {props.question[props.questionNumber].options.map((ans) => {
          const [color, setColor] = React.useState(constants.accentBrown)
          const parentOnClick = (ans, correct) => {
            setAnswer(ans)
            setAttempts(attempts + 1)
            ans === correct ? setColor(constants.accentBlue) : setColor(constants.accentRed)
          }
          return (
            <li key={uuid()} className={styles.questionItem}>
              <button
                className={styles.answerButton}
                style={{ backgroundColor: color }}
                onClick={() => parentOnClick(ans, props.question[props.questionNumber].correct)}
              >
                {ans}
              </button>
            </li>
          )
        })}
      </ol>
      <span>{renderFeedback(answer)}</span>
      <br />
      <p>attempts: {attempts}</p>
    </div>
  )
}

export default MCQuiz;

