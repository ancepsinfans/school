import React from "react";
import constants from "../styles/constants";
import questionSender from "../models/questions/helpers";
import styles from '../styles/Question.module.css'

const addQ = () => {
  const [desc, setDesc] = React.useState('')
  const [options, setOptions] = React.useState([''])
  const [correct, setCorrect] = React.useState('')
  const [good, setGood] = React.useState('')
  const [bad, setBad] = React.useState('')


  return (
    <div className={styles.input}>
      <h4>Description</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setDesc(e.target.value) }}
      />
      <h4>options</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setOptions(e.target.value) }}
      />
      <h4>correct</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setCorrect(e.target.value) }}
      />
      <h4>good</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setGood(e.target.value) }}
      />
      <h4>bad</h4>
      <input
        style={{ backgroundColor: constants.accentWhite }}
        onChange={(e) => { setBad(e.target.value) }}
      />
      <br />
      <button
        className={styles.answerButton}
        style={{ backgroundColor: constants.accentBrown }}
        onClick={() => questionSender(
          desc,
          options,
          correct,
          good,
          bad
        )}
      >
        submit
      </button>
      <p>
        {desc}
        <br />
        {options}
        <br />
        {correct}
        <br />
        {good}
        <br />
        {bad}

      </p>
    </div>
  );
};

export default addQ