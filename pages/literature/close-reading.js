import react from "react";
import NavBar from "../../components/NavBar";
import styles from '../../styles/Home.module.css'
import NextLessonButton from "../../components/NextLessonButton";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

const CloseReading = () => {
    const {user} = useUser()
    const router = useRouter()

    return (
        <>
            <NavBar />
            <main className={styles.main}>
                <h2>Close Reading</h2>
                <br />
                <p>Placeholder</p>
                <br />
                <NextLessonButton
                    link='/literature'
                    text='Literature hub'
                    user={user?user.email:'none'}
                    sphere={router.pathname.split('/')[1]}
                    path={router.pathname}
                />
            </main>
        </>
    )
}

export default CloseReading

