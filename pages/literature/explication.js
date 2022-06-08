import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/Home.module.css'
import NextLessonButton from '../../components/NextLessonButton'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

const Explication = () => {
  const {user} = useUser()
  const router = useRouter()

  return (
    <>
      <NavBar />
      <main className={styles.main}>
        <h2>Explication</h2>
        <br />
        <p>Placeholder</p>
        <br />
        <NextLessonButton
          link='/literature/close-reading'
          text='Close reading'
          user={user?user.email:'none'}
          sphere={router.pathname.split('/')[1]}
          path={router.pathname}
        />
      </main>
    </>
  )
}

export default Explication