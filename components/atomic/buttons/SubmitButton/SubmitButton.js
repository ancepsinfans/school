import styled from 'styled-components';
import React from 'react';
import constants from '../../../../styles/constants'
import ButtonMechanics from '../ButtonMechanics';


function SubmitButton({ children }) {
  return (
    <ButtonMechanics type='button'>
      <>
        {children}
      </>
    </ButtonMechanics>
  );
}

export default SubmitButton;
