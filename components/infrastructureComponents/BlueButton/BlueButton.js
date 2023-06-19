import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Login = styled.button`
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

const BlueButton = ({ id, link, onClick, children }) => {
  if (link === '') {
    return (
      <div id={id}>
        <Login
          onClick={onClick}
        >
          {children}
        </Login>
      </div>
    )
  }


  return (
    <Link id={id} href={link}>
      <Login
        onClick={onClick}
      >
        {children}
      </Login>
    </Link>
  );
};

export default BlueButton;
