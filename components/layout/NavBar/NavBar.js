'use client'
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { BlueButton } from "@/components/atomic";
import { usePathname } from 'next/navigation'
import { IdContext } from "@/components/providers/IdProvider";
import styles from './NavBar.module.css'


const NavBar = () => {
  const { data: session } = useSession()

  const { id } = React.useContext(IdContext)
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isProfilePage = pathname.includes('profile')


  return (
    <header className={styles.container}>
      <div className={styles.back}>
        <Link href={isHome ? '/about' : '/'}>
          {isHome ? 'About' : 'School'}
        </Link>
      </div>

      <Link href={`/profile?ID=${id}`} legacyBehavior>
        <a className={styles.username}>{isProfilePage ? 'Profile' : `${!!session?.user.name ? session.user.name : 'Profile'}`}</a>
      </Link>

      <div>
        <BlueButton
          onClick={() => (!!session ? signOut() : signIn())}
        >
          {!!session ? 'Logout' : 'Login'}
        </BlueButton>
      </div>
    </header>
  );
}

export default NavBar
