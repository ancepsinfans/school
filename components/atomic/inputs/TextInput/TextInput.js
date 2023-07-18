'use client'
import React from 'react';

function TextInput({ value, onChange, label, style, disabled, onKeyDown }) {

  return (
    <>
      <div style={{ padding: '10px 0' }} >
        <label htmlFor={label}>{label}</label>
        <br />
        <input
          disabled={disabled}
          onKeyDown={onKeyDown}
          style={style}
          type="text"
          id={label}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default TextInput;
