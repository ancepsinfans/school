import React from "react";
import constants from '../../../../styles/constants'
import feedbackSender from '../../../../models/users/feedbackHelper'
import styled from "styled-components";
import { useImmer } from "use-immer";

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
const InputDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
`

const InputField = styled.input`
& {
  width: 11%;
  border: none;
  color: var(--blackMain);
  border-radius: 5px;
  height: 25px;
  margin-right: 1%;
}
`

const Check = styled.button`
  width: 3%;
  border: none;
  color: var(--blackMain);
  border-radius: 5px;
  height: 25px;
`

const SubmitButton = styled(AnswerButton)`
& {
  background-color: ${props => props.isSelected ? 'var(--accentBrown65)' : 'var(--alertYellow95)'};
  width: 15%;
  margin: 5px;
} 
`

const MCorOther = ({ user, options, desc, path, id, withOther }) => {
  const INIT = {
    otherClicked: false,
    otherValue: '',
    isSumbitted: false,
    response: [],
    color: new Array(options.length).fill(constants.primaryMain)
  }
  const [data, updateData] = useImmer(INIT)
  const concatID = path.join('/') + '_' + id

  return (
    <Question>
      <h2>{(desc ? desc : null)}</h2>
      {!data.isSumbitted ?
        <ol>
          {options.map((ans, i) => {
            return (
              <li key={`${i}_${ans} `} style={{ listStyle: 'none' }}>
                <AnswerButton
                  key={i}
                  style={{ backgroundColor: data.color[i] }}
                  onClick={() => {
                    updateData((draft) => {
                      draft.response = [...data.response, ans]
                      draft.color[i] = constants.accentBrown65
                    })
                  }}
                >
                  {ans}
                </AnswerButton>

              </li>
            )
          })}
          {withOther ?
            <li key={'other'} style={{ listStyle: 'none' }}>
              {!data.otherClicked ?
                <OtherButton
                  style={{ backgroundColor: constants.primaryMain }}
                  onClick={() => {
                    updateData((draft) => { draft.otherClicked = true })
                  }}
                >
                  other
                </OtherButton> :
                <InputDiv>
                  <InputField
                    style={{ backgroundColor: constants.alertYellow90 }}
                    onChange={(e) => { updateData((draft) => { draft.otherValue = e.target.value }) }}
                  />
                  <Check
                    onClick={() => {
                      updateData((draft) => { draft.response.push(data.otherValue) })
                    }}
                  >✔️</Check>
                </InputDiv>
              }
            </li> :
            null
          }

        </ol> :
        null
      }
      <ol>
        <li style={{ listStyle: 'none', }}>
          <SubmitButton
            disabled={data.isSumbitted}
            onClick={
              () => {
                updateData((draft) => {
                  draft.isSumbitted = true
                })
                feedbackSender(
                  user,
                  data.response,
                  concatID,
                  path
                );
              }
            }
            isSelected={data.isSumbitted}
          >
            {!data.isSumbitted ? 'Submit' : 'thanks!'}
          </SubmitButton>
        </li>
      </ol>
    </Question >
  )
}

export default MCorOther;

