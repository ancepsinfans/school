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

      <BlueButton>
        <Link className={styles.back} href={isHome ? '/about' : '/'}>
          {isHome ? 'About' : 'School'}
        </Link>
      </BlueButton>

      <BlueButton>
        <Link className={styles.username} href={`/profile?ID=${id}`} >
          {isProfilePage ? 'Profile' : `${!!session?.user.name ? session.user.name : 'Profile'}`}
      </Link>
      </BlueButton>

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
