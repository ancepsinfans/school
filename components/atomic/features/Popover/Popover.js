'use client'
import React from "react";
import styled from "styled-components";
import * as Pop from '@radix-ui/react-popover'
import vocabSender from "../../../../models/users/vocabHelper";


const Popup = styled(Pop.Content)`
  & {
    border-radius: 4px;
    padding: 6px;
    color: var(--tooltip-text-color);
    background: var(${props => props.isVocab ? '--accentPurpleMain' : '--accentRed90'});
    border: 2px solid var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'});
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1.5;
    max-width: 250px;
    min-width: fit-content;
  }

  &::before {
    border: solid transparent;
    border-width: var(--tooltip-arrow-size);
    border-top-color: var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'});
  }
`

const Arrow = styled(Pop.Arrow)`
  & {
    fill: var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'});
  }
`

const Child = styled(Pop.Trigger)`
  & {
    -webkit-text-decoration: underline wavy 1.5px var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'}) !important;
    text-decoration: underline wavy 1.5px var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'}) !important;
    background: none;
    border: none;   
}

  @media (max-width: 768px) {
    color: var(${props => props.isVocab ? '--accentPurple70' : '--accentRed75'}) !important;
    -webkit-text-decoration: none !important;
    text-decoration: none !important;
  }
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
    align-items: center;
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

const Popover = ({ content, user, location, children }) => {

  const isVocab = !!user ? true : false

  return (
    <Pop.Root>
      <Child isVocab={isVocab}>{children}</Child>
      <Pop.Portal>
        <Popup isVocab={isVocab}>
          {content}{' '}
          {isVocab ? <AddButton
            onClick={() => {
              vocabSender(user, { term: children, definition: content }, location)
            }}
          >
            +
          </AddButton> : null}
          <Arrow isVocab={isVocab} />
        </Popup>
      </Pop.Portal>
    </Pop.Root>

  );
};

export default Popover;
