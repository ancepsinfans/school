'use client'
import React from "react";
import styles from './MainContainer.module.css'

function MainContainer({ children }) {

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main} >
          {children}
        </main>
      </div>
    </>
  );
}

export default MainContainer;
