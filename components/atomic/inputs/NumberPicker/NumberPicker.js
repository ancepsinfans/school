import React from 'react';

function NumberPicker({ value, label, range, disabled, onChange }) {
  return (
    <div style={{ padding: '10px 0' }}>
      <label htmlFor={`${label}-number`}>{label}</label>
      <br />
      <input
        style={{ height: '28px', width: '40px' }}
        id={`${label}-number`}
        type='number'
        value={value}
        onChange={onChange}
        min={range[0]}
        max={range[1]}
        step={range[2]}
        disabled={disabled}
      />
    </div>
  );
}

export default NumberPicker;
