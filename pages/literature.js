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
                    <p>asdf</p>
                </div>
                <div className={styles.grid}>
                    <Link href=''>
                        <div className={styles.card} >
                            <h2>Placeholder</h2>
                        </div>
                    </Link>
                    <Link href=''>
                        <div className={styles.card} >
                            <h2>Placeholder</h2>
                        </div>
                    </Link>
                    <Link href=''>
                        <div className={styles.card} >
                            <h2>Placeholder</h2>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    )
}


export default Literature