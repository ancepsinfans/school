import React from "react";
import styles from '../../styles/Question.module.css'
import constants from '../../styles/constants'
import answerSender from "../../models/answer/helpers";

const MCQuiz = (props) => {

  const [answer, setAnswer] = React.useState('');
  const [attempts, setAttempts] = React.useState(0)
  const [color, setColor] = React.useState(
    () => new Array(props.question[props.questionNumber].options.length).fill(constants.accentBrown)
  )

  const renderFeedback = (data) => {
    if (data === props.question[props.questionNumber].correct) {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.good : 'Yes!')
    } else if (data === '') {
      return ''
    } else {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.bad : 'negatory')
    }
  }

  const colorHandler = (ans, corr, i) => {
    let temp_colors = [...color]
    let temp_element = { ...temp_colors[i] }
    temp_element = ans === corr ? constants.accentBlue : constants.accentRed
    temp_colors[i] = temp_element
    setColor(temp_colors)
  }

  const parentOnClick = (ans, correct, i) => {
    setAnswer(ans)
    setAttempts(attempts + 1)
    colorHandler(ans, correct, i)
    answerSender(
      'mc quiz',
      ans,
      correct,
      props.user,
      attempts + 1
    )
  }

  return (
    <div className={styles.question}>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <ol>
        {props.question[props.questionNumber].options.map((ans, i) => {


          return (
            <li key={`${i}_${ans}`} className={styles.questionItem}>
              <button
                key={i}
                className={styles.answerButton}
                style={{ backgroundColor: color[i] }}
                onClick={() => parentOnClick(ans, props.question[props.questionNumber].correct, i)}
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

