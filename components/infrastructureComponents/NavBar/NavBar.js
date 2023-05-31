import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "@emotion/styled";
import BlueButton from "../BlueButton";




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

}

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
  const { user } = useUser()


  return (

    <NavBarStyled isHome={isHome}>
      <Back>
        <Link href={isHome ? '/about' : '/'}>
          <a>{isHome ? 'About' : 'School'}</a>
        </Link>
      </Back>


      <Link href='/profile'>
        <UserName>{isProfilePage ? 'Profile' : `${user ? `${user.name}` : ''}`}</UserName>
      </Link>


      <div>
        {user ? (
          <BlueButton
            disabled
            id='logout'
            link='/api/auth/logout'
          >
            Logout
          </BlueButton>

        ) : (
          <BlueButton
            disabled
            id='login'
            link='/api/auth/login'
          >
            Login
          </BlueButton>
        )}
      </div>
    </NavBarStyled>
  )
}



export default NavBar
