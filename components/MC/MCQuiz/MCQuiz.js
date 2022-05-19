import React from "react";
import MCButton from '../MCButton'
import styles from '../../../styles/Question.module.css'


const MCQuiz = (props) => {
  const [answer1, setAnswer1] = React.useState('');
  const [attempts, setAttempts] = React.useState(0)

  const renderFeedback = (data) => {
    if (data === props.question[props.questionNumber - 1].correct) {
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
      <h2>{props.question[props.questionNumber - 1].desc}</h2>
      <ol>
        {props.question[props.questionNumber - 1].options.map((ans) => {
          return (
            <li className={`${styles.questionItem}`}>
              <MCButton
                ans={ans}
                correct={props.question[props.questionNumber - 1].correct}
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
}

export default MCQuiz;

