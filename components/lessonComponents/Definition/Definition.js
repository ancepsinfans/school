import React from "react";
import styled from "@emotion/styled";


const Popup = styled.div`
  & {
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    color: var(--tooltip-text-color);
    background: var(--tooltip-background-color);
    border: 2px solid var(--accentPurple70);
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;
    top: calc(var(--tooltip-margin) * -1); 
  }

  &::before {
    content: " ";
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: var(--tooltip-arrow-size);
    margin-left: calc(var(--tooltip-arrow-size) * -1);
    top: 101%;
    border-top-color: var(--accentPurple70);
    z-index:90;
  }
`

const Child = styled.span`
 -webkit-text-decoration: underline 4px var(--accentPurple70) !important;
  text-decoration: underline 4px var(--accentPurple70) !important;
 `

const Wrapper = styled.span`
  display: inline-block; 
  position: relative; 
`

const Definition = ({ content, delay, children }) => {
  let timeout;
  const [active, setActive] = React.useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 50);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <Wrapper
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      <Child>{children}</Child>
      {active && (
        <Popup>
          {content}
        </Popup>
      )}
    </Wrapper>
  );
};

export default Definition;
