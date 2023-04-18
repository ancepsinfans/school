import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Pushable = styled.a`
  && {

    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    font-size: 4px !important;
  }

  &&:hover {
    filter: brightness(105%);
  }

  &&:focus:not(:focus-visible) {
    outline: none;
  }
`

const Shadow = styled.span`
  && {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  &&:hover {
    transform: translateY(4px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  &&:active {
    transform: translateY(1px);
    transition: transform 34ms;
  }
`

const Edge = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(251deg, 67%, 50%) 0%,
      hsl(251deg, 67%, 70%) 8%,
      hsl(251deg, 67%, 70%) 92%,
      hsl(251deg, 67%, 50%) 100%
    );
`

const Front = styled.span`
  && {
    display: block;
    position: relative;
    padding: 5px 15px;
    border-radius: 12px;
    border: 1.5px solid var(--accentPurple70);
    font-size: 1.1rem;
    color: var(--blackMain);
    background: ${props => props.color ? props.color : `var(--accentPurple80)`};
    will-change: transform;
    transform: translateY(-4px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  &&:hover {
    transform: translateY(-6px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
}

  &&:active {
    transform: translateY(-2px);
    transition: transform 34ms;
}
`



const ButtonMechanics = ({ children, color, onClick, link, type }) => {
  return (

    type ?
      <Pushable as={type ? type : 'a'} onClick={onClick}>
        <Shadow />
        <Edge />
        <Front color={color}>
          {children}
        </Front>
      </Pushable> :
      <Link href={link} passHref>
        <Pushable as={type ? type : 'a'} onClick={onClick}>
          <Shadow />
          <Edge />
          <Front color={color}>
            {children}
          </Front>
        </Pushable>
      </Link>


  );
};

export default ButtonMechanics;
