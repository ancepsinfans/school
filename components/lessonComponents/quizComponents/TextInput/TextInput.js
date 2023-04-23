import React from "react";
import constants from "../../../../styles/constants";
import answerSender from '../../../../models/users/answerHelper'
import styled from "@emotion/styled";

const Input = styled.div`
  padding: 5px 5px;
  margin: 0%;
  text-align: center;
`
const AnswerButton = styled.button`
& {
  width: 35%;
  border: 1px solid var(--blackMain);
  border-radius: 12px;
  color: var(--blackMain);
  border-radius: 5px;
  margin: 5px;
  height: 25px;
}

&:hover {
  border: none;
  width: calc(35% + 2px);
  height: calc(25px + 0px);
}
`

const TextInput = ({ questionSet, questID, user }) => {

  let activeQuestion = null

  questionSet.forEach(e => {
    if (e.id === questID) {
      activeQuestion = e
    }
  })

  const [value, setValue] = React.useState('')
  const [attempts, setAttempts] = React.useState(0)
  const [showFeedback, setShowFeedback] = React.useState(false)

  const renderFeedback = (data) => {
    if (data.toString() == activeQuestion.correct.toString()) {
      return (activeQuestion.good)
    } else if (data === '') {
      return ''
    } else {
      return (activeQuestion.bad)
    }
  }

  const parentOnClick = (val, cor, id, sphere) => {
    setShowFeedback(true)
    setAttempts(attempts + 1)
    answerSender(
      'text input',
      val,
      cor,
      user.email,
      attempts,
      id,
      sphere,
      course,
      lesson
    )
  }

  return (
    <Input>
      <h2>{activeQuestion.desc}</h2>
      <input
        style={{ backgroundColor: constants.alertYellow90 }}
        onChange={(e) => { setValue(e.target.value); setShowFeedback(false) }}

      />
      <br />
      <AnswerButton
        style={{ backgroundColor: constants.primaryMain }}
        onClick={() => parentOnClick(
          value,
          activeQuestion.correct,
          activeQuestion.id,
          activeQuestion.sphere,
          activeQuestion.course,
          activeQuestion.lesson
        )}
      >
        Check
      </AnswerButton>
      <br />
      <span>{(showFeedback ? renderFeedback(value) : null)}</span>
      <br />
    </Input>
  );
};

export default TextInput;