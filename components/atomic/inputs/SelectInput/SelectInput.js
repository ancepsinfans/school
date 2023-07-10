import React from 'react';

function SelectInput({ value, optionsLogic, onChange, label, disabled, style, children }) {
  return (
    <>
      <div style={{ padding: '10px 0' }}
      >
        <label htmlFor={`${label}-select`}>
          {label}
        </label>
        <br />
        <select
          disabled={disabled}
          style={{ width: '175px', height: '28px', ...style, }}
          id={`${label}-select`}
          value={value}
          onChange={onChange}
        >
          {optionsLogic}
          {children}
        </select>
      </div>
    </>
  );
}

export default SelectInput;
