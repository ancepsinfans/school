import React from 'react';

function SelectInput({ value, optionsLogic, onChange, label }) {
  return (
    <>
      <div style={{ padding: '10px 0' }}>
        <label htmlFor={`${label}-select`}>
          {label}
        </label>
        <br />
        <select
          style={{ width: '175px' }}
          id={`${label}-select`}
          value={value}
          onChange={onChange}
        >
          {optionsLogic}
        </select>
      </div>
    </>
  );
}

export default SelectInput;
