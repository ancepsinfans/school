import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import NavBarController from '../components/NavBar'
import { getDomainLocale } from 'next/dist/shared/lib/router/router'



export default function Home() {
  const { user } = useUser()

  const isNotAdmin = () => {
    user.email === 'zachary.r.bullard@gmail.com' ? null : `${styles.admin}`
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>School</title>
        <meta name="description" content="Because education can be better" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBarController type={'home'} />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/">
            <a style={{ textDecoration: 'none', cursor: 'text' }}>school!</a>
          </Link>
        </h1>

        <div className={styles.grid}>

          {user ?
            <>
              <Link href='/quiz'>
                <div className={styles.card} >
                  <h2>Quiz sandbox &rarr;</h2>
                </div>
              </Link>

              <Link className={isNotAdmin} href='/search'>
                <div className={styles.card} >
                  <h2>Search MVP &rarr;</h2>
                </div>
              </Link>

              <Link className={isNotAdmin} href='/add_q'>
                <div className={styles.card} >
                  <h2>Add questions &rarr;</h2>
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

              <Link href=''>
                <div className={styles.card} >
                  <h2>Placeholder</h2>
                </div>
              </Link>
            </>
            :
            <div className={styles.card} >
              <Link href='/api/auth/login'>
                <h2>You should login first</h2>
              </Link>
            </div>
          }

        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>

    </div >
  )
}
