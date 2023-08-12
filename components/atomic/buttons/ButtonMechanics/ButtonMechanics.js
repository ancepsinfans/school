'use client'
import React from "react";
import styles from './ButtonMechanics.module.css'

const ButtonMechanics = ({ children, color, onClick }) => {

  return (
    <>
      <button className={styles.pushable} onClick={onClick}>
        <span className={styles.shadow} />
        <span className={styles.edge} />
        <span className={styles.front} style={!!color ? { background: color } : null}>
          {children}
        </span>
      </button>
    </>

  );
};

export default ButtonMechanics;
