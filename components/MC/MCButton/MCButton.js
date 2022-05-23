import React from "react";
import constants from "../../../styles/constants";
import styles from '../../../styles/Question.module.css'

const MCButton = (props) => {
  const [btnColor, setBtnColor] = React.useState(constants.accentBrown)

  const clickHandler = (ans, correct) => {
    setBtnColor(ans === correct ? constants.accentBlue : constants.accentRed)
  }

  return (
    <button
      className={styles.answerButton}
      style={{ backgroundColor: btnColor }}
      onClick={() => {  clickHandler(props.ans, props.correct); props.onClick(props.ans) }}
    >
      {props.ans}
    </button>
  )
};

export default MCButton;