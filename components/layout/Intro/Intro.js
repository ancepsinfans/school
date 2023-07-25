import React from 'react';
import styles from './Intro.module.css'

function Intro({ children }) {
  return <div className={styles.intro}>{children}</div>;
}

export default Intro;
