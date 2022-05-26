import React from "react";
import styles from '../../styles/Question.module.css'
import constants from "../../styles/constants";
import answerSender from "../../models/answer/helpers";


const TextInput = (props) => {
  const [value, setValue] = React.useState('')
  const [attempts, setAttempts] = React.useState(0)
  const [showFeedback, setShowFeedback] = React.useState(false)

  const renderFeedback = (data) => {
    if (data.toString() == props.question[props.questionNumber].correct.toString()) {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.good : 'Yes!')
    } else if (data === '') {
      return ''
    } else {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.bad : 'negatory')
    }
  }

  const parentOnClick = (val, cor) => {
    setShowFeedback(true)
    setAttempts(attempts + 1)
    answerSender(
      'text input',
      val,
      cor,
      props.user,
      attempts
    )
  }

  return (
    <div className={styles.input}>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setValue(e.target.value); setShowFeedback(false) }}

      />
      <br />
      <button
        className={styles.answerButton}
        style={{ backgroundColor: constants.accentYellow }}
        onClick={() => parentOnClick(
          value,
          props.question[props.questionNumber].correct,
        )}
      >
        Check
      </button>
      <br />
      <span>{(showFeedback ? renderFeedback(value) : null)}</span>
      <br />
      <p>attempts: {attempts}</p>
    </div>
  );
};

export default TextInput;
