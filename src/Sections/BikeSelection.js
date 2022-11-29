import React from "react";
import { ItemSelector } from "../Components/ItemSelector";
import specialized from "../WebsiteImages/specializedlogo.png";
import canyon from "../WebsiteImages/Canyon_Bicycles-Logo.wine.png";
import cannondale from "../WebsiteImages/Cannondale-Logo.png";
import mountain from "../WebsiteImages/MountainIcon.png";
import road from "../WebsiteImages/roadIcon.png";
import both from "../WebsiteImages/both.png"
import { RadioItemSelector } from "../Components/RadioItemSelector";

export const BikeSelection = ({ displayBrand, displayTerrain, MountainRoadAll }) => {


  return (
    <div className="bikeChoice">
      <div className="brandChoice choice">
        <h2> Choose a brand!</h2>
        <div className="checkBoxWrapper">
          <ItemSelector
            type="checkbox"
            className="cannondale"
            onChange={displayBrand}
            src={cannondale}
          />
          <ItemSelector
            type="checkbox"
            className="canyon"
            onChange={displayBrand}
            src={canyon}
          />
          <ItemSelector
            type="checkbox"
            className="specialized"
            onChange={displayBrand}
            src={specialized}
          />
        </div>
      </div>
      <div className="terrainChoice choice">
        <h2>Choose a type!</h2>
        <div className="radioButtonWrapper">

          
          <RadioItemSelector
            type="radio"
            className="mountain"
            onChange={displayTerrain}
            src={mountain}
            MountainRoadAll={MountainRoadAll}
          />
          <RadioItemSelector
            type="radio"
            className="road"
            onChange={displayTerrain}
            src={road}
            MountainRoadAll={MountainRoadAll}
          />
          <RadioItemSelector
            type="radio"
            className="all"
            onChange={displayTerrain}
            src={both}
            MountainRoadAll={MountainRoadAll}
          />
        </div>
      </div>
    </div>
  );
};
