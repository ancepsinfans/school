import React from "react";
import constants from "../styles/constants";
import questionSender from "../models/questions/helpers";
import styles from '../styles/Question.module.css'
import Question from "../models/questions/Questions";
import connectDB from "../middleware/mongodb";

const AddQ = ({ qs }) => {
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
      <div>
        {qs.map((q) => {
          return (
            <div key={q._id}>
              <h4>{q.desc}</h4>
              <p>{q.correct}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};


export async function getServerSideProps(req, res) {
  await connectDB();

  const result = await Question.find({});
  const qs = result.map((doc) => {
    const q = doc.toObject();
    q._id = q._id.toString();
    return q;
  });
  return { props: { qs: qs } };
}


export default AddQ