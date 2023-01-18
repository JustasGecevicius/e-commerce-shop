import React from "react";

export const ItemSelector = ({ type, className, onChange, src }) => {
    const outline = (e) => {
        const activeElement = document.querySelectorAll(
            `.${e.target.className}.labelContainer`
        );
        if(activeElement[0].classList.contains("active")) activeElement[0].classList.remove("active");   
        else{activeElement[0].classList.add("active")}       
    };

    return (
        <React.Fragment>
            <label className={className + " labelContainer"}>
                <img src={src} className={"selectionLogo"} alt="logo" />
                <input
                    type={type}
                    className={className}
                    onChange={onChange}
                    onClick={(e) => {
                        outline(e);
                    }}
                ></input>
            </label>
        </React.Fragment>
    );
};
