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
}) {

  return (
    <>
      {condition ?
        <SelectInput
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

  // const [isTextInput, setIsTextInput] = React.useState(false)
  // return (
  //   <>
  //     {(selectDefault && !isTextInput) ?
  //       <SelectInput
  //         disabled={disabled}
  //         value={value}
  //         onChange={(e) => {
  //           if (e.target.value === 'custom') {
  //             setIsTextInput(true)
  //           } else {

  //             onChange(e)
  //           }
  //         }}
  //         optionsLogic={optionsLogic}
  //         label={label}
  //       >
  //         <option value='custom'>Write new value</option>
  //       </SelectInput>
  //       : <TextInput value={value} onChange={onChange} label={label} disabled={disabled} />
  //     }
  //   </>
  // );
}

export default SelectWithTextInput;

