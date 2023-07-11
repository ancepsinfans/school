import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justifyContent};
    min-height: ${props => props.minHeight};
    align-items: ${props => props.alignItems};
    padding-top: 50px;
`

function FlexWrapper({ minHeight = '10px', direction = 'row', justifyContent = 'space-evenly', alignItems = 'center', children }) {
  return (
    <Flex
      minHeight={minHeight}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </Flex>
  );
}

export default FlexWrapper;
