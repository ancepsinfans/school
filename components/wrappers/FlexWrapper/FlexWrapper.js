import React from 'react';

function FlexWrapper({ minHeight = '10px', direction = 'row', justifyContent = 'space-evenly', alignItems = 'center', children }) {
  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '50px',
        minHeight: `${minHeight}`,
        flexDirection: `${direction}`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignItems}`
      }}
    >
      {children}
    </div>
  );
}

export default FlexWrapper;
