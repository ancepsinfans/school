import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import NavBarController from "../components/NavBar/NavBarController";
import styles from '../styles/Home.module.css'
import Link from "next/link";
import connectMongo from "../middleware/connectMongo";
import StudentProgress from '../models/progress/Progress'
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";


const Literature = ({ user, progress }) => {

    /* Progress logic */
    let progressSpheres = new Set()
    let spheresPageCount = {}

    progress.map((e, idx) => {
        const [a, b] = e.page.split('/').slice(1)
        spheresPageCount[a] = []
        progressSpheres.add(e.sphere)
    })

    progressSpheres = Array.from(progressSpheres)

    progress.map((e, idx) => {
        const [a, b] = e.page.split('/').slice(1)
        spheresPageCount[a].push(b)
    })

    console.log(!spheresPageCount['literature'].includes('explication') ? styles.disabled : null)
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
                        <div className={`${styles.card} ${(spheresPageCount['literature'].includes('intro') ? null : styles.disabled)}`} >
                            <h2>Explication &rarr;</h2>
                            <p>How to ask questions when you read</p>
                        </div>
                    </Link>

                    <Link href='/literature/close-reading'>
                        <div className={`${styles.card} `} >
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


export const getServerSideProps = withPageAuthRequired({

    getServerSideProps: async ({ req, res }) => {

        const auth0user = getSession(req, res)

        try {
            await connectMongo()

            const progress = await StudentProgress.find({ user: auth0user.user.email })

            return {
                props: {
                    progress: JSON.parse(JSON.stringify(progress)),
                }
            }
        } catch (error) {
            console.log('oops')
            console.log(error)

            return {
                notFound: true
            }
        }
    }
});

