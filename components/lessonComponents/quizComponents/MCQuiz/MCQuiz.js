import React from "react";
import constants from '../../../../styles/constants'
import answerSender from '../../../../models/users/answerHelper'
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

const MCQuiz = ({ question, user }) => {

  const [answer, setAnswer] = React.useState('');
  const [attempts, setAttempts] = React.useState(0)
  const [color, setColor] = React.useState(
    () => new Array(question.options.length).fill(constants.primaryMain)
  )

  const renderFeedback = (data) => {
    if (data === question.correct) {
      return (question.good)
    } else if (data === '') {
      return ''
    } else {
      return (question.bad)
    }
  }

  const colorHandler = (ans, corr, i) => {
    let temp_colors = [...color]
    let temp_element = { ...temp_colors[i] }
    temp_element = ans === corr ? constants.alertGreenMain : constants.alertRedMain
    temp_colors[i] = temp_element
    setColor(temp_colors)
  }

  const parentOnClick = (ans, correct, id, sphere, course, lesson, i) => {
    setAnswer(ans)
    setAttempts(attempts + 1)
    colorHandler(ans, correct, i)
    answerSender(
      'mc quiz',
      ans,
      correct,
      user,
      attempts,
      id,
      sphere,
      course,
      lesson
    )
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
                style={{ backgroundColor: color[i] }}
                onClick={() => parentOnClick(
                  ans,
                  question.correct,
                  question.id,
                  question.sphere,
                  question.course,
                  question.lesson,
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

