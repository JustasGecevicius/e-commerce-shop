import React from "react";
import { Link } from "react-router-dom";


export const NavigationButton = ({ page, pageName }) => { 

  return (
    <React.Fragment>
      <Link to={page}>
        <button type="button" title={pageName}>{pageName}</button>
      </Link>
    </React.Fragment>
  );
};
