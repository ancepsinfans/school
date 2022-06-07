import react from "react";
import NavBar from "../../components/NavBar";
import styles from '../../styles/Home.module.css'
import NextLessonButton from "../../components/NextLessonButton";

const CloseReading = () => {
    return (
        <>
            <NavBar />
            <main className={styles.main}>
                <h2>Close Reading</h2>
                <br />
                <p>Placeholder</p>
                <br />
                <NextLessonButton link='/literature' text='Lit hub' />
            </main>
        </>
    )
}

export default CloseReading

