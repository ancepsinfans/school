'use client'
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react"
import BlueButton from "../../atomic/buttons/BlueButton";
import { usePathname } from 'next/navigation'

const NavBarStyled = styled.header`
  height: var(--navHeight);
  width: 100%;
  background: var(--primaryMain);
  border-bottom: 3px solid var(--accentBlue40);
  align-items: center;
  display: flex;
  position: sticky;
  justify-content: space-around;
  left: 0;
  z-index: 2;
  top: 0;
  transition: height .3s ease-out;
`

const UserName = styled.a`
  text-decoration: none;
  color: var(--blackMain);
  font-weight: 500;
  font-size: large;
  padding: 5px;
  cursor: pointer;
`

const Back = styled.div`
width: 50px;
  text-decoration: none;
  font-size: x-large;
  font-weight: 700;
  cursor: pointer;
`

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

    getUserId();
  }, [status, session]);


  React.useEffect(() => {
    window.localStorage.setItem('user-id', ID);
  }, [ID]);

  return (
    <NavBarStyled>
      <Back>
        <Link href={isHome ? '/about' : '/'}>
          {isHome ? 'About' : 'School'}
        </Link>
      </Back>

      <Link href={`/profile?ID=${ID}`} legacyBehavior>
        <UserName>{isProfilePage ? 'Profile' : `${!!session?.user.name ? session.user.name : 'Profile'}`}</UserName>
      </Link>

      <div>
        <BlueButton
          onClick={() => (!!session ? signOut() : signIn())}
        >
          {!!session ? 'Logout' : 'Login'}
        </BlueButton>
      </div>
    </NavBarStyled>
  );
}

export default NavBar
