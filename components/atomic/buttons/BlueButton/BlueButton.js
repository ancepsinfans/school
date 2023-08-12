'use client'
import React from "react";
import styles from './BlueButton.module.css'

const BlueButton = ({ id, onClick, children }) => {

  return (
    <div id={id}>
      <button
        className={styles.blueButton}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )

};

export default BlueButton;
