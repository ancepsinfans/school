'use client'
import React from "react";
import styles from './Grid.module.css'


const Grid = ({ children }) => {
  return (
    <div className={styles.GridCard}>
      {children}
    </div>
  );
};

export default Grid;
