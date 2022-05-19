import React from "react";
import MCButton from '../MCButton'
import styles from '../../../styles/Question.module.css'
import uuid from 'uuid'


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

  const parentOnClick = (ans) => {
    setAnswer(ans)
    setAttempts(attempts + 1)
  }

  return (
    <div className={styles.question}>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <ol>
        {props.question[props.questionNumber].options.map((ans) => {
          return (
            <li key={uuid()} className={`${styles.questionItem}`}>
              <MCButton
                ans={ans}
                correct={props.question[props.questionNumber].correct}
                onClick={() => parentOnClick(ans)}
                name={ans}
              />
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

