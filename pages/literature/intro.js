import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/Home.module.css'
import NextLessonButton from '../../components/NextLessonButton'

const Intro = () => {
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <h2>Intro</h2>
        <br />
        <p>Placeholder</p>
        <br />
        <NextLessonButton link='/literature/explication' text='Explication' />
      </main>
    </>
  )
}

export default Intro