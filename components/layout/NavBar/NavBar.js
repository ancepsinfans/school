'use client'
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { BlueButton } from "@/components/atomic";
import { usePathname } from 'next/navigation'
import styles from './NavBar.module.css'


const NavBar = () => {
  const { data: session, status } = useSession()
  const [ID, setID] = React.useState('')

  const pathname = usePathname()

  const isHome = pathname === '/'
  const isProfilePage = pathname.includes('profile')

  React.useEffect(() => {

    const getUserId = async () => {
      if (status !== 'authenticated') {
        return;
      }
      try {
        const response = await fetch('/api/admin/env');
        const url = await response.json();
        const userDataResponse = await fetch(`${url}/api/user/user?email=${session.user.email}`);
        const fetchedID = await userDataResponse.json();
        setID(fetchedID);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const storedID = window.localStorage.getItem('user-id')

    if (!storedID) {
      getUserId();
      window.localStorage.setItem('user-id', ID);
    } else {
      setID(storedID)
    }
  }, [ID, status, session]);

  return (
    <header className={styles.container}>
      <div className={styles.back}>
        <Link href={isHome ? '/about' : '/'}>
          {isHome ? 'About' : 'School'}
        </Link>
      </div>

      <Link href={`/profile?ID=${ID}`} legacyBehavior>
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
