import React from "react";

export const NavigationButton = ({ page }) => {
  const link = page
    ? "http://localhost:3000/" + page.toLowerCase()
    : "http://localhost:3000/";

    let text;

    page ? text = page : text = "Home";    

  return (
    <React.Fragment>
      <a href={link} className="buttonWrapper">
        <button type="button" title={text}>{text}</button>
      </a>
    </React.Fragment>
  );
};
