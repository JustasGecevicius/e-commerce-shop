import React from "react";

export const ItemSelector = ({ type, className, onChange, src }) => {
  // const outline = (e) => {
  //   e.preventDefault();
  //   //console..log(e);
  //   e.target.classList.toggle("active");
  // }

  return (
    <React.Fragment>
      <label className={className + " labelContainer"}>
        <img src={src} className={"selectionLogo"} alt="logo" />
        <input
          type={type}
          className={className}
          onChange={onChange}
          onClick={(e) => {
            ////console..log(e);
            e.nativeEvent.path[1].classList.toggle("active");
          }}
        ></input>
      </label>
    </React.Fragment>
  );
};
