import React from "react";

export const ItemSelector = ({type, className, onChange}) => {
  return (
    <React.Fragment>
      <label className={className.toLowerCase()}>
        {className}
        <input
          type={type}
          className={className.toLowerCase()}
          onChange={onChange}
          name = "type"
        ></input>
      </label>
    </React.Fragment>
  );
};
