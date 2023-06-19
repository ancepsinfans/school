import React from "react";
import constants from '../../../../styles/constants'
import feedbackSender from '../../../../models/users/feedbackHelper'
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";

const Question = styled.div`
  padding: 5px 5px;
  text-align: center;
  width: 100%;
`
const AnswerButton = styled.button`
& {
  width: 15%;
  border: none;
  color: var(--blackMain);
  border-radius: 5px;
  margin: 5px;
  height: 25px;
}

&:hover {

  border: 1px solid var(--blackMain);
  width: calc(15% - 2px);
}
`

const OtherButton = styled.button`
& {
  width: 15%;
  border: none;
  color: var(--blackMain);
  border-radius: 5px;
  margin: 5px;
  height: 25px;
}

&:hover {
  border: 1px solid var(--blackMain);
  width: calc(15% - 2px);
}
`

const InputField = styled.input`
& {
  width: 15%;
  border: none;
  color: var(--blackMain);
  border-radius: 5px;
  margin: 5px;
  height: 25px;
}
`

const SubmitButton = styled(AnswerButton)`
& {
  background-color: ${props => props.isSelected ? 'var(--accentBrown65)' : 'var(--alertYellow95)'};
  margin: 0 0 0 20px;
} 
`

const MCorOther = ({ options, desc, path, idNum, withOther }) => {
  const { data: session } = useSession()
  const concatID = path.join('/') + '_' + idNum

  let sphere, course, lesson
  [sphere, course, lesson] = path

  const [otherClicked, setOtherClicked] = React.useState(false)
  const [otherValue, setOtherValue] = React.useState('')
  const [isSumbitted, setIsSubmitted] = React.useState(false)
  const [response, setResponse] = React.useState([])
  const [color, setColor] = React.useState(
    () => new Array(options.length).fill(constants.primaryMain)
  )

  const colorHandler = (i) => {
    let temp_colors = [...color]
    let temp_element = { ...temp_colors[i] }
    temp_element = constants.accentBrown65
    temp_colors[i] = temp_element
    setColor(temp_colors)
  }

  const parentOnClick = (ans, i) => {
    colorHandler(i)
    setResponse(response => [...response, ans])
  }

  return (
    <Question>
      <h2>{(desc ? desc : null)}</h2>
      {!isSumbitted ?
        <ol>
          {options.map((ans, i) => {
            return (
              <li key={`${i}_${ans} `} style={{ listStyle: 'none' }}>
                <AnswerButton
                  key={i}
                  style={{ backgroundColor: color[i] }}
                  onClick={() => parentOnClick(
                    ans,
                    i
                  )}
                >
                  {ans}
                </AnswerButton>

              </li>
            )
          })}
          {withOther ?
            <li key={'other'} style={{ listStyle: 'none' }}>
              {!otherClicked ?
                <OtherButton
                  style={{ backgroundColor: constants.primaryMain }}
                  onClick={() => {
                    setOtherClicked(true)
                  }}
                >
                  other
                </OtherButton> :
                <InputField
                  style={{ backgroundColor: constants.alertYellow90 }}
                  onChange={(e) => { setOtherValue(e.target.value) }}
                />
              }
            </li> :
            null
          }
        </ol> :
        null}
      <SubmitButton
        disabled={isSumbitted}
        onClick={
          () => {
            setResponse(response => [...response, otherValue]);
            feedbackSender(
              session.user.email,
              response,
              concatID,
              sphere,
              course,
              lesson
            );
            setIsSubmitted(true);
          }
        }
        isSelected={isSumbitted}
      >
        {!isSumbitted ? 'submit' : 'thanks!'}
      </SubmitButton>
      <br />
    </Question>
  )
}

export default MCorOther;

