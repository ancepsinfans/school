'use client'
import React from "react";
import styles from './ButtonMechanics.module.css'

const ButtonMechanics = ({ children, color, onClick, type }) => {

  return (
    <>
      <a className={styles.pushable} as={type ? type : 'a'} onClick={onClick}>
        <span className={styles.shadow} />
        <span className={styles.edge} />
        <span className={styles.front} style={!!color ? { background: color } : null}>
          {children}
        </span>
      </a>
    </>

  );
};

export default ButtonMechanics;
