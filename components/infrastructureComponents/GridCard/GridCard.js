import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Card = styled.div`
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



const GridCard = ({ link, isAdmin, title, description, isRestricted, isDisabled, onClick }) => {

  if (link === '') {
    return (
      <div style={{ display: (isRestricted && !isAdmin ? "none" : "block") }}>
        <button style={{ background: 'none', border: 'none' }} onClick={onClick}>
          <Card
            isDisabled={isDisabled}
          >
            <h2>{title} &rarr;</h2>
            <p>{description}</p>
          </Card>
        </button>
      </div>
    )
  }
  return (
    <div style={{ display: (isRestricted && !isAdmin ? "none" : "block") }}>
      <Link href={link}>
        <Card
          isDisabled={isDisabled}
        >
          <h2>{title} &rarr;</h2>
          <p>{description}</p>
        </Card>
      </Link>
    </div>
  );
};

export default GridCard;
