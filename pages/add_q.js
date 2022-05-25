import React from "react";
import constants from "../styles/constants";
import questionSender from "../models/questions/helpers";
import styles from '../styles/Question.module.css'
import axios from "axios";


const AddQ = ({ qs }) => {


  const [desc, setDesc] = React.useState('')
  const [options, setOptions] = React.useState([''])
  const [correct, setCorrect] = React.useState('')
  const [good, setGood] = React.useState('')
  const [bad, setBad] = React.useState('')


  const splitter = (data) => {
    return data.split(', ')
  }



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

    </div>
  );
};


export const getServerSideProps = async () => {
  try {
    const res = await axios.get('/api/questions')

    return {
      props: {
        qs: res.data,
      },
    }
  } catch (error) {
    console.log(error)
  }
}

export default AddQ