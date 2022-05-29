import React from "react";
import styled from 'styled-components';
import constants from "../../styles/constants";

const NavBar = () => {
  return (
    <Bar>
      <Text>Login</Text>
    </Bar>
  )
}

const Bar = styled.div`
  height: 76px;
  width: 100%;
  left: 0px;
  position: absolute;
  background: #53D2C9;
`
const Text = styled.div`
  text-align: right;
  padding-right: 10px;
  padding-top: 10px;
  font-size: 32px;
  font-family: Jaini;
  color: #292f36;
`
export default NavBar