import React from 'react'
import NavBar from '../../components/NavBar'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

const Intro = () => {
  return (
    <>
        <NavBar/>
        <main className={styles.main}>
            <h2>Intro</h2>
            <br/>
            <p>Placeholder</p>
            <br/>
            <Link href='/literature/explication'>
                <button onClick={()=>{alert('test')}} className={styles.Login}>Explication &rarr;</button>
            </Link>
        </main>
    </>
  )
}

export default Intro