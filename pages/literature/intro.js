import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/Home.module.css'
import NextLessonButton from '../../components/NextLessonButton'
import { useUser } from '@auth0/nextjs-auth0'

const Intro = () => {
  const { user } = useUser()
  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <h2>Intro</h2>
        <br />
        <p>Placeholder</p>
        <br />
        <NextLessonButton
          link='/literature/explication'
          text='Explication'
          user={user.email}
          sphere='literature'
          path={window.location.pathname}
        />
      </main>
    </>
  )
}

export default Intro