import React from "react";
import constants from '../../styles/constants'
import answerSender from "../../models/users/answerHelper";
import styled from "@emotion/styled";

const Question = styled.div`
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

const MCQuiz = ({ questionSet, questID, user }) => {

  let activeQuestion = null

  questionSet.forEach(e => {
    if (e.id === questID) {
      activeQuestion = e
    }
  })

  const [answer, setAnswer] = React.useState('');
  const [attempts, setAttempts] = React.useState(0)
  const [color, setColor] = React.useState(
    () => new Array(activeQuestion.options.length).fill(constants.primaryMain)
  )

  const renderFeedback = (data) => {
    if (data === activeQuestion.correct) {
      return (activeQuestion.good)
    } else if (data === '') {
      return ''
    } else {
      return (activeQuestion.bad)
    }
  }

  const colorHandler = (ans, corr, i) => {
    let temp_colors = [...color]
    let temp_element = { ...temp_colors[i] }
    temp_element = ans === corr ? constants.alertGreenMain : constants.alertRedMain
    temp_colors[i] = temp_element
    setColor(temp_colors)
  }

  const parentOnClick = (ans, correct, id, sphere, i) => {
    setAnswer(ans)
    setAttempts(attempts + 1)
    colorHandler(ans, correct, i)
    answerSender(
      'mc quiz',
      ans,
      correct,
      user.email,
      attempts,
      id,
      sphere
    )
  }

  return (
    <Question>
      <h2>{activeQuestion.desc}</h2>
      <ol>
        {activeQuestion.options.map((ans, i) => {


          return (
            <li key={`${i}_${ans}`} style={{ listStyle: 'none', width: '500px' }}>
              <AnswerButton
                key={i}
                style={{ backgroundColor: color[i] }}
                onClick={() => parentOnClick(
                  ans,
                  activeQuestion.correct,
                  activeQuestion.id,
                  activeQuestion.sphere,
                  i
                )}
              >
                {ans}
              </AnswerButton>
            </li>
          )
        })}
      </ol>
      <span>{renderFeedback(answer)}</span>
      <br />
    </Question>
  )
}

export default MCQuiz;

