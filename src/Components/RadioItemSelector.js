import React from "react";

export const RadioItemSelector = ({type, className, onChange, src, MountainRoadAll}) => {

let newClass;

if(MountainRoadAll === className){
    newClass = className + " active labelContainer";
}
else{newClass = className + " labelContainer"}

//console.log("newCLass",newClass);
  return (
    <React.Fragment>
      <label className={newClass} >        
        <img src={src} className={"selectionLogo"} alt="logo"/>
        <input
          type={type}
          onChange={onChange}
          name = "type"
          className={className}
        ></input>
      </label>
    </React.Fragment>
  );
};
