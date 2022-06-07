import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/Home.module.css'
import NextLessonButton from '../../components/NextLessonButton'

const Explication = () => {
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <h2>Explication</h2>
        <br />
        <p>Placeholder</p>
        <br />
        <NextLessonButton link='/literature/close-reading' text='Close reading' />
      </main>
    </>
  )
}

export default Explication