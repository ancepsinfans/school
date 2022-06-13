import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "@emotion/styled";
import BlueButton from "../BlueButton";

const NavBar = styled.header`
  height: ${props => props.isHome ? '76px' : '50px'};
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
  transition: height 2s;
`

const NavBarOther = styled.header`
  position: sticky;
  height: 50px;
  width: 100%;
  background: var(--primaryMain);
  border-bottom: 3px solid var(--accentBlue40);
  align-items: center;
  display: flex;
  justify-content: space-around;
  left: 0;
  z-index: 2;
  top: 0;
`

const UserName = styled.a`
  text-decoration: none;
  color: var(--blackMain);
  font-weight: 500;
  font-size: large;
  padding: 5px;
  cursor: pointer;
`

const Back = styled.a`
  text-decoration: none;
  font-size: x-large;
  font-weight: 700;
  cursor: pointer;
`

const NavBarH = ({ isProfilePage, isHome }) => {
  const { user } = useUser()


  return (
    <NavBar isHome={isHome}>
      <div>
        {isHome ? null :
          <Link href='/'>
            <Back>School</Back>
          </Link>}
      </div>

      {isProfilePage ? null :
        <Link href='/profile'>
          <UserName>{user ? `${user.name}` : null}</UserName>
        </Link>
      }

      <div>
        {user ? (
          <BlueButton
            id='logout'
            link='/api/auth/logout'
          >
            Logout
          </BlueButton>

        ) : (
          <BlueButton
            id='login'
            link='/api/auth/login'
          >
            Login
          </BlueButton>
        )}
      </div>
    </NavBar>
  )
}



export const NavBarO = (props) => {
  const { user } = useUser()

  return (
    <NavBarOther>
      <div>
        <Link href='/'>
          <Back>School</Back>
        </Link>
      </div>

      {props.isProfilePage ? null :
        <Link href='/profile'>
          <UserName>{user ? `${user.name}` : null}</UserName>
        </Link>
      }

      <div>
        {user ? (
          <BlueButton
            id='logout'
            link='/api/auth/logout'
          >
            Logout
          </BlueButton>

        ) : (
          <BlueButton
            id='login'
            link='/api/auth/login'
          >
            Login
          </BlueButton>
        )}
      </div>
    </NavBarOther>
  )
}

export default NavBarH
