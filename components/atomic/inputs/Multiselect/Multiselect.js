'use client'

import React from 'react';
import { useImmer } from 'use-immer';
import { FlexWrapper } from '../../../wrappers';


function Multiselect({ options, onChange, disabled, label }) {


  const [selectedOptions, setSelectedOptions] = useImmer([]);

  const handleOptionToggle = (option) => {
    setSelectedOptions((draft) => {
      const index = draft.findIndex((item) => item === option);
      if (index !== -1) {
        draft.splice(index, 1);
      } else {
        draft.push(option);
      }
    });
  };

  React.useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <>
      <FlexWrapper direction='column' minHeight='200px'>
        <h3>Requirements</h3>
        {
          options?.map((option) => (
            <label key={option.value}>
              <input
                disabled={disabled}
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionToggle(option.value)}
              />
              {option.label}
            </label>
          ))
        }

      </FlexWrapper >

    </>
  );
}


export default Multiselect;
