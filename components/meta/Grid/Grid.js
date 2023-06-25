import React from "react";
import styled from "styled-components";

const GridStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1000px;
  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
}
`

const Grid = ({ children }) => {
  return (
    <GridStyle>
      {children}
    </GridStyle>
  );
};

export default Grid;
