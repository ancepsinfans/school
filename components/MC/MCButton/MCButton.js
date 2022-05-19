import React from "react";
import constants from "../../../styles/constants";
import styles from '../../../styles/Question.module.css'

const MCButton = (props) => {
  const [btnColor, setBtnColor] = React.useState(constants.accentBrown)

  const clickHandler = (ans, correct) => {
    ans === correct ? setBtnColor(constants.accentBlue) : setBtnColor(constants.accentRed)

  }

  return (
    <button
      className={styles.answerButton}
      style={{ backgroundColor: btnColor }}
      onClick={() => { props.onClick(); clickHandler(props.ans, props.correct) }}
    >
      {props.name}
    </button>
  )
};

export default MCButton;
