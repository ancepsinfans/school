import React from "react";
import constants from "../../styles/constants";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from '../../styles/Home.module.css'



const NavBarH = () => {
  const { user } = useUser()

  return (
    <header className={styles.NavBar}>
      <div className={styles.NavItem} id='back'>

      </div>

      <Link href='/profile' className={styles.NavItem} id='void'>
        <a className={styles.Void}>{user ? `Welcome ${user.name}!` : null}</a>
      </Link>

      <div className={styles.NavItem}>
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
      <div className={styles.NavItem} id='back'>
        <Link href='/'>
          <a className={styles.Back}>School</a>
        </Link>
      </div>
      <div className={styles.NavItem} id='void'>
        <Link href='/profile'>
          <span className='username' style={{ fontWeight: '500' }}>{user ? `${user.name}` : null}</span>
        </Link>
      </div>

      <div className={styles.NavItem}>
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
