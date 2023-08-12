import React from 'react';
import styles from './Title.module.css'

function Title({ children, smallTitle = false }) {
  return (
    <h1 className={smallTitle ? styles.smallTitle : styles.bigTitle}>
      {children}
    </h1>
  );
}

export default Title;
