import React from "react";
import useQuestion from "../../lib/fetchQuestion";

const MC = ({ sphere, id }) => {

  return (
    <p>{sphere ? sphere : 'nope'}</p>
  );
};

export default MC;
