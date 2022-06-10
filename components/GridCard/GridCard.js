import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

const Card = styled.div`
& {
  margin: 1rem;
  background-color: var(--primary65);
  padding: 1.5rem;
  text-align: left;
  color: var(--blackMain) !important;
  text-decoration: none;
  border: 2px solid var(--accentBlue40);
  box-shadow:
    1px 2px 2px hsl(220deg 60% 50% / 0.2),
    2px 4px 4px hsl(176deg 58% 45% / 0.2),
    4px 8px 8px hsl(176deg 58% 45% / 0.2);
  border-radius: 12px;
  transition: .75s ease-out;
  max-width: 300px;
  min-width: 300px;
  min-height: 190px;
  cursor: pointer;
}
&:hover,
&:focus,
&:active {
    background-color: var(--primaryMain);
  border-color: var(--accentBlueMain);
  box-shadow:
    0.5px 1px 1px hsl(176deg 58% 45% / 0.7);
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



const GridCard = ({ link, isAdmin, title, description }) => {


  return (
    <div style={{ display: isAdmin }}>
      <Link href={link}>
        <Card>
          <h2>{title} &rarr;</h2>
          <p>{description}</p>
        </Card>
      </Link>
    </div>
  );
};

export default GridCard;