import React from "react";
import { ItemSelector } from "../Components/ItemSelector";

export const BikeSelection = ({displayBrand, displayTerrain}) => {
  return (
    <div>
      <ItemSelector
        type="checkbox"
        className="Cannondale"
        onChange={displayBrand}
      />
      <ItemSelector
        type="checkbox"
        className="Canyon"
        onChange={displayBrand}
      />
      <ItemSelector
        type="checkbox"
        className="Specialized"
        onChange={displayBrand}
      />
      <ItemSelector
        type="radio"
        className="Mountain"
        onChange={displayTerrain}
      />
      <ItemSelector type="radio" className="Road" onChange={displayTerrain} />
      <ItemSelector type="radio" className="All" onChange={displayTerrain} />
    </div>
  );
};
