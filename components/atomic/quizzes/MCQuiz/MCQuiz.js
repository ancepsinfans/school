import React from "react";
import constants from '../../../../styles/constants'
import answerSender from '../../../../models/users/answerHelper'
import styled from "styled-components";
import { useImmer } from "use-immer";

const Question = styled.div`
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

const MCQuiz = ({ question, user }) => {
  const INIT = {
    color: new Array(question.options.length).fill(constants.primaryMain),
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
    <Question>
      <h2>{question.desc}</h2>
      <ol>
        {question.options.map((ans, i) => {

          return (
            <li key={`${i}_${ans}`} style={{ listStyle: 'none', width: '500px' }}>
              <AnswerButton
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
              </AnswerButton>
            </li>
          )
        })}
      </ol>
      <span>{renderFeedback(data.answer)}</span>
      <br />
    </Question>
  )
}

export default MCQuiz;

