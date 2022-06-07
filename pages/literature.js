import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import NavBarController from "../components/NavBar/NavBarController";
import styles from '../styles/Home.module.css'
import Link from "next/link";


const Literature = () => {
    const { user } = useUser()
    return (
        <>
            <NavBarController />
            <main className={styles.main}>

                <h2 className={styles.title}>Literature</h2>
                <div className={styles.Intro}>
                    <p>Remedial course in literature</p>
                </div>
                <div className={styles.grid}>
                    <Link href='/literature/intro'>
                        <div className={styles.card} >
                            <h2>Intro &rarr;</h2>
                            <p>Course overview</p>
                        </div>
                    </Link>
                    <Link href='/literature/explication'>
                        <div className={styles.card} >
                            <h2>Explication &rarr;</h2>
                            <p>How to ask questions when you read</p>
                        </div>
                    </Link>
                    <Link href='/literature/close-reading'>
                        <div className={styles.card} >
                            <h2>Close reading &rarr;</h2>
                            <p>Breaking down a story and getting blood from the turnip</p>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    )
}


export default Literature