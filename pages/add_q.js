import React from "react";
import constants from "../styles/constants";
import questionSender from "../models/questions/helpers";
import styles from '../styles/Question.module.css'

const AddQ = () => {


  const [desc, setDesc] = React.useState('')
  const [options, setOptions] = React.useState([''])
  const [correct, setCorrect] = React.useState('')
  const [good, setGood] = React.useState('')
  const [bad, setBad] = React.useState('')
  const [sphere, setSphere] = React.useState('')
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
    <div className={styles.input}>
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
      <button
        className={styles.answerButton}
        style={{ backgroundColor: constants.accentBrown }}
        onClick={() => {
          questionSender(
            desc,
            options,
            correct,
            sphere,
            good,
            bad
          );
          clearAll()
        }}
      >
        submit
      </button>
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

    </div>
  );
};






export default AddQ