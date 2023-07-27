'use client'
import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    padding-top: 50px;
`

function FlexWrapper({ minHeight = '10px', direction = 'row', justifyContent = 'space-evenly', alignItems = 'center', children }) {
  return (
    <Flex
      style={{
        minHeight: `${minHeight}`,
        flexDirection: `${direction}`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignItems}`
      }}
    >
      {children}
    </Flex>
  );
}

export default FlexWrapper;
