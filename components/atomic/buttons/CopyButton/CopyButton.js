'use client'
import React from 'react';
import { useClipboard } from '../../../../middleware/hooks'


function CopyButton({ onClick, text, children }) {
  const { writeToClipboard } = useClipboard();

  const handleCopy = (t) => {

    writeToClipboard(t);
    alert('copied!')
  };


  return (
    <button
      onClick={!!onClick ? onClick : () => { handleCopy(text) }}
      style={{ background: 'none', boarder: 'none' }}
    >
      {children}
    </button>
  );
}

export default CopyButton;
