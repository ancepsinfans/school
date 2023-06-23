import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import BlueButton from "../BlueButton";
import { useSession, signIn, signOut } from "next-auth/react"

const NavBarStyled = styled.header`
  height: 50px;
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

const NavBar = ({ isProfilePage, isHome }) => {
  const { data: session } = useSession()

  const user = (!!session ? session.user : '')

  return (

    <NavBarStyled isHome={isHome}>
      <Back>
        <Link href={isHome ? '/about' : '/'}>
          <a>{isHome ? 'About' : 'School'}</a>
        </Link>
      </Back>


      <Link href={`/profile?email=${user.email}`}>
        <UserName>{isProfilePage ? 'Profile' : `${!!session?.user.name ? session.user.name : 'Profile'}`}</UserName>
      </Link>


      <div>
        {!!session ? (
          <BlueButton
            onClick={() => signOut()}
            id='logout'
            link=''
          >
            Logout
          </BlueButton>

        ) : (
          <BlueButton
            onClick={() => signIn()}
            id='login'
            link=''
          >
            Login
          </BlueButton>
        )}
      </div>
    </NavBarStyled>
  )
}



export default NavBar
