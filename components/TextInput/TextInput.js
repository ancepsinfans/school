import React from "react";
import constants from "../../styles/constants";
import answerSender from "../../models/answer/helpers";
import styled from "@emotion/styled";

const Input = styled.div`
    padding: 5px 5px;
    margin: 0%;
    text-align: center;
`
const AnswerButton = styled.button`
& {
    width: 15%;
    border: 1px solid var(--blackMain);
    border-radius: 12px;
    color: var(--blackMain);
    border-radius: 5px;
    margin: 5px;
    height: 25px;
}

&:hover {
    border: none;
    width: calc(15% + 2px);
    height: calc(25px + 0px);
}
`

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
    <Input>
      <h2>{props.question[props.questionNumber].desc}</h2>
      <input
        style={{ backgroundColor: constants.alertYellow90 }}
        onChange={(e) => { setValue(e.target.value); setShowFeedback(false) }}

      />
      <br />
      <AnswerButton
        style={{ backgroundColor: constants.primaryMain }}
        onClick={() => parentOnClick(
          value,
          props.question[props.questionNumber].correct,
          props.question[props.questionNumber].id,
          props.question[props.questionNumber].sphere
        )}
      >
        Check
      </AnswerButton>
      <br />
      <span>{(showFeedback ? renderFeedback(value) : null)}</span>
      <br />
      <p>attempts: {attempts}</p>
    </Input>
  );
};

export default TextInput;
