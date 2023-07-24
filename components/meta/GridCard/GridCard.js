'use client'
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { FlexWrapper } from "../../wrappers";

const CardStyle = styled.div`
& {
  margin: 1rem;
  background-color: ${props => props.isDisabled ? `var(--black50)` : `var(--primary65)`};
  padding: 1.5rem;
  text-align: left;
  color: var(--blackMain) !important;
  text-decoration: none;
  border: ${props => props.isDisabled ? `2px solid var(--black30)` : `2px solid var(--accentBlue40)`};
  box-shadow:
    0.6px 0.7px 1px hsl(176deg 52% 28% / 0.53),
    2px 2.6px 3.5px -0.9px hsl(176deg 52% 28% / 0.5),
    5.3px 6.9px 9.4px -1.9px hsl(176deg 52% 28% / 0.48),
    13.3px 17.3px 23.6px -2.8px hsl(176deg 52% 28% / 0.45);
  border-radius: 12px;
  transition: .5s ease-out;
  max-width: 300px;
  min-width: 300px;
  min-height: 190px;
  cursor: pointer;
  pointer-events: ${props => props.isDisabled ? `none` : `auto`};
}
&:hover,
&:focus,
&:active {
  background-color: ${props => props.isDisabled ? `var(--black40)` : `var(--primaryMain)`};
  border-color: ${props => props.isDisabled ? `var(--blackMain)` : `var(--accentBlueMain)`};
  box-shadow:
    0.6px 0.7px 1px hsl(176deg 52% 28% / 0.51),
    1px 1.3px 1.8px -1.4px hsl(176deg 52% 28% / 0.47),
    2.7px 3.5px 4.8px -2.8px hsl(176deg 52% 28% / 0.44);
  transition: .25s ease-in;
}

& h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

& p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}
`
const Button = styled.button``

const GridCard = ({ link, isAdmin = false, title, description, isRestricted = false, isDisabled = false, onClick, hidden = false, completed = false, lessonDetails }) => {

  const Type = link === '' ? Button : Link
  return (
    <div style={{ display: (isRestricted && !isAdmin ? "none" : "block") }}>
      <Type href={link} style={{ background: 'none', border: 'none' }} onClick={onClick}>
        <CardStyle
          hidden={hidden}
          isDisabled={isDisabled}
          completed={completed}
        >
          <h2>{title}</h2>
          <p style={{ padding: '0' }}>{description}</p>
          <FlexWrapper direction="row" justifyContent="space-between">
            {lessonDetails}
            <div>{completed ? "✅" : null}</div>
          </FlexWrapper>
        </CardStyle>
      </Type>
    </div>
  )
};



export default GridCard;
