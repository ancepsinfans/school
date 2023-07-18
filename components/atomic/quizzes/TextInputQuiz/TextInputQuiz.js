'use client'
import React from "react";
import constants from "../../../../styles/constants";
import answerSender from '../../../../models/users/answerHelper'
import styled from "styled-components";
import TextInput from "../../inputs/TextInput";

const Question = styled.form`
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

const TextInputQuiz = ({ question, user }) => {

  const [value, setValue] = React.useState('')
  const [attempts, setAttempts] = React.useState(0)
  const [showFeedback, setShowFeedback] = React.useState(false)

  const renderFeedback = (data) => {
    if (data.toString() == question.correct.toString()) {
      return (question.good)
    } else if (data === '') {
      return ''
    } else {
      return (question.bad)
    }
  }

  return (
    <Question
      onSubmit={e => {
        e.preventDefault();
        setShowFeedback(true)
        setAttempts(attempts + 1)
        answerSender(
          'text input',
          value,
          user,
          attempts,
          question
        )
      }}
    >
      <TextInput
        style={{ backgroundColor: constants.alertYellow90 }}
        value={value}
        onChange={(e) => { setValue(e.target.value); setShowFeedback(false) }}
        label={question.desc}
      />

      <AnswerButton
        style={{ backgroundColor: constants.primaryMain }}
      >
        Check
      </AnswerButton>
      <br />
      <span>{(showFeedback ? renderFeedback(value) : null)}</span>
      <br />
    </Question>
  );
};

export default TextInputQuiz;