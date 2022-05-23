import React from "react";
import styles from '../../styles/Question.module.css'
import constants from "../../styles/constants";

const TextInput = (props) => {
  const [value, setValue] = React.useState('')
  const [attempts, setAttempts] = React.useState(0)
  const [showFeedback, setShowFeedback] = React.useState(false)

  async function answerSender(data) {
    const response = await fetch('/api/mongo', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {
        "Content-Type":
          "application/json",
      },
    })
    alert('?')
  }

  const renderFeedback = (data) => {
    if (data.toString() == props.question[props.questionNumber].correct.toString()) {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.good : 'Yes!')
    } else if (data === '') {
      return ''
    } else {
      return (props.question[props.questionNumber].hasOwnProperty('feedback') ? props.question[props.questionNumber].feedback.bad : 'negatory')
    }
  }

  const parentOnClick = (ans) => {
    setShowFeedback(true)
    setAttempts(attempts + 1)
    answerSender(ans)
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
        style={{ backgroundColor: constants.accentBrown }}
        onClick={() => parentOnClick(value)}
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
