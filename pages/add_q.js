import React from "react";
import constants from "../styles/constants";
import questionSender from "../models/questions/helpers";
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

const AddQ = () => {


  const [desc, setDesc] = React.useState('')
  const [options, setOptions] = React.useState([''])
  const [correct, setCorrect] = React.useState('')
  const [good, setGood] = React.useState('')
  const [bad, setBad] = React.useState('')
  const [sphere, setSphere] = React.useState('')
  const [course, setCourse] = React.useState('')
  const [lesson, setLesson] = React.useState('')
  const [id, setId] = React.useState('')

  const [isSuccess, setIsSuccess] = React.useState(false)

  const splitter = (data) => {
    return data.split(', ')
  }

  const clearAll = () => {
    setDesc('')
    setOptions([''])
    setCorrect('')
    setGood('')
    setBad('')
    setSphere('')
    setIsSuccess(true)
  }

  return (
    <Input>
      <h4>Description</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setDesc(e.target.value); setIsSuccess(false) }}
      />
      <h4>options</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setOptions(splitter(e.target.value)); setIsSuccess(false) }}
      />
      <h4>correct</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setCorrect(e.target.value); setIsSuccess(false) }}
      />
      <h4>sphere</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setSphere(e.target.value); setIsSuccess(false) }}
      />
      <h4>course</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setCourse(e.target.value); setIsSuccess(false) }}
      />
      <h4>lesson</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setLesson(e.target.value); setIsSuccess(false) }}
      />
      <h4>id</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setId(e.target.value); setIsSuccess(false) }}
      />
      <h4>good</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setGood(e.target.value); setIsSuccess(false) }}
      />
      <h4>bad</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setBad(e.target.value); setIsSuccess(false) }}
      />
      <br />
      <AnswerButton
        style={{ backgroundColor: constants.accentPurple85 }}
        onClick={() => {
          questionSender(
            desc,
            options,
            correct,
            sphere,
            course,
            lesson,
            id,
            good,
            bad
          );
          clearAll()
        }}
      >
        submit
      </AnswerButton>
      <div>
        {isSuccess ? "Done!" : null}
        <br />
        {desc}
        <br />
        <ul>
          {options.map((el, i) => { return (<li key={i}>{el}</li>) })}
        </ul>
        {correct}
        <br />
        {sphere}
        <br />
        {good}
        <br />
        {bad}


      </div>

    </Input>
  );
};






export default AddQ