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
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      {props.ans}
    </button>
  )
};

export default MCButton;