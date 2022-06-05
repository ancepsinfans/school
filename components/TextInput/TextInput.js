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
      return (props.question[props.questionNumber].good)
    } else if (data === '') {
      return ''
    } else {
      return (props.question[props.questionNumber].bad)
    }
  }

  const parentOnClick = (val, cor, id, sphere) => {
    setShowFeedback(true)
    setAttempts(attempts + 1)
    answerSender(
      'text input',
      val,
      cor,
      props.user,
      attempts,
      id, sphere
    )
  }

  return (
    <div className={styles.input}>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <input
        style={{ backgroundColor: constants.alertYellow90 }}
        onChange={(e) => { setValue(e.target.value); setShowFeedback(false) }}

      />
      <br />
      <button
        className={styles.answerButton}
        style={{ backgroundColor: constants.primaryMain }}
        onClick={() => parentOnClick(
          value,
          props.question[props.questionNumber].correct,
          props.question[props.questionNumber].id,
          props.question[props.questionNumber].sphere
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
