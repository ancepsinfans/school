'use client'
import React from "react";
import constants from '@/styles/constants'
import answerSender from '@/models/users/answerHelper'
import { useImmer } from "use-immer";
import styles from './MCQuiz.module.css'


const MCQuiz = ({ question, user }) => {
  const INIT = {
    color: new Array(question.options.length).fill(constants.blueLight),
    answer: '',
    attempts: 0
  }
  const [data, updateData] = useImmer(INIT)

  const renderFeedback = (data) => {
    if (data === question.correct) {
      return (question.good)
    } else if (data === '') {
      return ''
    } else {
      return (question.bad)
    }
  }


  return (
    <div className={styles.question}>
      <h2>{question.desc}</h2>
      <ol>
        {question.options.map((ans, i) => {

          return (
            <li key={`${i}_${ans}`} style={{ listStyle: 'none', width: '500px' }}>
              <button className={styles.answer}
                key={i}
                style={{ backgroundColor: data.color[i] }}
                onClick={() => {
                  updateData((draft) => {
                    draft.answer = ans
                    draft.attempts += 1;
                    draft.color[i] = ans === question.correct ? constants.alertGreenMain : constants.alertRedMain
                  })
                  answerSender(
                    'mc quiz',
                    ans,
                    user,
                    data.attempts,
                    question
                  )
                }}
              >
                {ans}
              </button>
            </li>
          )
        })}
      </ol>
      <span>{renderFeedback(data.answer)}</span>
      <br />
    </div>
  )
}

export default MCQuiz;

