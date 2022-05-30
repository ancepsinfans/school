import React from "react";
import constants from "../../styles/constants";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from '../../styles/Home.module.css'



const NavBarH = () => {
  const { user } = useUser()

  return (
    <header className={styles.NavBar}>
      <div id='back'>

      </div>

      <div id='void'>
        <span className={styles.Void}>{user ? `Welcome ${user.name}!` : null}</span>
      </div>

      <div>
        {user ? (
          <>
            <Link id='login' href='/api/auth/logout'>
              <a className={styles.Login}>Logout</a>
            </Link>
          </>

        ) : (
          <Link id='login' href='/api/auth/login'>
            <a className={styles.Login}>Login</a>
          </Link>
        )}
      </div>
    </header>
  )
}

export const NavBarO = () => {
  const { user } = useUser()

  return (
    <header className={`${styles.NavBar} ${styles.Other}`}>
      <div id='back'>
        <Link href='/'>
          <a className={styles.Back}>School</a>
        </Link>
      </div>
      <div id='void'>
        <span className={styles.Void}>{user ? `Welcome ${user.name}!` : null}</span>
      </div>

      <div>
        {user ? (
          <>
            <Link id='login' href='/api/auth/logout'>
              <a className={styles.Login}>Logout</a>
            </Link>
          </>

        ) : (
          <Link id='login' href='/api/auth/login'>
            <a className={styles.Login}>Login</a>
          </Link>
        )}
      </div>
    </header>
  )
}

export default NavBarH
