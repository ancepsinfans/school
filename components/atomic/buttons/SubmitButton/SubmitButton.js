'use client'
import React from 'react';
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
