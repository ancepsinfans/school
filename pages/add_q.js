import React from "react";
import constants from "../styles/constants";
import questionSender, { questionGetter } from "../models/questions/helpers";
import styles from '../styles/Question.module.css'


const AddQ = ({ qs }) => {
  const [desc, setDesc] = React.useState('')
  const [options, setOptions] = React.useState([''])
  const [correct, setCorrect] = React.useState('')
  const [good, setGood] = React.useState('')
  const [bad, setBad] = React.useState('')

  const [data, setData] = React.useState([''])

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
        onChange={(e) => { setOptions(splitter(e.target.value)) }}
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
      <div>
        {desc}
        <br />
        <ul>
          {options.map((el, i) => { return (<li key={i}>{el}</li>) })}
        </ul>
        {correct}
        <br />
        {good}
        <br />
        {bad}

      </div>
      <button onClick={() => setData(questionGetter)}>get</button>
      <h2>{data.desc ? 'd' : 'n'}</h2>
    </div>
  );
};



export default AddQ