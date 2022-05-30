import React from "react";
import constants from "../../styles/constants";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styles from '../../styles/Home.module.css'



const NavBarH = () => {
  const {user } = useUser()

  return (
    <div className={styles.NavBar}>
      <div id='login' className={styles.Login}>
      {user ? (
        <>
            <div>Welcome {user.name}!</div>
            <Link href='/api/auth/logout'>
              <a className={styles.Login}>Logout</a>
            </Link>
            </>
          
        ) : (
          <Link href='/api/auth/login'>
            <a className={styles.Login}>Login</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export const NavBarO =() => {
  const {user } = useUser()

  return (
    <div className={styles.NavBar}>
      <div id='back'>
      <Link href='/'>
        <a className={styles.Back}>School</a>
        </Link>
        </div>
      <div className={styles.Login}>
      {user ? (
        <div id="login">
            <div>Welcome {user.name}!</div>
            <Link href='/api/auth/logout'>
              <a className={styles.Login}>Logout</a>
            </Link>
            </div>
          
        ) : (
          <Link id="login" href='/api/auth/login'>
            <a className={styles.Login}>Login</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavBarH
