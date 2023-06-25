import React from 'react';

function TextInput({ value, onChange, label, style }) {

  return (
    <>
      <div style={{ padding: '10px 0' }} >
        <label htmlFor={label}>{label}</label>
        <br />
        <input
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
