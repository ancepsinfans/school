import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import styled from "@emotion/styled";

const NavBar = styled.header`
  height: 76px;
  width: 100%;
  background: var(--primaryMain);
  border-bottom: 3px solid var(--accentBlue40);
  align-items: center;
  display: flex;
  position: fixed;
  justify-content: space-around;
  left: 0;
  z-index: 2;
  top: 0;
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
`

const Login = styled.a`
& {
  text-decoration-line: none;
  font-size: 1.25rem;
  color: var(--blackMain);
  padding: 5px;
  border-radius: 12px;
  background-color: var(--accentBlue60);
  border: 1px solid var(--accentBlue40);
  transition: .75s;
  cursor: pointer;
}

&:hover {
  background-color: var(--accentBlue50);
  border: 1px solid var(--blackMain);
  transition: .5s;
  text-align: center;
}
`
const Back = styled.a`
  text-decoration: none;
  font-size: x-large;
  font-weight: 700;
`

const NavBarH = () => {
  const { user } = useUser()


  return (
    <NavBar>
      <div>
      </div>
      <Link href='/profile'>
        <UserName>{user ? `${user.name}` : null}</UserName>
      </Link>

      <div>
        {user ? (
          <>
            <Link id='login' href='/api/auth/logout'>
              <Login>Logout</Login>
            </Link>
          </>

        ) : (
          <Link id='login' href='/api/auth/login'>
            <Login>Login</Login>
          </Link>
        )}
      </div>
    </NavBar>
  )
}



export const NavBarO = () => {
  const { user } = useUser()

  return (
    <NavBarOther>
      <div>
        <Link href='/'>
          <Back>School</Back>
        </Link>
      </div>

      <Link href='/profile'>
        <UserName>{user ? `${user.name}` : null}</UserName>
      </Link>


      <div>
        {user ? (
          <>
            <Link id='login' href='/api/auth/logout'>
              <Login>Logout</Login>
            </Link>
          </>

        ) : (
          <Link id='login' href='/api/auth/login'>
            <Login>Login</Login>
          </Link>
        )}
      </div>
    </NavBarOther>
  )
}

export default NavBarH
