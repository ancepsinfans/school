import React from 'react';

function RerenderHunter() {
  const [color, setColor] = React.useState("#000");

  React.useEffect(() => {
    setColor("#" + (((1 << 24) * Math.random()) | 0).toString(16));
  }, []);
  return <span style={{ background: color }}>{color}</span>;
}

export default RerenderHunter;
