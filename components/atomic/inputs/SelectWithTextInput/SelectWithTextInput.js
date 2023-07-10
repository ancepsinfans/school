import React from 'react';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';

function SelectWithTextInput({
  condition,
  setCondition,
  value,
  optionsLogic,
  onChange,
  label,
  disabled,
  style,
}) {

  return (
    <>
      {condition ?
        <SelectInput
          style={style}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            if (e.target.value === 'custom-314159') {
              setCondition()
            } else {
              onChange(e)
            }
          }}
          optionsLogic={optionsLogic}
          label={label}
        >
          <option value='custom-314159'>Write new value</option>
        </SelectInput>
        :
        <TextInput
          style={{ width: '175px' }}
          disabled={disabled}
          value={value}
          onKeyDown={(e) => {
            if (e.code === 'Escape') {
              setCondition()
            }
          }}
          onChange={(e) => { onChange(e) }}
          label={label}
        />
      }
    </>
  )


}

export default SelectWithTextInput;

