import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import NavBarController from '../components/NavBar'

export default function Home() {
  const { user } = useUser()

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
{/* 
        {user ? (
          <div
            style={{ textAlign: 'center' }}>
            <br />
            <span className='underline'>Welcome {user.name}!</span>
            <br />
            <Link href='/api/auth/logout'>
              <a>Logout</a>
            </Link>

          </div>
        ) : (
          <Link href='/api/auth/login'>
            <a>Login</a>
          </Link>
        )} */}


        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/quiz" >
              <div>
                <h2>Quiz sandbox &rarr;</h2>
                <p>For testing purposes</p>
              </div>
            </Link>
          </div>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

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
      {/* <style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Lobster;
  }

  * {
    box-sizing: border-box;
  }
`}</style> */}
    </div>
  )
}

