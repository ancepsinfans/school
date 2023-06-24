import React from "react";
import styled from "@emotion/styled";


const Popup = styled.span`
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
  -webkit-text-decoration: underline wavy 1.5px var(--accentPurple70) !important;
  text-decoration: underline wavy 1.5px var(--accentPurple70) !important;
 `

const Wrapper = styled.span`
  display: inline-block; 
  position: relative; 
`

const AddButton = styled.button`
  @keyframes pressed {
    from {
      background-color: var(--accentPurple75);
      border: solid 1px var(--accentPurple70);
      }
    
    to {
      background-color: var(--accentPurple85);
      border: solid 1px var(--accentPurple75)
    }
  }

  & {
    border-radius: 50%;
    border: solid 1px var(--accentPurple75);
    height: 20px;
    width: 20px;
    display: inline-flex;
    justify-content: center; 
    background-color: var(--accentPurple85);
  }

  &:hover,
  &:focus {
    background-color: var(--accentPurple80);
    border: solid 1px var(--accentPurple70)
  }

  &:active {
    background-color: var(--accentPurple75);
    border: solid 1px var(--accentPurple70);
    box-shadow:
      0.5px 1px 1px hsl(200deg 95% 33% / 0.7);
    transition: .2s ease-in;
  }
`

const Definition = ({ content, delay, children }) => {
  const addTerm = () => {

  }

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
          {content}{' '}<AddButton>+</AddButton>
        </Popup>
      )}
    </Wrapper>
  );
};

export default Definition;
