'use client'
import React from "react";
import constants from "@/styles/constants";
import answerSender from '@/models/users/answerHelper'
import { TextInput } from '@/components/atomic'
import styles from './TextInputQuiz.module.css'

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
    <form className={styles.question}
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

      <button className={styles.answer}
        style={{ backgroundColor: constants.blueLight }}
      >
        Check
      </button>
      <br />
      <span>{(showFeedback ? renderFeedback(value) : null)}</span>
      <br />
    </form>
  );
};

export default TextInputQuiz;